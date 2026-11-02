# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). While the version is 0.x, a minor release may contain
breaking changes; they are always listed under **Breaking changes**.

## [Unreleased]

## [0.1.0] - 2026-11-02

This release moves the library to Ad Manager API **v202608**. The previous target, v202305, was sunset by Google:
its WSDLs return 404, so 0.0.6 can no longer create any service client. Upgrading is required, and it breaks
code in the ways listed below.

### Breaking changes

#### Node.js 20.19 or later

`engines.node` is now `>=20.19.0`, the minimum of the SOAP client 1.x the library depends on. 0.0.6 declared no
minimum; older versions are not supported.

#### API v202608: removed services, operations, fields and enum values

Google removed these from the API before v202608. They are no longer exported, `getService()` no longer accepts
the services, and code that uses them no longer compiles:

- Services: `ActivityService`, `ActivityGroupService`, `CreativeReviewService`.
- Operation: `LineItemCreativeAssociationService.pushCreativeToDevices`, and its `CreativePushOptions` type.
- Fields and types:
  - `Company.settings` and the `CompanySettings` type;
  - `ChildPublisher.status`: use `ChildPublisher.invitationStatus`. The `DelegationStatus` enum is replaced by
    `InvitationStatus`, which adds `ACCEPTED`, `EXPIRED` and `DEACTIVATED_BY_AD_MANAGER`;
  - `Network.childPublishers`;
  - `DaiEncodingProfile.persistUnmatchedProfiles`;
  - `GrpSettings.targetImpressionGoal`;
  - `LineItemCreativeAssociationStats.costInOrderCurrency`;
  - `ProposalLineItem.isProgrammatic`, and `ProposalLineItem.timeZoneIdproposals` (the misspelled name 0.0.6 gave the
    API's `timeZoneId`, which was removed);
  - `Site.active`;
  - `User.isEmailNotificationAllowed`.
- Enum values:
  - `GrpProvider.GOOGLE`;
  - `LineItemCreativeAssociationStatus.NOT_SERVING`;
  - `AdRuleStatus.DELETED`;
  - `CustomFieldEntityType.PRODUCT` and `PRODUCT_TEMPLATE`;
  - `RateType.CPC`, `CPU` and `FLAT_FEE`;
  - `TargetingDimension.VIDEO_POSITION`;
  - report `Column`: the conversion, CPA and Active View revenue columns;
  - report `Dimension`: `ACTIVITY_*`, `VIDEO_METADATA_KEY_*` and `VIDEO_PLACEMENT_NAME`.

#### Corrected type definitions

- `TargetingPresetPage` is now a page of `TargetingPreset`. It was typed as a page of `AdUnitTargeting`, which
  never matched what the API returns.
- `TargetingPresetServiceOperations` has three new methods: `createTargetingPresets`, `updateTargetingPresets` and
  `performTargetingPresetAction`. A class that implements the interface must add them.
- The methods of `NetworkService` and `NetworkServiceOperations` (`getAllNetworks`, `getCurrentNetwork`,
  `getDefaultThirdPartyDataDeclaration`, `makeTestNetwork`, `updateNetwork`) are typed as returning a `Promise`,
  which they always did at runtime. Code that used the result without `await` no longer compiles.
- Misspelled field names that were never sent to the API, nor filled from its responses:

  | Type               | 0.0.6                            | 0.1.0                   |
  | ------------------ | -------------------------------- | ----------------------- |
  | `ProposalLineItem` | `idproposals`                    | `id`                    |
  | `ProposalLineItem` | `proposalIdproposals`            | `proposalId`            |
  | `ProposalLineItem` | `nameproposals`                  | `name`                  |
  | `ProposalLineItem` | `internalNotesproposals`         | `internalNotes`         |
  | `ProposalLineItem` | `isArchivedproposals`            | `isArchived`            |
  | `ProposalLineItem` | `contractedUnitsBoughtproposals` | `contractedUnitsBought` |
  | `ProposalLineItem` | `timeZoneIdproposals`            | removed (see above)     |
  | `LineItemTemplate` | `reativeRotationType`            | `creativeRotationType`  |

#### Type declarations: use `skipLibCheck`

Compile with `skipLibCheck: true`, as most projects do. Without it the declarations of the dependencies are
type-checked too, and they fail:

- The SOAP client's declarations import the `sax` package, which ships no types: error TS7016 ("Could not find a
  declaration file for module 'sax'"). This already happened with 0.0.6.
- New in 0.1.0: the declarations of the Google authentication library (version 10) use `#private` fields, so with
  `target` below ES2015 (for example `es5`) they fail with TS18028 ("Private identifiers are only available when
  targeting ECMAScript 2015 and higher").

#### `GoogleSACredential` throws when it is constructed

`new GoogleSACredential(json)` now throws if `json` is not valid JSON or not a usable service account credential.
In 0.0.6 the error was an unhandled rejection that terminated the process, or a confusing failure on the first
request. The error message keeps the position of a JSON syntax error but not the input, which holds the private
key.

#### SOAP calls time out after 5 minutes

Every call now has a 5-minute timeout. When it passes, the call rejects with an `AdManagerRequestError` whose
`code` is `'ETIMEDOUT'`, and its connection is closed. Change it, or pass `0` to disable it as in 0.0.6, for every
service of a client or for one service:

```typescript
const client = new AdManagerClient(networkCode, credential, 'applicationName', { timeout: 0 });
const reportService = await client.getService('ReportService', { timeout: 15 * 60_000 });
```

The same options accept a `signal` (`AbortSignal`) that cancels the calls; they then reject with `signal.reason`.

#### Rejections: `AdManagerRequestError` instead of the HTTP and SOAP client errors

A call that fails for any reason other than a SOAP fault (network error, timeout, HTTP error page, a response that
is not valid XML) used to reject with the raw axios or node-soap error. Those errors carry the request, including
the `Authorization` header with the OAuth token, so logging them leaked it. They now reject with an
`AdManagerRequestError`, exported by the package.

| 0.0.6                                                          | 0.1.0                                                |
| -------------------------------------------------------------- | ---------------------------------------------------- |
| `axios.isAxiosError(err)`, `err.isAxiosError`                  | `err instanceof AdManagerRequestError`               |
| `err.name` (`'AxiosError'`, `'Error'`)                         | `'AdManagerRequestError'`                            |
| `err.config`, `err.request`, `err.toJSON()`                    | removed                                              |
| `err.response.config`, `err.response.request`                  | removed                                              |
| `err.message`, `err.code`                                      | unchanged                                            |
| `err.response.status`, `.statusText`, `.headers`, `.data`      | unchanged (`err.status` also has the status)         |
| `err.body` (node-soap)                                         | unchanged                                            |
| `{ Fault }` plain object, for responses that are not valid XML | an `AdManagerRequestError` with the same `err.Fault` |

`err.cause` is a copy of the original error with its name, message, stack and system error fields (`code`,
`errno`, `syscall`...), never the request. `err.response.headers` is a plain object with lower-case header names, as
in 0.0.6; it is not an axios 1.x `AxiosHeaders` and has no `.get()`.

#### Rejections for SOAP faults: `name` and `message`

A SOAP fault still rejects with a plain object (not an `Error`), now typed and exported as `SoapFault`:
`{ code, name, message, details }`. Its values changed:

- `name` is the type of the first error in the fault (for example `'RequiredError'`). With several errors, 0.0.6
  gave a fragment of the JSON detail.
- `message` is the whole fault string. 0.0.6 cut it at the first `': '`, so a message that quoted a value with a
  colon was truncated.
- `details` is always the parsed fault detail. 0.0.6 threw while parsing some of them.
- A server fault without a detail rejects with `{ code, name: '', message }`. In 0.0.6 it threw inside the SOAP
  client's callback: an unhandled rejection that terminated the process, while the call never settled.
- For client faults (`soap:Client`), `name` is the fault reason (for example `'Unmarshalling Error'`) and `message`
  the rest of the text after its code, no longer only its fourth fragment.
- `code` (the HTTP status) is `undefined` when there was no HTTP response, instead of throwing.

#### Strings that look like split CDATA sections are sent as text

A string that starts with `<![CDATA[`, ends with `]]>` and contains another `]]>` used to be written into the
request as raw XML, which allowed injecting elements. It is now sent as literal text, so CDATA sections split by
hand no longer reach the server as XML. A single CDATA section, and every other string, is sent as before.

#### Reports: polling, deadlines and download errors

`ReportUtilities.getResponse()` takes an optional `options` argument. Its defaults change the behaviour of calls
without it:

- It waits between status checks: 5 s first, then 1.5 times longer each time, up to 60 s. 0.0.6 checked in a
  tight loop, dozens of SOAP calls per second.
- It gives up after 30 minutes (`timeoutMs`) with an `AdsReportsException`, also when a status check or the call
  for the download URL does not answer. Pass `timeoutMs: Infinity` to wait forever.
- The download has a 60 s inactivity timeout (`downloadTimeoutMs`; 0.0.6 had none). `getResponse()` fails if the
  response headers do not arrive within it, and `ReportResponse.save()` fails if the server sends nothing for
  that long while it reads the report. It does not cap the total download time, and it does not run between
  `getResponse()` and `save()`: a response that `save()` has not started to read releases its connection after
  `downloadTimeoutMs`, and a later `save()` downloads the report again, with the same signed URL. That URL expires:
  if it has expired by then, `save()` fails with an `AdsReportsException` (the HTTP error is in its `innerException`),
  and only a new `getResponse()` gets a new URL. Call `save()` soon after `getResponse()`, or pass
  `downloadTimeoutMs: 0` to keep the connection open until `save()` reads it. `0` disables the timeout.
- Invalid options (negative, `NaN`, delays above 2^31 - 1 ms...) throw a `RangeError` before any call.

A failed download rejects with an `AdsReportsException` (exported by the package) instead of the HTTP client's
error, both from `getResponse()` and `HttpUtilities.buildRequest()`, and from `save()`. Its message names the
download URL without its query, which is signed, and `err.innerException` (also `err.cause`) is an
`AdManagerRequestError`: read the status from `err.innerException.status` instead of `err.response.status`. In
`save()`, `innerException` is a sanitized copy of the original error. (`err.cause` is only typed when your
`tsconfig.json` includes the `es2022` lib; `innerException` always is.)

#### `ReportResponse.save()` can be called once

The report body is a stream and can only be read once. A second `save()` on the same response, or a retry after a
failed one, used to truncate the target file to 0 bytes and resolve as if it had worked. It now rejects with an
`AdsReportsException`. Call `getResponse()` again to download the report again.

### Migration guide from 0.0.6

1. Run Node.js 20.19 or later.
2. Remove any use of the services, operations, fields and enum values listed above, rename `DelegationStatus` to
   `InvitationStatus` (and `ChildPublisher.status` to `invitationStatus`), and use the corrected
   `ProposalLineItem` and `LineItemTemplate` field names. The compiler points at every place.
3. `await` every `NetworkService` method, and implement the three new methods if you implement
   `TargetingPresetServiceOperations`.
4. If your `tsconfig.json` targets ES5 and does not set `skipLibCheck`, raise `target` to `es2015` or later.
5. Build `GoogleSACredential` inside a `try` if the credential may be invalid: it throws there now.
6. Decide on the SOAP timeout. If some of your calls legitimately take longer than 5 minutes, raise it, or pass
   `{ timeout: 0 }`.
7. Update error handling. A rejection is either a `SoapFault` (plain object) or an `AdManagerRequestError`:

   ```typescript
   import { AdManagerRequestError, SoapFault } from '@niur/google-admanager-api';

   try {
     await lineItemService.updateLineItems(lineItems);
   } catch (err) {
     if (err instanceof AdManagerRequestError) {
       // Network error, timeout or HTTP error. Was: axios.isAxiosError(err), err.config, err.request.
       console.error(err.code, err.status ?? err.response?.status, err.message);
     } else {
       const fault = err as SoapFault; // Ad Manager answered with an error
       console.error(fault.name, fault.message, fault.details);
     }
   }
   ```

   Code that matched on a fault's `name` or `message` may need updating: both are now complete (see above).

8. Reports: if a report can take more than 30 minutes, pass `timeoutMs`; catch `AdsReportsException` for download
   errors and read the status from its `innerException`; call `save()` once per `getResponse()`, soon after it:

   ```typescript
   import { AdManagerRequestError, AdsReportsException, ReportUtilities } from '@niur/google-admanager-api';

   const response = await new ReportUtilities(reportService, reportJobId).getResponse({ timeoutMs: 2 * 60 * 60_000 });
   try {
     await response.save('report.csv.gz');
   } catch (err) {
     if (err instanceof AdsReportsException) {
       const inner = err.innerException;
       console.error(err.message, inner instanceof AdManagerRequestError ? inner.status : inner?.message);
     }
     throw err;
   }
   ```

9. If you build strings with several CDATA sections by hand to send XML inside a value, send the text instead: the
   library escapes it.

### Added

- Support for Ad Manager API v202608: its new fields and types (vertical, content label and publisher provided
  signals targeting, `AdUnit.refreshRateType`, creative and line item fields, mobile application approval status,
  supply path on proposals and proposal line items...) and enum values. Exhaustive `switch` statements over the
  updated enums will report the new members as unhandled.
- `TargetingPresetService.createTargetingPresets`, `updateTargetingPresets` and `performTargetingPresetAction`,
  with `DeleteTargetingPresetAction`.
- Options for every SOAP call (`SoapCallOptions`: `timeout` and `signal`), as the fourth argument of
  `AdManagerClient` and the second of `getService()`.
- Options for `ReportUtilities.getResponse()` (`ReportResponseOptions`): `initialDelayMs`, `backoffFactor`,
  `maxDelayMs`, `timeoutMs`, `downloadTimeoutMs` and `signal`. The signal also cancels the download that
  `ReportResponse.save()` reads; both then reject with `signal.reason`.
- Exports from the package root: the action classes of every `perform*Action` operation, `ReportJobStatus`, the
  exceptions (`AdsReportsException`, `ArgumentNullException`, `InvalidOperationException`, `BaseException`),
  `AdManagerRequestError`, and the `SoapFault`, `SafeResponse` and `SoapCallOptions` types. They can be used with
  `instanceof` and are also visible to ESM `import`.
- Continuous integration on every push and pull request, on Node.js 20.19.0, 22 and 24.

### Fixed

- Twelve service methods sent arguments the WSDL does not declare, so the API rejected or ignored them:
  `AdRuleService.createAdSpots` and `updateAdSpots`, `CmsMetadataService.performCmsMetadataKeyAction` and
  `performCmsMetadataValueAction`, `CreativeSetService.getCreativeSetsByStatement`,
  `CustomFieldService.updateCustomFields`, `getCustomFieldOption` and `updateCustomFieldOptions` (which called
  other operations), `NativeStyleService.performNativeStyleAction`, `ProposalService.performProposalAction`,
  `UserTeamAssociationService.performUserTeamAssociationAction` and `NetworkService.updateNetwork`.
- `UserService.getAllRoles` never settled.
- `ReportResponse.save()` stayed pending forever when the download failed.
- `getService()` keeps the original error as `cause` when it cannot create the client.
- `CompanyService.performCompanyAction` no longer writes to the console.
- `CreativeAsset` no longer refers to a global `BinaryData` type that TypeScript 5 does not declare.
- The npm package contains only the build output, README, LICENSE and package.json: 0.0.6 also shipped compiled
  tests and a local coverage report.

### Security

- Rejections never carry the OAuth token: errors are rebuilt from an allowlist of fields (`AdManagerRequestError`)
  instead of passing on the HTTP client's error and its request.
- Report download errors never contain the signed download URL's query.
- A string that closes a CDATA section early can no longer inject XML elements into a request.
- SOAP calls and report downloads have timeouts, so a connection left hanging by the server no longer keeps a call,
  its socket and its caller waiting forever.
- The error for an invalid service account JSON no longer quotes the input, which holds the private key.
- The HTTP, SOAP and authentication dependencies are upgraded to major versions without the known advisories that
  affected 0.0.6.
- Releases are built and tested in one job and the tested tarball is published from another, with npm provenance,
  actions pinned to commit SHAs, no install scripts and no dependency cache. A GitHub release marked as
  pre-release is published with the `next` dist-tag instead of `latest`.
