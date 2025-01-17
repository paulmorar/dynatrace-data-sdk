import { sendLogs } from "../sendLogs";
import { Log } from "../types";
import { expect, test, vi } from "vitest";
import axios from "axios";

vi.mock("axios");

test("sendLogs should send logs successfully", async () => {
  const logs: Log[] = [
    {
      content: "test log",
      loglevel: "info",
      ["log.source"]: "source",
      ["dt.entity.custom_device"]: "device",
    },
  ];

  const mockResponse = { status: 200 };
  (axios as any).mockResolvedValue(mockResponse);

  await sendLogs("tenantId", "token", logs);

  expect(axios).toHaveBeenCalledWith(
    expect.objectContaining({
      method: "post",
      url: `https://tenantId.live.dynatrace.com/api/v2/logs/ingest`,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Api-Token token`,
      },
      data: logs,
    })
  );
});

test("sendLogs should handle errors", async () => {
  const logs: Log[] = [
    {
      content: "test log",
      loglevel: "info",
      ["log.source"]: "source",
      ["dt.entity.custom_device"]: "device",
    },
  ];

  const mockError = {
    response: {
      status: 400,
      data: { error: "Bad Request" },
    },
  };
  (axios as any).mockRejectedValue(mockError);

  try {
    await sendLogs("tenantId", "token", logs);
  } catch (error) {
    expect(error).toEqual(mockError);
  }

  expect(axios).toHaveBeenCalledWith(
    expect.objectContaining({
      method: "post",
      url: `https://tenantId.live.dynatrace.com/api/v2/logs/ingest`,
      headers: {
        Accept: "application/json; charset=utf-8",
        "Content-Type": "application/json; charset=utf-8",
        Authorization: `Api-Token token`,
      },
      data: logs,
    })
  );
});
