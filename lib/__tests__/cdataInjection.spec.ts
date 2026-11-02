/**
 * node-soap sends any string that starts with `<![CDATA[` and ends with `]]>`
 * without escaping it. A value that closes the CDATA section early injects
 * markup into the request. Checked on the body the server actually receives.
 */
import { Client, createClientAsync } from 'soap';

import { CompanyService } from '../client';
import { GoogleSoapService } from '../client/googleSoap.service';
import { StatementBuilder } from '../common/utils';
import { neutralizeRawXml, toCdata } from '../common/utils/soapArgs.util';
import { FAKE_TOKEN, FakeAdManager, startFakeAdManager } from './support/fakeAdManager';

let mockWsdlUrl = '';
jest.mock('soap', () => {
  const actual = jest.requireActual('soap');
  return {
    ...actual,
    createClientAsync: (_url: string, options?: object) => actual.createClientAsync(mockWsdlUrl, options),
  };
});

const INJECTION =
  '<![CDATA[a]]></value></value></values><query>WHERE id = 1</query><values><key>z</key><value><![CDATA[b]]>';

const statement = (value: string) => new StatementBuilder().where('name = :n').addValue('n', value).toStatement();

/** The SOAP body as the server parses it (node-soap's own parser). */
function received(rawClient: Client, body: string) {
  return (rawClient as unknown as { wsdl: { xmlToObject(xml: string): any } }).wsdl.xmlToObject(body).Body
    .getCompaniesByStatement.filterStatement;
}

const ENTITIES: Record<string, string> = { lt: '<', gt: '>', amp: '&', quot: '"', apos: "'" };

/**
 * Text content of the TextValue in the request, decoded the way an XML parser
 * does it: CDATA sections, entities and character references. Throws on any
 * markup inside the value. (node-soap's parser is not used here: it drops
 * whitespace-only text between two CDATA sections, such as "&#xD;".)
 */
function textValue(body: string): string {
  const open = '<value xsi:type="TextValue"><value>';
  let i = body.indexOf(open) + open.length;
  let text = '';
  while (!body.startsWith('</value>', i)) {
    if (body.startsWith('<![CDATA[', i)) {
      const end = body.indexOf(']]>', i);
      text += body.slice(i + 9, end);
      i = end + 3;
    } else if (body[i] === '&') {
      const end = body.indexOf(';', i);
      const ref = body.slice(i + 1, end);
      text += ref.startsWith('#x') ? String.fromCodePoint(parseInt(ref.slice(2), 16)) : ENTITIES[ref];
      i = end + 1;
    } else if (body[i] === '<') {
      throw new Error(`markup inside the value at ${i}: ${body.slice(i, i + 40)}`);
    } else {
      text += body[i++];
    }
  }
  return text;
}

const soapBody = (envelope: string) => envelope.slice(envelope.indexOf('<soap:Body>'));

describe('strings that look like CDATA cannot inject XML', () => {
  let fake: FakeAdManager;
  let service: CompanyService;
  let rawClient: Client;

  beforeAll(async () => {
    fake = await startFakeAdManager();
    mockWsdlUrl = fake.wsdlUrl;
    service = await new GoogleSoapService('CompanyService', {
      networkCode: 123,
      applicationName: 'tests',
      token: FAKE_TOKEN,
    }).createClient();
    rawClient = await createClientAsync(fake.wsdlUrl);
  });

  afterAll(() => fake.close());

  /** Sends the statement through the library and returns the request body the server got. */
  async function send(value: string) {
    await service.getCompaniesByStatement(statement(value));
    return fake.last!.body;
  }

  /** What node-soap alone would have sent for the same statement. */
  async function sentByNodeSoap(value: string) {
    await new Promise((resolve) => rawClient.getCompaniesByStatement({ filterStatement: statement(value) }, resolve));
    return fake.last!.body;
  }

  it('a value that closes the CDATA section does not add a second <query>', async () => {
    const body = await send(INJECTION);

    // Markup outside CDATA sections: what the server parses as elements.
    const markup = body.replace(/<!\[CDATA\[[\s\S]*?\]\]>/g, '');
    expect(markup.match(/<(\w+:)?query>/g)).toHaveLength(1);
    expect(received(rawClient, body)).toEqual({
      query: 'WHERE name = :n',
      values: [{ key: 'n', value: { attributes: { 'xsi:type': 'TextValue' }, value: INJECTION } }],
    });
    expect(textValue(body)).toBe(INJECTION);
  });

  it.each([
    ['plain text', 'Acme'],
    ['markup characters', 'a < b && c > "d" \'e\''],
    ['a CDATA terminator in the middle', 'x ]]> y'],
    ['a CDATA start without the end', '<![CDATA[ not closed'],
    ['line breaks and tabs', 'a\r\nb\tc'],
    // One section cannot break out: it keeps going through as node-soap sends it.
    ['a single CDATA section', '<![CDATA[<b>bold</b> & more]]>'],
  ])('a value with %s is sent exactly as before', async (_name, value) => {
    const body = await send(value);

    expect(soapBody(body)).toBe(soapBody(await sentByNodeSoap(value)));
  });

  it('the server reads back the original text, \\r included', async () => {
    const value = '<![CDATA[1\r2]]>3]]>';

    expect(textValue(await send(value))).toBe(value);
  });

  it('does not modify the caller statement', async () => {
    const original = statement(INJECTION);
    const snapshot = structuredClone(original);

    await service.getCompaniesByStatement(original);

    expect(original).toEqual(snapshot);
  });
});

describe('neutralizeRawXml', () => {
  it('returns the same reference when there is nothing to rewrite', () => {
    const args = { a: ['x', { b: 'y' }], when: new Date(0), bytes: Buffer.from('z') };

    expect(neutralizeRawXml(args)).toBe(args);
  });

  it('copies only the path to the rewritten string and keeps prototypes', () => {
    class Entity {
      constructor(
        public name: string,
        public other = { untouched: true },
      ) {}
    }
    const args = { list: [new Entity(INJECTION)], keep: { k: 1 } };

    const safe = neutralizeRawXml(args);

    expect(safe).not.toBe(args);
    expect(safe.keep).toBe(args.keep);
    expect(safe.list[0]).toBeInstanceOf(Entity);
    expect(safe.list[0].other).toBe(args.list[0].other);
    expect(safe.list[0].name).toBe(toCdata(INJECTION));
    expect(args.list[0].name).toBe(INJECTION);
  });

  it('leaves attributes, $xml, Buffers and Dates alone', () => {
    const attributes = { 'xsi:type': INJECTION };
    const args = { value: { attributes, $xml: INJECTION }, buffer: Buffer.from(INJECTION), date: new Date(0) };

    expect(neutralizeRawXml(args)).toBe(args);
  });

  it('terminates on cycles', () => {
    const args: Record<string, unknown> = { name: INJECTION };
    args.self = args;

    const safe = neutralizeRawXml(args);

    expect(safe.name).toBe(toCdata(INJECTION));
    expect(safe.self).toBe(args);
  });
});
