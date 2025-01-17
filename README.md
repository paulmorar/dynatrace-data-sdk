# dynatrace-data-sdk

## Introduction

This package aims at simplifying data interactions with your Dynatrace tenant using the JavaScript SDK. It can be used directly in any JavaScript application or Node.js server-side application. The SDK provides a set of tools to send logs and metrics to your Dynatrace environment, making it easier to monitor and analyze your application's performance.

## Getting started

Install the SDK using your package manager of choice:

```sh
// npm example
npm install dynatrace-data-sdk

// yarn example
yarn add dynatrace-data-sdk

// pnpm example
pnpm install dynatrace-data-sdk
```

### SDK initialization

To initialize the SDK, import the `initialize` function and configure it with your tenant ID and token:

```js
import initialize from "dynatrace-data-sdk";

const client = initialize({ tenantId: TENANT_ID, token: YOUR_ID_TOKEN });

// Example usage
client
  .sendLog({
    content: "This is a log message",
    "log.source": "example-source",
    loglevel: "INFO",
    "dt.entity.custom_device": "CUSTOM_DEVICE_ID",
  })
  .then(() => {
    console.log("Log sent successfully");
  })
  .catch((error) => {
    console.error("Error sending log:", error);
  });
```

You are now left with various interactions that fit your needs. After initialization, the client exposes functions that return a promise.

## TypeScript

This package also provides TypeScript definitions for the following:

```ts
import { SDKClient, ClientConfig, Log, Metric } from "dynatrace-data-sdk";

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
