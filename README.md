<p align="center">
  <a href="https://developers.google.com/ad-manager/api/start" target="blank"><img src="https://developers.google.com/ads/images/logo_admanager_192px.svg" width="120" alt="Ad Manager Logo" /></a>
</p>

  <p align="center"><a href="https://developers.google.com/ad-manager/api/start" target="_blank">Google Ad Manager API</a> Client Library for NodeJs.</p>
    <p align="center">
<a href="https://www.npmjs.com/~niur" target="_blank"><img src="https://img.shields.io/npm/v/@niur/google-admanager-api.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~niur" target="_blank"><img src="https://img.shields.io/npm/l/@niur/google-admanager-api.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~niur" target="_blank"><img src="https://img.shields.io/npm/dm/@niur/google-admanager-api.svg" alt="NPM Downloads" /></a>
<a href="https://github.com/Niurmiguel/google-admanager-api/actions/workflows/ci.yml" target="_blank"><img src="https://github.com/Niurmiguel/google-admanager-api/actions/workflows/ci.yml/badge.svg" alt="CI" /></a>
</p>

## Description

Developers can use the Google Ad Manager API to build applications that manage inventory, create orders, pull reports, and more.

### Installing the library

```bash
$ npm install @niur/google-admanager-api
```

Requires Node.js 20.19 or later. See the [changelog](CHANGELOG.md) for what changed in each version, including the
breaking changes and the migration guide from 0.0.6.

### Overview

#### Authentication

All Google Ad Manager API calls must be authorized through OAuth2 an open standard that allows users to grant permissions to third-party applications, so the application can interact with web services on the user's behalf. OAuth2 enables your Ad Manager API client application to access a user's Ad Manager account without having to handle or store the user's username or password.

##### Generate OAuth2 credentials

```typescript
import { GoogleSACredential, GoogleSAFileCredential } from '@niur/google-admanager-api';

// The service account key, as an object or as a JSON string
const credential = new GoogleSACredential({
  type: 'service_account',
  project_id: '...',
  private_key_id: '...',
  private_key: '...',
  client_email: '...',
  client_id: '...',
});

// or the path to the key file
const fileCredential = new GoogleSAFileCredential('./credentials.json');
```

##### Use a client library

```typescript
import { AdManagerClient, StatementBuilder } from '@niur/google-admanager-api';

const networkCode = 12345678; // your network code: a number
const adManagerClient = new AdManagerClient(networkCode, credential, 'applicationName');

const orderService = await adManagerClient.getService('OrderService');
const statement = new StatementBuilder().limit(10);
const orderPage = await orderService.getOrdersByStatement(statement.toStatement());

/**
 * {
 *  results: [],
 *  totalResultSetSize: 0,
 *  startIndex: 0
 * }
 */
```

##### Options

<table>
  <tr>
    <td><code><b>networkCode</b></code></td>
    <td><code>Number</code></td>
    <td>The network code of the network being addressed (<b>required</b>).</td>
  </tr>
  <tr>
    <td><code><b>credential</b></code></td>
    <td><code>SACredential</code></td>
    <td>OAuth2 credential (<b>required</b>).</td>
  </tr>
  <tr>
    <td><code><b>applicationName</b></code></td>
    <td><code>String</code></td>
    <td>An arbitrary string name identifying your application. This will be shown in Google's log files. For example: "My Inventory Application" or "App_1" (<b>optional</b>).</td>
  </tr>
  <tr>
    <td><code><b>options</b></code></td>
    <td><code>SoapCallOptions</code></td>
    <td><code>{ timeout, signal }</code> for every call of the services the client creates (<b>optional</b>). <code>timeout</code>: maximum time per call in milliseconds, 300000 (5 minutes) by default, <code>0</code> disables it; when it passes the call rejects with an <code>AdManagerRequestError</code> with <code>code: 'ETIMEDOUT'</code>. <code>signal</code>: an <code>AbortSignal</code> that cancels the calls, which reject with <code>signal.reason</code>.</td>
  </tr>
</table>

`getService(name, options)` accepts the same options; the ones it sets replace the client's for that service:

```typescript
const adManagerClient = new AdManagerClient(networkCode, credential, 'applicationName', { timeout: 60_000 });
const reportService = await adManagerClient.getService('ReportService', { timeout: 10 * 60_000, signal });
```

They also bound `getService()` itself, which gets the OAuth token and downloads the service's WSDL: it rejects with
the same `ETIMEDOUT` error if both together take longer than `timeout`, and with `signal.reason` when the signal
aborts. The token request cannot be cancelled; it then goes on in the background and its result is discarded.

