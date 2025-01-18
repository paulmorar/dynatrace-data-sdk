import { sendLogs } from "../sendLogs";
import { expect, test, vi } from "vitest";
import axios from "axios";

vi.mock("axios");

const testCases = [
  {
    name: "sendLogs should send logs successfully",
    logs: [
      {
        content: "test log",
        loglevel: "info",
        ["log.source"]: "source",
        ["dt.entity.custom_device"]: "device",
      },
    ],
    mockResponse: { status: 200 },
    expectedError: null,
  },
  {
    name: "sendLogs should handle errors",
    logs: [
      {
        content: "test log",
        loglevel: "info",
        ["log.source"]: "source",
        ["dt.entity.custom_device"]: "device",
      },
    ],
    mockResponse: "huston_we_have_a_problem",
    expectedError: "huston_we_have_a_problem",
  },
];

testCases.forEach(({ name, logs, mockResponse, expectedError }) => {
  test(name, async () => {
    if (expectedError) {
      (axios as any).mockRejectedValueOnce(mockResponse);
      await expect(sendLogs("tenantId", "token", logs)).rejects.toThrow(
        expectedError
      );
    } else {
      (axios as any).mockResolvedValue(mockResponse);
      await sendLogs("tenantId", "token", logs);
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
});
