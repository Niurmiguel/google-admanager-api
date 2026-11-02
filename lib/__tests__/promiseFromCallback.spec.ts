/**
 * promiseFromCallback against a real node-soap client talking to a local HTTP
 * server that answers SOAP faults, so the error objects are exactly the ones
 * node-soap builds in production.
 */
import { once } from 'node:events';
import { createServer, Server } from 'node:http';
import { Client, createClientAsync } from 'soap';

import { AdManagerRequestError, promiseFromCallback } from '../common/utils';
import { listenOnLoopback } from './support/loopback';

const NS = 'https://www.google.com/apis/ads/publisher/v202608';

const WSDL = `<?xml version="1.0" encoding="UTF-8"?>
<wsdl:definitions xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/"
  xmlns:tns="${NS}" xmlns="http://www.w3.org/2001/XMLSchema" targetNamespace="${NS}">
  <wsdl:types>
    <schema targetNamespace="${NS}" elementFormDefault="qualified">
      <element name="getCurrentNetwork"><complexType><sequence/></complexType></element>
      <element name="getCurrentNetworkResponse"><complexType><sequence>
        <element name="rval" type="string" minOccurs="0"/>
      </sequence></complexType></element>
    </schema>
  </wsdl:types>
  <wsdl:message name="getCurrentNetworkRequest"><wsdl:part name="parameters" element="tns:getCurrentNetwork"/></wsdl:message>
  <wsdl:message name="getCurrentNetworkResponse"><wsdl:part name="parameters" element="tns:getCurrentNetworkResponse"/></wsdl:message>
  <wsdl:portType name="NetworkServiceInterface">
    <wsdl:operation name="getCurrentNetwork">
      <wsdl:input message="tns:getCurrentNetworkRequest"/>
      <wsdl:output message="tns:getCurrentNetworkResponse"/>
    </wsdl:operation>
  </wsdl:portType>
  <wsdl:binding name="NetworkServiceSoapBinding" type="tns:NetworkServiceInterface">
    <soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
    <wsdl:operation name="getCurrentNetwork">
      <soap:operation soapAction=""/>
      <wsdl:input><soap:body use="literal"/></wsdl:input>
      <wsdl:output><soap:body use="literal"/></wsdl:output>
    </wsdl:operation>
  </wsdl:binding>
  <wsdl:service name="NetworkService">
    <wsdl:port name="NetworkServiceInterfacePort" binding="tns:NetworkServiceSoapBinding">
      <soap:address location="http://127.0.0.1/"/>
    </wsdl:port>
  </wsdl:service>
</wsdl:definitions>`;

/** Fault bodies with the shape Ad Manager returns. */
const FAULTS = {
  apiError:
    '<soap:Fault><faultcode>soap:Server</faultcode><faultstring>[AuthenticationError.NETWORK_NOT_FOUND @ ]</faultstring>' +
    `<detail><ApiExceptionFault xmlns="${NS}"><message>[AuthenticationError.NETWORK_NOT_FOUND @ ]</message>` +
    '<applicationExceptionType>ApiException</applicationExceptionType>' +
    '<errors xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="AuthenticationError"><fieldPath></fieldPath>' +
    '<trigger></trigger><errorString>AuthenticationError.NETWORK_NOT_FOUND</errorString><reason>NETWORK_NOT_FOUND</reason>' +
    '</errors></ApiExceptionFault></detail></soap:Fault>',
  apiErrors:
    '<soap:Fault><faultcode>soap:Server</faultcode><faultstring>[RequiredError.REQUIRED @ name, RangeError.TOO_HIGH @ id]</faultstring>' +
    `<detail><ApiExceptionFault xmlns="${NS}"><message>[RequiredError.REQUIRED @ name, RangeError.TOO_HIGH @ id]</message>` +
    '<applicationExceptionType>ApiException</applicationExceptionType>' +
    '<errors xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="RequiredError"><fieldPath>name</fieldPath>' +
    '<errorString>RequiredError.REQUIRED</errorString><reason>REQUIRED</reason></errors>' +
    '<errors xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="RangeError"><fieldPath>id</fieldPath>' +
    '<errorString>RangeError.TOO_HIGH</errorString><reason>TOO_HIGH</reason></errors>' +
    '</ApiExceptionFault></detail></soap:Fault>',
  unmarshalling:
    '<soap:Fault><faultcode>soap:Client</faultcode><faultstring>Unmarshalling Error: cvc-complex-type.2.4.a: ' +
    "Invalid content was found starting with element 'adSports'. </faultstring></soap:Fault>",
  serverNoDetail:
    '<soap:Fault><faultcode>soap:Server</faultcode><faultstring>Internal error</faultstring></soap:Fault>',
  // The trigger echoes user input, which can contain ": {", the separator
  // node-soap puts between the faultstring and the JSON detail.
  colonBraceInMessage:
    "<soap:Fault><faultcode>soap:Server</faultcode><faultstring>[UniqueError.NOT_UNIQUE @ name; trigger:'Promo: {Q4}']</faultstring>" +
    `<detail><ApiExceptionFault xmlns="${NS}"><message>[UniqueError.NOT_UNIQUE @ name; trigger:'Promo: {Q4}']</message>` +
    '<applicationExceptionType>ApiException</applicationExceptionType>' +
    '<errors xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:type="UniqueError"><fieldPath>name</fieldPath>' +
    '<trigger>Promo: {Q4}</trigger><errorString>UniqueError.NOT_UNIQUE</errorString><reason>NOT_UNIQUE</reason>' +
    '</errors></ApiExceptionFault></detail></soap:Fault>',
  colonBraceNoDetail:
    '<soap:Fault><faultcode>soap:Server</faultcode><faultstring>Bad value: {"a":1}</faultstring></soap:Fault>',
  faultstringWithAttribute:
    '<soap:Fault><faultcode>soap:Server</faultcode><faultstring xml:lang="en">Internal error</faultstring></soap:Fault>',
} as const;