On Node.js 20, more than 10 calls in flight at once that share one `signal` print a `MaxListenersExceededWarning`:
each pending call listens to the signal until it settles, and removes its listener then, so it is not a leak. A
pending `getService()` counts as one more call when it gets that same `signal` (its own or the client's). Raise the
limit for that signal:

```typescript
import { setMaxListeners } from 'node:events';

const controller = new AbortController();
setMaxListeners(100, controller.signal); // up to 100 concurrent calls with this signal
```

##### Reports

The `ReportService` enums (`Dimension`, `Column`, `DimensionAttribute`, `DateRangeType`, `ExportFormat`...) are
exported from the package root. `ReportUtilities` waits for the job and downloads the result:

```typescript
import {
  Column,
  DateRangeType,
  Dimension,
  ExportFormat,
  ReportService,
  ReportUtilities,
} from '@niur/google-admanager-api';

// The entity types are not exported from the root yet: take them from the method that uses them.
type ReportJob = Parameters<ReportService['runReportJob']>[0];

const reportService = await adManagerClient.getService('ReportService');
const job = await reportService.runReportJob({
  reportQuery: {
    dimensions: [Dimension.DATE, Dimension.SITE_NAME],
    columns: [Column.AD_SERVER_IMPRESSIONS, Column.AD_SERVER_CLICKS],
    dateRangeType: DateRangeType.LAST_WEEK,
  },
} as ReportJob);

const report = new ReportUtilities(reportService, job.id);
report.reportDownloadOptions = { exportFormat: ExportFormat.CSV_DUMP, useGzipCompression: true };
const response = await report.getResponse({ timeoutMs: 15 * 60_000 });
await response.save('./report.csv.gz'); // streamed to disk
```

The entity types (`ReportJob`, `Creative`, `LineItem`...) declare every field as required, including the ones the
server fills in, such as `id`. An object literal that sets only what a request needs therefore has to be cast: with
`as`, as above, or through `unknown` when TypeScript rejects the direct cast, as with the `Creative` below. A cast
checks nothing, at compile time or at runtime: the server validates the request.

##### Abstract types (`xsi:type`)

Some request fields have an abstract WSDL type, and the server needs to be told which concrete type each object is.
Set it in `attributes`, which node-soap writes as the `xsi:type` of the element; without it the request is
rejected. The library types list the values each one accepts:

| Type                                                           | `xsi:type`, for example                  |
| -------------------------------------------------------------- | ---------------------------------------- |
| `Creative`                                                     | `ImageCreative`, `ThirdPartyCreative`... |
| `CustomCriteriaNode` (the `children` of a `CustomCriteriaSet`) | `CustomCriteria`, `CustomCriteriaSet`... |
| `BaseCustomFieldValue`, and its `value`                        | `CustomFieldValue`, `TextValue`...       |
| `BaseCreativeTemplateVariableValue`                            | `StringCreativeTemplateVariableValue`... |
| ad rule slots, first party audience segments, `CustomField`    | `StandardPoddingAdRuleSlot`...           |

```typescript
import { readFile } from 'node:fs/promises';
import { ComparisonOperator, CreativeService, CustomCriteriaNode } from '@niur/google-admanager-api';

type Creative = Parameters<CreativeService['createCreatives']>[0][number];

const creativeService = await adManagerClient.getService('CreativeService');
const [creative] = await creativeService.createCreatives([
  {
    attributes: { 'xsi:type': 'ImageCreative' },
    advertiserId: 123456,
    name: 'Banner 300x250',
    size: { width: 300, height: 250, isAspectRatio: false },
    destinationUrl: 'https://example.com',
    // Raw bytes are sent as base64; a base64 string is sent as is.
    primaryImageAsset: { fileName: 'banner.png', assetByteArray: await readFile('./banner.png') },
  } as unknown as Creative, // see the note on entity types under Reports
]);

// A custom criteria leaf, for the targeting of a line item (CustomCriteriaNode is exported from the root):
const criteria: CustomCriteriaNode = {
  attributes: { 'xsi:type': 'CustomCriteria' },
  keyId: 1,
  valueIds: [2],
  operator: ComparisonOperator.IS,
};
```

`StatementBuilder` sets the `xsi:type` of the values it binds itself. The action classes passed to the
`perform*Action` methods set theirs from the class name.

##### Errors

A failed call rejects with one of two values:

- **SOAP fault** (the API answered with an error): a plain object `{ code, name, message, details }` (type `SoapFault`), where `code` is the HTTP status and `name` the first Ad Manager error type (e.g. `AuthenticationError`).
- **Anything else** (network error, timeout, HTTP error page, unparseable response): an `AdManagerRequestError`, exported by the package. It keeps `message`, `code` (`ECONNRESET`, `ECONNABORTED`...), `status`, `body` and `response` (`status`, `statusText`, `headers` as a plain object, `data`), and its `cause` is a copy of the original error. It never carries the request (`config`, `request`, `response.config`), so logging it does not leak the OAuth token.

`getService()` rejects with an `AdManagerRequestError` too when it cannot get the token or the WSDL, with the same guarantees, or with `signal.reason` when its signal aborts.

A failed report download (`ReportUtilities.getResponse()` or `ReportResponse.save()`) rejects with an `AdsReportsException`, exported by the package. Its message names the download URL without the query, which is signed, and its `cause` (also `innerException`) is a sanitized copy of the original error: an `AdManagerRequestError` with `status` and `code` when the request failed.

##### Logging

`console.log()` (`util.inspect()`) and `JSON.stringify()` of a service, an `AdManagerClient`, a credential or a `ReportResponse` give a summary without the OAuth token, the private key or the signed report URL. That covers loggers that serialize with either of them, including the ones that tolerate circular references (pino, for example).

Two ways around it are not covered:

- `util.inspect(value, { customInspect: false })` skips the summaries and prints the fields themselves: the signed URL of a `ReportResponse` and, adding `showHidden: true`, the private key and the token of a credential, a client or a service. It is an explicit opt-out; do not use it on these objects in logs.
- node-soap's debug output (`DEBUG=node-soap`, or `DEBUG=*`) prints every request with its HTTP headers, including `Authorization: Bearer <token>`. Do not enable it where its logs are kept.

##### Untrusted input

String values are always sent as text. node-soap writes a string that starts with `<![CDATA[` and ends with `]]>` unescaped; the library rewrites the ones that would close that section early, so the server receives them literally.

Objects are a different matter. node-soap writes the value of a `$xml` key raw, and it does not escape object keys (element and attribute names). Do not copy untrusted objects (for example a parsed request body) into the arguments of a call: pick the fields you expect and pass them as strings, numbers or booleans.

## Stay in touch

* Author - [Niurmiguel](https://github.com/Niurmiguel)

## License

`@niur/google-admanager-api` is [MIT licensed](LICENSE).
