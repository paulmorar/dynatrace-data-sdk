export type Log = {
  content: string;
  ["log.source"]: string;
  loglevel: string;
  ["dt.entity.custom_device"]: string;
};

export type Metric = string;

export type ClientConfig = {
  tenantId: string;
  token: string;
};

export type SDKClient = {
  sendLog: (log: Log) => Promise<void>;
  sendLogs: (log: Log[]) => Promise<void>;
  sendMetric: (metric: Metric) => Promise<void>;
  sendMetrics: (metrics: Metric[]) => Promise<void>;
};
