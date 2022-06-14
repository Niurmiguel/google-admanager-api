<p align="center">
  <a href="https://developers.google.com/ad-manager/api/start" target="blank"><img src="https://developers.google.com/ads/images/logo_admanager_192px.svg" width="120" alt="Ad Manager Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/Niurmiguel/google-admanager-api/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/Niurmiguel/google-admanager-api

  <p align="center"><a href="https://developers.google.com/ad-manager/api/start" target="_blank">Google Ad Manager API</a> Client Library for NodeJs.</p>
    <p align="center">
<a href="https://www.npmjs.com/~niur" target="_blank"><img src="https://img.shields.io/npm/v/@niur/google-admanager-api.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~niur" target="_blank"><img src="https://img.shields.io/npm/l/@niur/google-admanager-api.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~niur" target="_blank"><img src="https://img.shields.io/npm/dm/@niur/google-admanager-api.svg" alt="NPM Downloads" /></a>
</p>

## Description

Developers can use the Google Ad Manager API to build applications that manage inventory, create orders, pull reports, and more.

### Installing the library

```bash
$ npm install @niur/google-admanager-api
```
### Overview

#### Authentication

All Google Ad Manager API calls must be authorized through OAuth2 an open standard that allows users to grant permissions to third-party applications, so the application can interact with web services on the user's behalf. OAuth2 enables your Ad Manager API client application to access a user's Ad Manager account without having to handle or store the user's username or password.

##### Generate OAuth2 credentials

```typescript

const credential = new GoogleSACredential({
    "type": "service_account",
    "project_id": "...",
    "private_key_id": "...",
    "private_key": "...",
    "client_email": "...",
    "client_id": "...",
    "auth_uri": "...",
    "token_uri": "...",
    ...
});

//or

const credential = new GoogleSAFileCredential('./credentials.json');

```

##### Use a client library

```typescript

const adManagerClient = new AdManagerClient('networkCode',credential,'applicationName');

const orderService = await adManagerClient.getService("OrderService");
const statement = new StatementBuilder().limit(10);
const orderPage = await orderService.getOrdersByStatement(statement.toStatement())

/**
 * {
 *  results: [],
 *  totalResultSetSize: 0,
 *  startIndex: 0
 * }
 * /
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
</table>

## Stay in touch

* Author - [Niurmiguel](https://github.com/Niurmiguel)

## License
Nestjs Azure Service Bus is [MIT licensed](LICENSE).