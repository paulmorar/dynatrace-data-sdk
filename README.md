# dynatrace-data-sdk

## Introduction

This package aims at simplifying data interactions with your Dynatrace tenant (JavaScript) SDK. It can be used directly for any JavaScript application or NodeJs server-side application.

## Getting started

Install the SDK using your package manager of choice:

```js
// npm example
npm install dynatrace-data-sdk

// yarn example
yarn add dynatrace-data-sdk

// pnpm example
pnpm install dynatrace-data-sdk
```

### SDK initialization

```js
import initialize from 'dynatrace-data-sdk;

const client = initialize({ tenantId: TENANT_ID, token: YOUR_ID_TOKEN });
```

You are now left with various ineractions that fit your needs. After initialization, the client exposes functions that return a promise.

## TypeScript

This package also provides typescript definitions of the following:

```ts
import {
  SDKClient,
  ClientConfig,
  Log,
  Metric,
} from 'dynatrace-data-sdk';

type SDKClient = {
  sendLog: (log: Log) => Promise<void>;
  sendLogs: (log: Log[]) => Promise<void>;
  sendMetric: (metric: Metric) => Promise<void>;
  sendMetrics: (metrics: Metric[]) => Promise<void>;
};

type ClientConfig = {
  tenantId: string;
  token: string;
};

type Log = {
  content: string;
  ["log.source"]: string;
  loglevel: string;
  ["dt.entity.custom_device"]: string;
};

type Metric = string;
```
