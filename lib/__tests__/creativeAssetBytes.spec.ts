/**
 * CreativeAsset.assetByteArray is an xsd:base64Binary, and node-soap does not
 * encode anything: it serializes a Buffer or a Uint8Array as one element per
 * byte (<0>104</0>...) and an ArrayBuffer as nothing. CreativeService turns
 * raw bytes into base64 before sending them; a base64 string goes as is.
 */
import { runInNewContext } from 'node:vm';
import { Client } from 'soap';

import { AdManagerClient } from '../client';
import { encodeAssetBytes } from '../client/services/creative/assetBytes.util';
import { CreativeService } from '../client/services/creative/creative.service';
import { Creative } from '../client/services/creative/creative.type';
import { FAKE_TOKEN, FakeAdManager, NS, startFakeAdManager } from './support/fakeAdManager';

let mockWsdlUrl = '';
jest.mock('soap', () => {
  const actual = jest.requireActual('soap');
  return {
    ...actual,
    createClientAsync: (_url: string, options?: object) => actual.createClientAsync(mockWsdlUrl, options),
  };
});

function recordingService() {
  const sent: { op: string; args: any }[] = [];
  const client = new Proxy(
    {},
    {
      get: (_target, op) => async (args: unknown) => {
        sent.push({ op: String(op), args });
        return null;
      },
    },
  ) as unknown as Client;
  return { service: new CreativeService(client), sent };
}

const HELLO = Buffer.from('hello').toString('base64');

function imageCreative(bytes: unknown): Creative {
  return {
    attributes: { 'xsi:type': 'ImageCreative' },
    name: 'img',
    primaryImageAsset: { fileName: 'a.png', assetByteArray: bytes },
    secondaryImageAssets: [{ fileName: 'b.png', assetByteArray: bytes }],
  } as unknown as Creative;
}

describe('CreativeAsset.assetByteArray', () => {
  it.each([
    ['a Buffer', Buffer.from('hello')],
    ['a Uint8Array', new Uint8Array(Buffer.from('hello'))],
    ['a view on part of a buffer', new Uint8Array(Buffer.from('xxhelloxx')).subarray(2, 7)],
    ['an ArrayBuffer', new Uint8Array(Buffer.from('hello')).buffer],
    ['a base64 string', HELLO],
  ])('sends %s as base64, in createCreatives and updateCreatives', async (_label, bytes) => {
    const { service, sent } = recordingService();

    await service.createCreatives([imageCreative(bytes)]);
    await service.updateCreatives([imageCreative(bytes)]);

    for (const { args } of sent) {
      const [creative] = args.creatives;
      expect(creative.primaryImageAsset.assetByteArray).toBe(HELLO);
      expect(creative.secondaryImageAssets[0].assetByteArray).toBe(HELLO);
      expect(creative.attributes).toEqual({ 'xsi:type': 'ImageCreative' });
    }
  });

  it('encodes assets nested in custom creatives and template variable values', async () => {
    const { service, sent } = recordingService();
    const bytes = Buffer.from('hello');

    await service.createCreatives([
      { customCreativeAssets: [{ macroName: 'm', asset: { assetByteArray: bytes } }] },
      { creativeTemplateVariableValues: [{ uniqueName: 'v', asset: { assetByteArray: bytes } }] },
    ] as unknown as Creative[]);

    const [custom, template] = sent[0].args.creatives;
    expect(custom.customCreativeAssets[0].asset.assetByteArray).toBe(HELLO);
    expect(template.creativeTemplateVariableValues[0].asset.assetByteArray).toBe(HELLO);
  });

  it('does not modify the creatives it is given', async () => {
    const { service } = recordingService();
    const bytes = Buffer.from('hello');
    const creative = imageCreative(bytes);

    await service.createCreatives([creative]);

    expect((creative as any).primaryImageAsset.assetByteArray).toBe(bytes);
  });
});

