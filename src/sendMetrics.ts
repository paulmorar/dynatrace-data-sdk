import axios from "axios";

export const sendMetrics = async (
  tenantId: string,
  token: string,
  metricData: string
) => {
  try {
    const response = await axios({
      method: "post",
      url: `https://${tenantId}.live.dynatrace.com/api/v2/metrics/ingest`,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "text/plain; charset=utf-8",
        Authorization: `Api-Token ${token}`,
      },
      data: metricData,
    });
    console.log(`Successfully posted metric: ${response.status}`, metricData);
  } catch (err) {
    console.error("Error posting metric: ", metricData);
    console.error(JSON.stringify(err));
    throw err;
  }
};