type FaultName = keyof typeof FAULTS;

/** Settles with the outcome, or with 'pending' if the promise is still unsettled after `ms`. */
async function outcomeOf(promise: Promise<unknown>, ms = 2_000) {
  let timer: NodeJS.Timeout | undefined;
  const pending = new Promise<{ state: 'pending' }>((resolve) => {
    timer = setTimeout(() => resolve({ state: 'pending' }), ms);
  });
  try {
    return await Promise.race([
      promise.then(
        (value) => ({ state: 'resolved' as const, value }),
        (reason: unknown) => ({ state: 'rejected' as const, reason }),
      ),
      pending,
    ]);
  } finally {
    clearTimeout(timer);
  }
}

describe('promiseFromCallback with SOAP faults', () => {
  let server: Server;
  let client: Client;
  let fault: FaultName;
  const unhandled: unknown[] = [];
  const onUnhandled = (reason: unknown) => unhandled.push(reason);

  beforeAll(async () => {
    server = createServer((req, res) => {
      if (req.method === 'GET') {
        res.writeHead(200, { 'content-type': 'text/xml' });
        res.end(WSDL);
        return;
      }
      req.resume();
      req.on('end', () => {
        res.writeHead(500, { 'content-type': 'text/xml' });
        res.end(
          '<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/">' +
            `<soap:Body>${FAULTS[fault]}</soap:Body></soap:Envelope>`,
        );
      });
    });
    const url = `${await listenOnLoopback(server)}/`;
    client = await createClientAsync(`${url}?wsdl`, { endpoint: url });
    process.on('unhandledRejection', onUnhandled);
  });

  afterAll(async () => {
    process.off('unhandledRejection', onUnhandled);
    server.closeAllConnections();
    server.close();
    await once(server, 'close');
  });

  beforeEach(() => {
    unhandled.length = 0;
  });

  afterEach(async () => {
    // Give any rejection raised inside node-soap's callback time to surface.
    await new Promise((resolve) => setImmediate(resolve));
    expect(unhandled).toEqual([]);
  });

  async function call(name: FaultName) {
    fault = name;
    return outcomeOf(promiseFromCallback((cb) => client.getCurrentNetwork({}, cb)));
  }

  it('maps an ApiExceptionFault with detail to {code, name, message, details}', async () => {
    expect(await call('apiError')).toEqual({
      state: 'rejected',
      reason: {
        code: 500,
        name: 'AuthenticationError',
        message: '[AuthenticationError.NETWORK_NOT_FOUND @ ]',
        details: {
          ApiExceptionFault: {
            message: '[AuthenticationError.NETWORK_NOT_FOUND @ ]',
            applicationExceptionType: 'ApiException',
            errors: {
              attributes: { 'xsi:type': 'AuthenticationError' },
              fieldPath: null,
              trigger: null,
              errorString: 'AuthenticationError.NETWORK_NOT_FOUND',
              reason: 'NETWORK_NOT_FOUND',
            },
          },
        },
      },
    });
  });

  it('names a fault with several errors after the first one', async () => {
    const outcome = await call('apiErrors');

    expect(outcome).toMatchObject({
      state: 'rejected',
      reason: {
        code: 500,
        name: 'RequiredError',
        message: '[RequiredError.REQUIRED @ name, RangeError.TOO_HIGH @ id]',
      },
    });
  });

  it('maps an unmarshalling fault (soap:Client, no detail)', async () => {
    expect(await call('unmarshalling')).toEqual({
      state: 'rejected',
      reason: {
        code: 500,
        name: 'Unmarshalling Error',
        message: "Invalid content was found starting with element 'adSports'.",
      },
    });
  });

  it('rejects a soap:Server fault without detail instead of hanging and crashing the process', async () => {
    expect(await call('serverNoDetail')).toEqual({
      state: 'rejected',
      reason: { code: 500, name: '', message: 'Internal error' },
    });
  });

  it('keeps a message that contains ": {" whole, and parses the detail', async () => {
    expect(await call('colonBraceInMessage')).toEqual({
      state: 'rejected',
      reason: {
        code: 500,
        name: 'UniqueError',
        message: "[UniqueError.NOT_UNIQUE @ name; trigger:'Promo: {Q4}']",
        details: {
          ApiExceptionFault: {
            message: "[UniqueError.NOT_UNIQUE @ name; trigger:'Promo: {Q4}']",
            applicationExceptionType: 'ApiException',
            errors: {
              attributes: { 'xsi:type': 'UniqueError' },
              fieldPath: 'name',
              trigger: 'Promo: {Q4}',
              errorString: 'UniqueError.NOT_UNIQUE',
              reason: 'NOT_UNIQUE',
            },
          },
        },
      },
    });
  });

  it('keeps a message that contains ": {" whole when the fault has no detail', async () => {
    expect(await call('colonBraceNoDetail')).toEqual({
      state: 'rejected',
      reason: { code: 500, name: '', message: 'Bad value: {"a":1}' },
    });
  });

  it('reads a faultstring that has attributes', async () => {
    expect(await call('faultstringWithAttribute')).toEqual({
      state: 'rejected',
      reason: { code: 500, name: '', message: 'Internal error' },
    });
  });

  it('rejects with an AdManagerRequestError, not the raw error, when it is not a SOAP fault', async () => {
    const error = Object.assign(new Error('socket hang up'), {
      code: 'ECONNRESET',
      config: { headers: { Authorization: 'Bearer fake-oauth-token-for-tests-0000' } },
    });

    const outcome = await outcomeOf(promiseFromCallback((cb) => cb(error, undefined)));

    expect(outcome.state).toBe('rejected');
    const reason = (outcome as { reason: AdManagerRequestError }).reason;
    expect(reason).toBeInstanceOf(AdManagerRequestError);
    expect(reason).toMatchObject({ message: 'socket hang up', code: 'ECONNRESET' });
    expect(reason).not.toHaveProperty('config');
    expect(reason.cause).toMatchObject({ message: 'socket hang up', code: 'ECONNRESET' });
    expect(reason.cause).not.toHaveProperty('config');
  });

  it('rejects once with the mapped fault, not a second time with the raw error', async () => {
    const reject = jest.fn();
    const OriginalPromise = Promise;
    const raw = Object.assign(new Error('soap:Client: Unmarshalling Error: cvc: bad'), { response: { status: 500 } });

    // Observe the executor's reject function directly.
    const spy = jest
      .spyOn(global, 'Promise')
      .mockImplementationOnce(
        (executor) => new OriginalPromise((resolve, rej) => executor(resolve, (r) => (reject(r), rej(r)))),
      );
    try {
      await promiseFromCallback((cb) => cb(raw, undefined)).catch(() => undefined);
    } finally {
      spy.mockRestore();
    }

    expect(reject).toHaveBeenCalledTimes(1);
    expect(reject).toHaveBeenCalledWith({ code: 500, name: 'Unmarshalling Error', message: 'bad' });
  });
});
