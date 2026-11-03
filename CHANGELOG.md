# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to
[Semantic Versioning](https://semver.org/spec/v2.0.0.html). While the version is 0.x, a minor release may contain
breaking changes; they are always listed under **Breaking changes**.

## [Unreleased]

## [0.2.0] - 2026-11-02

The library now mirrors the v202608 WSDLs exactly where 0.1.0 did not: the enums are generated from them, and a
test compares every enum, type, action and operation with them. Most of the breaking changes below remove values
and fields that v202608 rejects, so code that used them already failed at runtime.

### Breaking changes

- Report enum values that v202608 does not accept are removed:
  - `Dimension`: `SDK` and 55 `AD_EXCHANGE_*` values. Several have a counterpart without the prefix among the
    added dimensions (`SITE_NAME`, `CHANNEL_NAME`, `BUYER_NETWORK_NAME`...).
  - `Column`: 76 `AD_EXCHANGE_*` and 22 `OPTIMIZATION_*` values.
  - `TimeZoneType.AD_EXCHANGE`. For Ad Exchange metrics v202608 has `PACIFIC`, new in this release.

  <details>
  <summary>Every removed <code>Dimension</code> and <code>Column</code> value</summary>

  `Dimension`: `SDK`, `AD_EXCHANGE_INVENTORY_SIZE`, `AD_EXCHANGE_INVENTORY_SIZE_CODE`, `AD_EXCHANGE_DEVICE_CATEGORY`, `AD_EXCHANGE_PRICING_RULE_ID`, `AD_EXCHANGE_PRICING_RULE_NAME`, `AD_EXCHANGE_TAG_NAME`, `AD_EXCHANGE_URL`, `AD_EXCHANGE_WEB_PROPERTY_CODE`, `AD_EXCHANGE_CREATIVE_SIZES`, `AD_EXCHANGE_AD_TYPE`, `AD_EXCHANGE_CHANNEL_NAME`, `AD_EXCHANGE_SITE_NAME`, `AD_EXCHANGE_REQUEST_SOURCES`, `AD_EXCHANGE_ADVERTISER_NAME`, `AD_EXCHANGE_BRAND_NAME`, `AD_EXCHANGE_AGENCY`, `AD_EXCHANGE_BID_TYPE_CODE`, `AD_EXCHANGE_BRANDING_TYPE_CODE`, `AD_EXCHANGE_BRANDING_TYPE`, `AD_EXCHANGE_BUYER_NETWORK_NAME`, `AD_EXCHANGE_BUYER_NETWORK_ID`, `AD_EXCHANGE_CUSTOM_CHANNEL_CODE`, `AD_EXCHANGE_CUSTOM_CHANNEL_ID`, `AD_EXCHANGE_DATE`, `AD_EXCHANGE_DEAL_ID`, `AD_EXCHANGE_DEAL_NAME`, `AD_EXCHANGE_TRANSACTION_TYPE`, `AD_EXCHANGE_DSP_BUYER_NETWORK_NAME`, `AD_EXCHANGE_EXPANSION_TYPE`, `AD_EXCHANGE_COUNTRY_CODE`, `AD_EXCHANGE_COUNTRY_NAME`, `AD_EXCHANGE_DFP_AD_UNIT_ID`, `AD_EXCHANGE_DFP_AD_UNIT`, `AD_EXCHANGE_INVENTORY_OWNERSHIP`, `AD_EXCHANGE_ADVERTISER_DOMAIN`, `AD_EXCHANGE_DFP_MOBILE_APP_NAME`, `AD_EXCHANGE_MOBILE_APP_RESOLVED_ID`, `AD_EXCHANGE_MOBILE_CARRIER_NAME`, `AD_EXCHANGE_MOBILE_DEVICE_NAME`, `AD_EXCHANGE_MOBILE_INVENTORY_TYPE`, `AD_EXCHANGE_MONTH`, `AD_EXCHANGE_NETWORK_PARTNER_NAME`, `AD_EXCHANGE_OPERATING_SYSTEM`, `AD_EXCHANGE_TAG_CODE`, `AD_EXCHANGE_TARGETING_TYPE_CODE`, `AD_EXCHANGE_TARGETING_TYPE`, `AD_EXCHANGE_TRANSACTION_TYPE_CODE`, `AD_EXCHANGE_URL_ID`, `AD_EXCHANGE_USER_BANDWIDTH_NAME`, `AD_EXCHANGE_VIDEO_AD_DURATION`, `AD_EXCHANGE_VIDEO_AD_DURATION_RAW`, `AD_EXCHANGE_VIDEO_AD_TYPE`, `AD_EXCHANGE_WEEK`, `AD_EXCHANGE_AD_LOCATION`, `AD_EXCHANGE_ADVERTISER_VERTICAL`.

  `Column`: `AD_EXCHANGE_IMPRESSIONS`, `AD_EXCHANGE_MATCHED_REQUESTS`, `AD_EXCHANGE_AD_ECPM`, `AD_EXCHANGE_CLICKS`, `AD_EXCHANGE_ESTIMATED_REVENUE`, `AD_EXCHANGE_COVERAGE`, `AD_EXCHANGE_CTR`, `AD_EXCHANGE_LIFT`, `AD_EXCHANGE_CPC`, `AD_EXCHANGE_AD_REQUESTS`, `AD_EXCHANGE_AD_REQUEST_ECPM`, `AD_EXCHANGE_AD_REQUEST_CTR`, `AD_EXCHANGE_AD_CTR`, `AD_EXCHANGE_VIDEO_DROPOFF_RATE`, `AD_EXCHANGE_VIDEO_ABANDONMENT_RATE`, `AD_EXCHANGE_MATCHED_ECPM`, `AD_EXCHANGE_ACTIVE_VIEW_MEASURABLE`, `AD_EXCHANGE_ACTIVE_VIEW_VIEWABLE`, `AD_EXCHANGE_AVERAGE_VIEWABLE_TIME`, `AD_EXCHANGE_ACTIVE_VIEW_ENABLED_IMPRESSIONS`, `AD_EXCHANGE_ACTIVE_VIEW_MEASURED_IMPRESSIONS`, `AD_EXCHANGE_ACTIVE_VIEW_VIEWED_IMPRESSIONS`, `AD_EXCHANGE_DEALS_BID_RESPONSES`, `AD_EXCHANGE_DEALS_MATCHED_REQUESTS`, `AD_EXCHANGE_DEALS_AD_REQUESTS`, `AD_EXCHANGE_DEALS_MATCH_RATE`, `AD_EXCHANGE_VIDEO_AUTO_PLAY`, `AD_EXCHANGE_VIDEO_CLICK_TO_PLAY`, `AD_EXCHANGE_VIDEO_START`, `AD_EXCHANGE_VIDEO_QUARTILE_1`, `AD_EXCHANGE_VIDEO_MIDPOINT`, `AD_EXCHANGE_VIDEO_QUARTILE_3`, `AD_EXCHANGE_VIDEO_COMPLETE`, `AD_EXCHANGE_VIDEO_COMPLETION_RATE`, `AD_EXCHANGE_VIDEO_COLLAPSE`, `AD_EXCHANGE_VIDEO_EXPAND`, `AD_EXCHANGE_VIDEO_FULL_SCREEN`, `AD_EXCHANGE_VIDEO_MUTE`, `AD_EXCHANGE_VIDEO_PAUSE`, `AD_EXCHANGE_VIDEO_RESUME`, `AD_EXCHANGE_VIDEO_REWIND`, `AD_EXCHANGE_VIDEO_SKIPPED`, `AD_EXCHANGE_VIDEO_UNMUTE`, `AD_EXCHANGE_VIDEO_VAST2_ERROR_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_100_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_101_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_102_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_200_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_201_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_202_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_203_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_300_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_301_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_302_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_303_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_400_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_401_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_402_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_403_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_405_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_500_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_501_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_502_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_503_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_600_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_601_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_602_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_603_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_604_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_900_COUNT`, `AD_EXCHANGE_VIDEO_VAST_ERROR_901_COUNT`, `AD_EXCHANGE_VIDEO_TOTAL_VAST_ERROR_COUNT`, `AD_EXCHANGE_VIDEO_TOTAL_ERROR_RATE`, `AD_EXCHANGE_VIDEO_TRUEVIEW_SKIP_RATE`, `AD_EXCHANGE_VIDEO_TRUEVIEW_VIEWS`, `AD_EXCHANGE_VIDEO_TRUEVIEW_VTR`, `OPTIMIZATION_CONTROL_IMPRESSIONS`, `OPTIMIZATION_CONTROL_CLICKS`, `OPTIMIZATION_CONTROL_CTR`, `OPTIMIZATION_OPTIMIZED_IMPRESSIONS`, `OPTIMIZATION_OPTIMIZED_CLICKS`, `OPTIMIZATION_NON_OPTIMIZED_IMPRESSIONS`, `OPTIMIZATION_NON_OPTIMIZED_CLICKS`, `OPTIMIZATION_EXTRA_CLICKS`, `OPTIMIZATION_OPTIMIZED_CTR`, `OPTIMIZATION_LIFT`, `OPTIMIZATION_COVERAGE`, `OPTIMIZATION_BEHIND_SCHEDULE_IMPRESSIONS`, `OPTIMIZATION_NO_CLICKS_RECORDED_IMPRESSIONS`, `OPTIMIZATION_SPONSORSHIP_IMPRESSIONS`, `OPTIMIZATION_AS_FAST_AS_POSSIBLE_IMPRESSIONS`, `OPTIMIZATION_NO_ABSOLUTE_LIFETIME_GOAL_IMPRESSIONS`, `OPTIMIZATION_CONTROL_REVENUE`, `OPTIMIZATION_OPTIMIZED_REVENUE`, `OPTIMIZATION_CONTROL_ECPM`, `OPTIMIZATION_OPTIMIZED_ECPM`, `OPTIMIZATION_FREED_UP_IMPRESSIONS`, `OPTIMIZATION_ECPM_LIFT`.

  </details>

- `ThirdPartyViewabilityIntegrationPartner.MEETRICS` is removed.
- The `ValueDeclarationType`, `GrpUnitType`, `GrpGender` and `GrpAge` enums, the `GrpDemographicBreakdown` type, and
  the fields that used them, `CustomTargetingKey.valueDeclarationType` and
  `AvailabilityForecast.demographicBreakdowns`, are removed: v202608 has none of them.
- `ReportQuery.adxReportCurrency` is renamed `reportCurrency`, the name v202608 uses. It is optional.
- `VideoPositionTarget.adSpotId` is a `number`, not a `number[]`: the WSDL declares a single id.
- `VastRedirectCreative.trackingUrls` is a `ConversionEvent_TrackingUrlsMapEntry[]`, not a single entry.
- `SalespersonSplit.split`, `ProposalLineItem.marketplaceInfo` and the empty `ProposalLineItemMarketplaceInfo` type
  are removed.
- `CreativeAction` declares `buildAttributes()`, like the other action base classes. A class of your own that
  implements it must add the method; a plain object passed to `performCreativeAction()` no longer compiles (it
  was sent with `xsi:type="Object"`, which the API rejects).
- Enums gained values (see **Added**): a `switch` that checks it handles every value of one of them no longer
  compiles until it handles the new ones.

### Added

- `Dimension.SITE_NAME` ([#14](https://github.com/Niurmiguel/google-admanager-api/issues/14)) and the other 51
  dimensions of v202608: `DATE_PT`, `WEEK_PT`, `MONTH_YEAR_PT`, `DAY_OF_WEEK_PT`, `COUNTRY_CODE`, `IS_ADX_DIRECT`, `EXCHANGE_BIDDING_DEAL_ID`, `EXCHANGE_BIDDING_DEAL_TYPE`, `OPERATING_SYSTEM_VERSION_ID`, `OPERATING_SYSTEM_VERSION_NAME`, `WEB_PROPERTY_CODE`, `BUYING_AGENCY_NAME`, `BUYER_NETWORK_ID`, `BUYER_NETWORK_NAME`, `BIDDER_ID`, `BIDDER_NAME`, `ADVERTISER_DOMAIN_NAME`, `ADVERTISER_VERTICAL_NAME`, `NIELSEN_RESTATEMENT_DATE`, `FIRST_LOOK_PRICING_RULE_ID`, `FIRST_LOOK_PRICING_RULE_NAME`, `BID_RANGE`, `BID_REJECTION_REASON`, `BID_REJECTION_REASON_NAME`, `AD_TECHNOLOGY_PROVIDER_DOMAIN`, `PROGRAMMATIC_DEAL_ID`, `PROGRAMMATIC_DEAL_NAME`, `AD_TECHNOLOGY_PROVIDER_ID`, `AD_TECHNOLOGY_PROVIDER_NAME`, `TCF_VENDOR_ID`, `TCF_VENDOR_NAME`, `CHANNEL_NAME`, `URL_ID`, `URL_NAME`, `VIDEO_AD_DURATION`, `VIDEO_AD_TYPE_ID`, `VIDEO_AD_TYPE_NAME`, `DYNAMIC_ALLOCATION_ID`, `DYNAMIC_ALLOCATION_NAME`, `AD_TYPE_ID`, `AD_TYPE_NAME`, `AD_LOCATION_ID`, `AD_LOCATION_NAME`, `TARGETING_TYPE_CODE`, `TARGETING_TYPE_NAME`, `BRANDING_TYPE_CODE`, `BRANDING_TYPE_NAME`, `BANDWIDTH_ID`, `BANDWIDTH_NAME`, `CARRIER_ID`, `CARRIER_NAME`.
- 83 report columns: `AD_SERVER_BEGIN_TO_RENDER_IMPRESSIONS`, `AD_SERVER_UNFILTERED_BEGIN_TO_RENDER_IMPRESSIONS`, `BID_COUNT`, `BID_AVERAGE_CPM`, `YIELD_GROUP_CALLOUTS`, `YIELD_GROUP_SUCCESSFUL_RESPONSES`, `YIELD_GROUP_BIDS`, `YIELD_GROUP_BIDS_IN_AUCTION`, `YIELD_GROUP_AUCTIONS_WON`, `DEALS_BID_REQUESTS`, `DEALS_BIDS`, `DEALS_BID_RATE`, `DEALS_WINNING_BIDS`, `DEALS_WIN_RATE`, `YIELD_GROUP_IMPRESSIONS`, `YIELD_GROUP_ESTIMATED_REVENUE`, `YIELD_GROUP_ESTIMATED_CPM`, `YIELD_GROUP_MEDIATION_FILL_RATE`, `YIELD_GROUP_MEDIATION_PASSBACKS`, `YIELD_GROUP_MEDIATION_THIRD_PARTY_ECPM`, `YIELD_GROUP_MEDIATION_CHAINS_SERVED`, `PROGRAMMATIC_RESPONSES_SERVED`, `PROGRAMMATIC_MATCH_RATE`, `TOTAL_PROGRAMMATIC_ELIGIBLE_AD_REQUESTS`, `PARTNER_SALES_PARTNER_IMPRESSIONS`, `PARTNER_SALES_PARTNER_CODE_SERVED`, `PARTNER_SALES_GOOGLE_IMPRESSIONS`, `PARTNER_SALES_GOOGLE_RESERVATION_IMPRESSIONS`, `PARTNER_SALES_GOOGLE_AUCTION_IMPRESSIONS`, `PARTNER_SALES_QUERIES`, `PARTNER_SALES_FILLED_QUERIES`, `PARTNER_SALES_SELL_THROUGH_RATE`, `DROPOFF_RATE`, `VIDEO_TRUEVIEW_VIEWS`, `VIDEO_TRUEVIEW_SKIP_RATE`, `VIDEO_TRUEVIEW_VTR`, `VIDEO_IMPRESSIONS_REAL_TIME`, `VIDEO_MATCHED_QUERIES_REAL_TIME`, `VIDEO_UNMATCHED_QUERIES_REAL_TIME`, `VIDEO_TOTAL_QUERIES_REAL_TIME`, `VIDEO_CREATIVE_SERVE_REAL_TIME`, `VIDEO_VAST3_ERROR_100_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_101_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_102_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_200_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_201_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_202_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_203_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_300_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_301_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_302_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_303_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_400_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_401_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_402_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_403_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_405_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_500_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_501_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_502_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_503_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_600_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_601_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_602_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_603_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_604_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_900_COUNT_REAL_TIME`, `VIDEO_VAST3_ERROR_901_COUNT_REAL_TIME`, `VIDEO_VAST4_ERROR_406_COUNT_REAL_TIME`, `VIDEO_VAST4_ERROR_407_COUNT_REAL_TIME`, `VIDEO_VAST4_ERROR_408_COUNT_REAL_TIME`, `VIDEO_VAST4_ERROR_409_COUNT_REAL_TIME`, `VIDEO_VAST4_ERROR_410_COUNT_REAL_TIME`, `VIDEO_VAST_TOTAL_ERROR_COUNT_REAL_TIME`, `AD_EXCHANGE_TOTAL_REQUESTS`, `AD_EXCHANGE_MATCH_RATE`, `AD_EXCHANGE_COST_PER_CLICK`, `AD_EXCHANGE_TOTAL_REQUEST_CTR`, `AD_EXCHANGE_MATCHED_REQUEST_CTR`, `AD_EXCHANGE_TOTAL_REQUEST_ECPM`, `AD_EXCHANGE_MATCHED_REQUEST_ECPM`, `AD_EXCHANGE_LIFT_EARNINGS`, `NIELSEN_IN_TARGET_RATIO`.
- `DimensionAttribute.CHILD_PARTNER_NAME`, `TimeZoneType.PACIFIC`, `AudienceSegmentStatus.UNKNOWN` and `UNUSED`,
  `SecurityPolicyType.CLOUD_MEDIA`, `CustomFieldVisibility.UNKNOWN`, `DaiIngestStatus.INGESTED`, `DaiIngestStatus.INGESTED_WITH_WARNINGS`, `DaiIngestStatus.CONDITIONED`, `DaiIngestStatus.CONDITIONED_WITH_WARNINGS`,
  `DaiIngestErrorReason.SUBTITLES_PRESENT_IN_FEED_AND_MANIFEST`, `DaiIngestErrorReason.INVALID_MEDIA_PROFILE`,
  `AdBreakMarkupType.AD_BREAK_MARKUP_SCTE35_BINARY_BREAK_START_END`, `SamErrorType.AD_POD_DROPPED_INCOMPATIBLE_TIMEOFFSET`, and
  `ThirdPartyReachIntegrationPartner.VIDEO_RESEARCH` and `GEMIUS`.
- The `ReportService` enums are exported from the package root: `Dimension`, `Column`, `DimensionAttribute`,
  `DateRangeType`, `ExportFormat`, `ReportQueryAdUnitView` and `TimeZoneType`, next to `ReportJobStatus`.
- Actions: `ApproveAndOverbookOrders`, `ResumeAndOverbookOrders`, `SubmitOrdersForApprovalAndOverbook`,
  `ReserveAndOverbookLineItems`, `ResumeAndOverbookLineItems`, and `ArchiveSlates` and `UnarchiveSlates` (with
  their `SlateAction` base class). `ResumeOrders` and `SubmitOrdersForApproval` have `skipInventoryCheck`.
  `performSlateAction()` takes an action instance, like every other `perform*Action()`; the action name as a
  string still works but is deprecated.
- Typed `xsi:type`: `attributes?: { 'xsi:type': ... }` lists the concrete types on `Creative`,
  `BaseCreativeTemplateVariableValue`, `CustomCriteriaNode` (new, with `CustomCriteriaLeaf`; it types
  `CustomCriteriaSet.children`), `BaseCustomFieldValue`, `CustomField`, the ad rule slots and the first party
  audience segments. `BaseCustomFieldValue.value` accepts a `TypedValue` (a `Value` with its `xsi:type`).
  `XsiType` and `TypedValue` are exported from the root. See "Abstract types" in the README.
- `RuleBasedFirstPartyAudienceSegment` and `FirstPartyAudienceSegmentRule`.
- Fields of v202608 that were missing, all optional: `LineItem.youtubeKidsRestricted`,
  `Targeting.inventorySizeTargeting` (`InventorySizeTargeting`, `TargetedSize`),
  `LiveStreamEvent.prerollSettings` and `liveStreamConditioning` (`PrerollSettings`, `LiveStreamConditioning`,
  `DashBridge`), `ProposalLineItem.secondaryGoals` and `disableSameAdvertiserCompetitiveExclusion`,
  `SecurityPolicySettings.keysetName` and `signedRequestExpirationTtlSeconds`, `AdDecisionCreative.isDropped`
  and `SavedQuery.isCompatibleWithApiVersion`.
- `CreativeAsset.assetByteArray` also accepts a base64 string.
- For contributors: `npm run generate:enums` regenerates the enums from the WSDLs (`-- --check` only reports),
  and `wsdlSchema.spec` compares the library with a snapshot of the v202608 WSDLs, offline.
  `ADMANAGER_NETWORK_TESTS=1 npm test` also checks that snapshot against the live WSDLs.

### Fixed

- `createCreatives()` and `updateCreatives()` send `CreativeAsset.assetByteArray` as base64. A `Buffer` or a
  `Uint8Array` was sent as one element per byte, and an `ArrayBuffer` as an empty element, so an image could not
  be uploaded as bytes.
- `Dimension.NATIVE_STYLE_ID` sends `'NATIVE_STYLE_ID'`; it sent `'ATIVE_STYLE_ID'`, which the API rejects.
- `performCreativeAction()` sends the fields of the action, like every other `perform*Action()`.
- `ResumeOrders` and `SubmitOrdersForApproval` send `skipInventoryCheck` when it is set.
- Every enum has the values of v202608 in the WSDL order, with the WSDL documentation.
- 761 links to the API reference point to v202608 instead of v202202. The other 25 name services this library
  does not use, PQL filter names or fields v202608 no longer has, and still point to v202202.

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

#### SOAP calls and `getService()` time out after 5 minutes

Every call now has a 5-minute timeout. When it passes, the call rejects with an `AdManagerRequestError` whose
`code` is `'ETIMEDOUT'`, and its connection is closed. Change it, or pass `0` to disable it as in 0.0.6, for every
service of a client or for one service:

```typescript
const client = new AdManagerClient(networkCode, credential, 'applicationName', { timeout: 0 });
const reportService = await client.getService('ReportService', { timeout: 15 * 60_000 });
```

The same options accept a `signal` (`AbortSignal`) that cancels the calls; they then reject with `signal.reason`.

The timeout and the signal that apply to a service also bound `getService()` itself: getting the OAuth token and
downloading the service's WSDL must finish within `timeout` (it rejects with the same `ETIMEDOUT` error, and the
WSDL download is aborted), and an aborted `signal` makes it reject with `signal.reason`, right away if it was already
aborted. In 0.0.6 a WSDL server or a token endpoint that did not answer left `getService()` pending forever. The token
request itself cannot be cancelled: when the timeout or the signal ends `getService()` while it is pending, it goes
on in the background and its result is discarded. A short `timeout` meant for the calls now also has to leave time
for the WSDL download.

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

`getService()` also rejects with an `AdManagerRequestError` when it cannot get the token or the WSDL, instead of a
plain `Error`. Its `message` is the one 0.0.6 gave (`String(err)`, for example `'Error: socket hang up'`), and it
keeps `code` and `status`; `err.name` is now `'AdManagerRequestError'` instead of `'Error'`, and it is still an
`instanceof Error`. Its `cause` is a sanitized copy of the original error, because the raw errors carry their
request, with the `Proxy-Authorization` header of a proxy set in `HTTPS_PROXY`, or the signed assertion sent to the
token endpoint. When the rejection was not an `Error`, `cause` is the rejection value itself if it was a string or
another primitive, and `undefined` if it was any other object.

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
- `getService()` no longer stays pending forever when the WSDL server or the token endpoint does not answer: it
  applies the service's `timeout` and `signal`.
- `CompanyService.performCompanyAction` no longer writes to the console.
- `CreativeAsset` no longer refers to a global `BinaryData` type that TypeScript 5 does not declare.
- The npm package contains only the build output, README, LICENSE and package.json: 0.0.6 also shipped compiled
  tests and a local coverage report.

### Security

- Rejections never carry the OAuth token: errors are rebuilt from an allowlist of fields (`AdManagerRequestError`)
  instead of passing on the HTTP client's error and its request. That includes `getService()`, whose raw errors
  carried the `Proxy-Authorization` header of a proxy with credentials, or the request to the token endpoint.
- `console.log()` (`util.inspect()`) of a service no longer prints the OAuth token, which its SOAP client keeps
  (`security`, `lastRequestHeaders`); of a `ReportResponse`, the signed download URL; of a `GoogleSACredential` or
  `GoogleSAFileCredential` (or an `AdManagerClient` that holds one), the private key and the cached token. They
  print a summary instead. A service's internal `_client` is no longer enumerable, so `JSON.stringify()` skips it.
  Debug logging of the SOAP client (`DEBUG=node-soap`) still prints the request headers, token included, and
  `util.inspect(value, { customInspect: false })` skips the summaries (for the secrets kept in non-enumerable
  fields, together with `showHidden: true`).
- `JSON.stringify()` of a `GoogleSACredential`, a `GoogleSAFileCredential` (once it had read its key file) or an
  `AdManagerClient` no longer includes the private key and the cached token, and that of a `ReportResponse` no
  longer throws on its circular references nor, with a stringify that tolerates them (as loggers use), includes the
  signed download URL. They have a `toJSON()` that gives the same summary as `console.log()`: `{ email }`,
  `{ keyFile }` and `{ status, url, saveCalled }`, with the URL without its query. The credentials' `auth` and the
  client's `credential` are no longer enumerable; subclasses still read and assign `auth`. `console.log()` of a
  credential subclass now prints the subclass name.
- Report download errors never contain the signed download URL's query.
- A string that closes a CDATA section early can no longer inject XML elements into a request.
- SOAP calls and report downloads have timeouts, so a connection left hanging by the server no longer keeps a call,
  its socket and its caller waiting forever.
- The error for an invalid service account JSON no longer quotes the input, which holds the private key.
- The HTTP, SOAP and authentication dependencies are upgraded to major versions without the known advisories that
  affected 0.0.6.
- Releases are built and tested in one job and the tested tarball is staged on npm from another, with npm trusted
  publishing (OIDC, no stored npm token) and provenance, actions pinned to commit SHAs, no install scripts and no
  dependency cache. A staged version is only published once a maintainer approves it on npmjs.com with 2FA. A
  GitHub release marked as pre-release is staged with the `next` dist-tag instead of `latest`.
