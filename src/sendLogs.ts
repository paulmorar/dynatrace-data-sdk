import axios from "axios";
import { Log } from "./types";

export const sendLogs = async (
  tenantId: string,
  token: string,
  logs: Log[]
) => {
  axios({
    method: "post",
    url: `https://${tenantId}.live.dynatrace.com/api/v2/logs/ingest`,
    headers: {
      Accept: "application/json; charset=utf-8",
      "Content-Type": "application/json; charset=utf-8",
      Authorization: `Api-Token ${token}`,
    },
    data: logs,
  })
    .then((data) => {
      console.log(`Successfully posted log: ${data.status}`, logs);
    })
    .catch((err) => {
      console.log("Error posting log: ", logs);
      console.log(JSON.stringify(err.response.data));
      throw err;
    });
};