/** The part of the CreativeService WSDL that createCreatives needs. */
const creativeWsdl = (port: number) => `<?xml version="1.0" encoding="UTF-8"?>
<wsdl:definitions xmlns:soap="http://schemas.xmlsoap.org/wsdl/soap/" xmlns:tns="${NS}" xmlns:wsdl="http://schemas.xmlsoap.org/wsdl/" xmlns:xsd="http://www.w3.org/2001/XMLSchema" targetNamespace="${NS}">
<wsdl:types>
<schema xmlns="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified" targetNamespace="${NS}">
 <complexType name="Creative" abstract="true"><sequence><element name="name" type="xsd:string" minOccurs="0"/></sequence></complexType>
 <complexType name="CreativeAsset"><sequence><element name="assetByteArray" type="xsd:base64Binary" minOccurs="0"/><element name="fileName" type="xsd:string" minOccurs="0"/></sequence></complexType>
 <complexType name="ImageCreative"><complexContent><extension base="tns:Creative"><sequence><element name="primaryImageAsset" type="tns:CreativeAsset" minOccurs="0"/><element name="secondaryImageAssets" type="tns:CreativeAsset" minOccurs="0" maxOccurs="unbounded"/></sequence></extension></complexContent></complexType>
 <element name="createCreatives"><complexType><sequence><element name="creatives" type="tns:Creative" minOccurs="0" maxOccurs="unbounded"/></sequence></complexType></element>
 <element name="createCreativesResponse"><complexType><sequence><element name="rval" type="tns:Creative" minOccurs="0" maxOccurs="unbounded"/></sequence></complexType></element>
</schema>
</wsdl:types>
<wsdl:message name="createCreativesRequest"><wsdl:part element="tns:createCreatives" name="parameters"/></wsdl:message>
<wsdl:message name="createCreativesResponse"><wsdl:part element="tns:createCreativesResponse" name="parameters"/></wsdl:message>
<wsdl:portType name="CreativeServiceInterface">
 <wsdl:operation name="createCreatives"><wsdl:input message="tns:createCreativesRequest"/><wsdl:output message="tns:createCreativesResponse"/></wsdl:operation>
</wsdl:portType>
<wsdl:binding name="CreativeServiceSoapBinding" type="tns:CreativeServiceInterface"><soap:binding style="document" transport="http://schemas.xmlsoap.org/soap/http"/>
 <wsdl:operation name="createCreatives"><soap:operation soapAction=""/><wsdl:input><soap:body use="literal"/></wsdl:input><wsdl:output><soap:body use="literal"/></wsdl:output></wsdl:operation>
</wsdl:binding>
<wsdl:service name="CreativeService"><wsdl:port binding="tns:CreativeServiceSoapBinding" name="CreativeServiceInterfacePort"><soap:address location="http://127.0.0.1:${port}/svc"/></wsdl:port></wsdl:service>
</wsdl:definitions>`;

const createCreativesResponse =
  '<?xml version="1.0"?><soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"><soap:Body>' +
  `<createCreativesResponse xmlns="${NS}"/>` +
  '</soap:Body></soap:Envelope>';

/** The text of every assetByteArray element of a SOAP request body. */
const assetByteArrays = (body: string) =>
  [...body.matchAll(/<(?:\w+:)?assetByteArray\b[^>]*?(?:\/>|>([\s\S]*?)<\/(?:\w+:)?assetByteArray>)/g)].map(
    (m) => m[1] ?? '',
  );

class Asset {
  constructor(
    public fileName: string,
    public assetByteArray: unknown,
  ) {}
}

class ImageCreativeInput {
  attributes = { 'xsi:type': 'ImageCreative' };
  name = 'img';
  constructor(
    public primaryImageAsset: unknown,
    public secondaryImageAssets: unknown[],
  ) {}
}

const sharedHello = () => {
  const sab = new SharedArrayBuffer(5);
  new Uint8Array(sab).set(Buffer.from('hello'));
  return sab;
};

