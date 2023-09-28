import { sendLogs } from "./sendLogs";
import { sendMetrics } from "./sendMetrics";
import { SDKClient, ClientConfig, Log, Metric } from "./types";

/**
 * Method for initialising the SDK client. Once initialised, it will return methods
 * to enable data interactions with your Dynatrace tenant
 * @param {ClientConfig}- Your unique tenant id and the access token generated for data interaction purpose
 * @returns {SDKClient} - sendLog, sendLogs, sendMetric, sendMetrics
 * @example
 * const sdkClient = init({ tenantId: 'you1234', token: '1337-k1tt3n-4prez' });
 */
export const init = ({ tenantId, token }: ClientConfig): SDKClient => {
  return {
    /**
     * Method for retrieving the value of a single feature flag
     * @param {Log} log - log data
     * @returns {Promise<void>}
     * @example
     * sdkClient.sendLog({ content: "Example", "log.source": "test/function", loglevel: "error", "dt.entity.custom_device": "CUSTOM_DEVICE-test" });
     */
    sendLog: (log: Log): Promise<void> => sendLogs(tenantId, token, [log]),
    /**
     * Method for retrieving the value of a single feature flag
     * @param {Log[]} logs - a list of logs
     * @returns {Promise<void>}
     * @example
     * sdkClient.sendLogs([{ content: "Example", "log.source": "test/function", loglevel: "error", "dt.entity.custom_device": "CUSTOM_DEVICE-test" }]);
     */
    sendLogs: (logs: Log[]): Promise<void> => sendLogs(tenantId, token, logs),
    /**
     * Method for retrieving the value of a single feature flag
     * @param {MetricData} metric - metric data
     * @returns {Promise<void>}
     * @example
     * sdkClient.sendMetric('test.metricData');
     */
    sendMetric: (metric: Metric): Promise<void> =>
      sendMetrics(tenantId, token, metric),
    /**
     * Method for sending metrics data to your Dynatrace tenant
     * @param {Metric[]} metrics - metrics data
     * @returns {Promise<void>}
     * @example
     * sdkClient.sendMetrics(['test.metricData1', 'test.metricData2']);
     */
    sendMetrics: (metrics: Metric[]): Promise<void> =>
      sendMetrics(tenantId, token, metrics.join("\n")),
  };
};
