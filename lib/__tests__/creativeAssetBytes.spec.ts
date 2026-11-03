/**
 * CreativeAsset.assetByteArray is an xsd:base64Binary, and node-soap does not
 * encode anything: it serializes a Buffer or a Uint8Array as one element per
 * byte (<0>104</0>...) and an ArrayBuffer as nothing. CreativeService turns
 * raw bytes into base64 before sending them; a base64 string goes as is.
 */
import { Client } from 'soap';

import { CreativeService } from '../client/services/creative/creative.service';
import { Creative } from '../client/services/creative/creative.type';

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