describe('CreativeAsset.assetByteArray in the XML that reaches the server', () => {
  let fake: FakeAdManager;
  let service: CreativeService;

  beforeAll(async () => {
    fake = await startFakeAdManager({ wsdl: creativeWsdl });
    mockWsdlUrl = fake.wsdlUrl;
    fake.handler = (_req, res) => res.end(createCreativesResponse);
    service = await new AdManagerClient(123, { getToken: async () => FAKE_TOKEN }, 'tests').getService(
      'CreativeService',
    );
  });

  afterAll(() => fake.close());

  const send = async (creative: unknown) => {
    await service.createCreatives([creative as Creative]);
    return assetByteArrays(fake.last?.body ?? '');
  };

  it.each([
    ['a Buffer', () => Buffer.from('hello')],
    ['an ArrayBuffer of another realm', () => runInNewContext('new Uint8Array([104, 101, 108, 108, 111]).buffer')],
    ['a Uint8Array of another realm', () => runInNewContext('new Uint8Array([104, 101, 108, 108, 111])')],
    ['a SharedArrayBuffer', sharedHello],
    ['a view on a SharedArrayBuffer', () => new Uint8Array(sharedHello())],
  ])('sends %s as base64', async (_label, bytes) => {
    const xml = await send(imageCreative(bytes()));
    expect(xml).toEqual([HELLO, HELLO]);
  });

  it('encodes assets held by class instances', async () => {
    const creative = new ImageCreativeInput(new Asset('a.png', Buffer.from('hello')), [
      new Asset('b.png', Buffer.from('hello')),
    ]);

    expect(await send(creative)).toEqual([HELLO, HELLO]);
    expect((creative.primaryImageAsset as Asset).assetByteArray).toEqual(Buffer.from('hello'));
    expect(creative.primaryImageAsset).toBeInstanceOf(Asset);
  });

  it('encodes assets held by objects of another realm', async () => {
    const creative = runInNewContext(
      `({
        attributes: { 'xsi:type': 'ImageCreative' },
        name: 'img',
        primaryImageAsset: { fileName: 'a.png', assetByteArray: bytes },
        secondaryImageAssets: [{ fileName: 'b.png', assetByteArray: bytes }],
      })`,
      { bytes: Buffer.from('hello') },
    );

    expect(await send(creative)).toEqual([HELLO, HELLO]);
    expect(creative.primaryImageAsset.assetByteArray).toEqual(Buffer.from('hello'));
  });
});

describe('encodeAssetBytes', () => {
  it('ends on circular references, and encodes what it reaches', () => {
    const asset: Record<string, unknown> = { fileName: 'a.png', assetByteArray: Buffer.from('hello') };
    const creative: Record<string, unknown> = { name: 'img', primaryImageAsset: asset };
    asset.creative = creative;
    creative.self = creative;

    const out = encodeAssetBytes(creative) as any;

    expect(out.primaryImageAsset.assetByteArray).toBe(HELLO);
    expect(asset.assetByteArray).toEqual(Buffer.from('hello'));
    expect(creative.self).toBe(creative);
  });

  it('copies an object reached twice once', () => {
    const asset = { fileName: 'a.png', assetByteArray: Buffer.from('hello') };

    const out = encodeAssetBytes({ primaryImageAsset: asset, secondaryImageAssets: [asset] });

    expect(out.primaryImageAsset).toBe(out.secondaryImageAssets[0]);
    expect(out.primaryImageAsset.assetByteArray).toBe(HELLO);
  });

  it('returns what has no raw bytes as is: dates, objects and arrays', () => {
    const when = new Date(0);
    const otherRealmDate = runInNewContext('new Date(0)');
    const asset = { fileName: 'a.png', assetByteArray: HELLO, when, otherRealmDate };
    const list = [asset];

    const out = encodeAssetBytes({ list });

    expect(out.list).toBe(list);
    expect(out.list[0].when).toBe(when);
    expect(out.list[0].otherRealmDate).toBe(otherRealmDate);
  });

  it('keeps the prototype of the instances it copies', () => {
    const out = encodeAssetBytes(new Asset('a.png', Buffer.from('hello')));

    expect(out).toBeInstanceOf(Asset);
    expect(out.assetByteArray).toBe(HELLO);
  });
});
