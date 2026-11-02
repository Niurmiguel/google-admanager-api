/**
 * A loopback HTTP server that serves a trimmed CompanyService WSDL and lets
 * each test decide how the SOAP endpoint answers, so the library runs its
 * real code path: GoogleSoapService -> node-soap -> axios -> socket.
 *
 * Specs redirect the library's hard-coded ads.google.com WSDL URL here with:
 *
 *   let mockWsdlUrl = '';
 *   jest.mock('soap', () => {
 *     const actual = jest.requireActual('soap');
 *     return { ...actual, createClientAsync: (_url: string, options?: object) => actual.createClientAsync(mockWsdlUrl, options) };
 *   });
 */
import { once } from 'node:events';
import { createServer, IncomingHttpHeaders, IncomingMessage, Server, ServerResponse } from 'node:http';
import { AddressInfo } from 'node:net';

import { API_VERSION } from '../../common/constants';

const NS = `https://www.google.com/apis/ads/publisher/${API_VERSION}`;

/** A token that is obviously fake, so secret scanners do not flag it. */
export const FAKE_TOKEN = 'fake-oauth-token-for-tests-0000';

const wsdl = (port: number) => `<?xml version="1.0" encoding="UTF-8"?>
<wsdl:definitions xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="${NS}" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="${NS}">
<wsdl:types>
<schema xmlns="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" targetNamespace="${NS}">
 <complexType name="Value" abstract="true"><sequence/></complexType>
 <complexType name="TextValue"><complexContent><extension base="tns:Value"><sequence><element name="value" type="xsd:string" minOccurs="0"/></sequence></extension></complexContent></complexType>
 <complexType name="String_ValueMapEntry"><sequence><element name="key" type="xsd:string" minOccurs="0"/><element name="value" type="tns:Value" minOccurs="0"/></sequence></complexType>
 <complexType name="Statement"><sequence><element name="query" type="xsd:string" minOccurs="0"/><element name="values" type="tns:String_ValueMapEntry" minOccurs="0" maxOccurs="unbounded"/></sequence></complexType>
 <element name="getCompaniesByStatement"><complexType><sequence><element name="filterStatement" type="tns:Statement" minOccurs="0"/></sequence></complexType></element>
 <element name="getCompaniesByStatementResponse"><complexType><sequence><element name="rval" type="xsd:string" minOccurs="0"/></sequence></complexType></element>
</schema>
</wsdl:types>
<wsdl:message name="getCompaniesByStatementRequest"><wsdl:part element="tns:getCompaniesByStatement" name="parameters"/></wsdl:message>
<wsdl:message name="getCompaniesByStatementResponse"><wsdl:part element="tns:getCompaniesByStatementResponse" name="parameters"/></wsdl:message>
<wsdl:portType name="CompanyServiceInterface">
 <wsdl:operation name="getCompaniesByStatement"><wsdl:input message="tns:getCompaniesByStatementRequest"/><wsdl:output message="tns:getCompaniesByStatementResponse"/></wsdl:operation>
</wsdl:portType>
<wsdl:binding name="CompanyServiceSoapBinding" type="tns:CompanyServiceInterface"><soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
 <wsdl:operation name="getCompaniesByStatement"><soap:operation soapAction=""/><wsdl:input><soap:body use="literal"/></wsdl:input><wsdl:output><soap:body use="literal"/></wsdl:output></wsdl:operation>
</wsdl:binding>
<wsdl:service name="CompanyService"><wsdl:port binding="tns:CompanyServiceSoapBinding" name="CompanyServiceInterfacePort"><soap:address location="http://127.0.0.1:${port}/svc"/></wsdl:port></wsdl:service>
</wsdl:definitions>`;

/** A successful getCompaniesByStatement response. */
export const okEnvelope = (rval = 'ok') =>
  '<?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>' +
  `<getCompaniesByStatementResponse xmlns="${NS}"><rval>${rval}</rval></getCompaniesByStatementResponse>` +
  '</soap:Body></soap:Envelope>';

export type SoapHandler = (req: IncomingMessage, res: ServerResponse, body: string) => void;

export type FakeAdManager = {
  wsdlUrl: string;
  /** How the SOAP endpoint answers the next calls. Defaults to `okEnvelope()`. */
  handler: SoapHandler;
  /** Body and headers of the last SOAP request. */
  last: { body: string; headers: IncomingHttpHeaders } | undefined;
  /** Open sockets right now. */
  connections(): Promise<number>;
  close(): Promise<void>;
};

export async function startFakeAdManager(): Promise<FakeAdManager> {
  const server: Server = createServer((req, res) => {
    let body = '';
    req.setEncoding('utf8');
    req.on('data', (chunk: string) => (body += chunk));
    req.on('end', () => {
      if (req.method === 'GET') {
        res.writeHead(200, { 'content-type': 'text/xml' });
        res.end(wsdl((server.address() as AddressInfo).port));
        return;
      }
      fake.last = { body, headers: req.headers };
      fake.handler(req, res, body);
    });
  });
  const fake: FakeAdManager = {
    wsdlUrl: '',
    handler: (_req, res) => res.end(okEnvelope()),
    last: undefined,
    connections: () => new Promise((resolve, reject) => server.getConnections((e, n) => (e ? reject(e) : resolve(n)))),
    close: async () => {
      server.closeAllConnections();
      server.close();
      await once(server, 'close');
    },
  };

  server.listen(0, '127.0.0.1');
  await once(server, 'listening');
  fake.wsdlUrl = `http://127.0.0.1:${(server.address() as AddressInfo).port}/svc?wsdl`;
  return fake;
}
