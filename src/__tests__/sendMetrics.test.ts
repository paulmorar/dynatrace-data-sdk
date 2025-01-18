import { sendMetrics } from "../sendMetrics";
import { expect, test, vi } from "vitest";
import axios from "axios";

vi.mock("axios");

const testCases = [
  {
    name: "sendMetrics should send metrics successfully",
    metricData: "test.metric 1 1627848123",
    mockResponse: { status: 200 },
    expectedError: null,
  },
  {
    name: "sendMetrics should handle errors",
    metricData: "test.metric 1 1627848123",
    mockResponse: "huston_we_have_a_problem",
    expectedError: "huston_we_have_a_problem",
  },
];

testCases.forEach(({ name, metricData, mockResponse, expectedError }) => {
  test(name, async () => {
    if (expectedError) {
      (axios as any).mockRejectedValueOnce(mockResponse);
      await expect(
        sendMetrics("tenantId", "token", metricData)
      ).rejects.toThrow(expectedError);
    } else {
      (axios as any).mockResolvedValue(mockResponse);
      await sendMetrics("tenantId", "token", metricData);
    }

    expect(axios).toHaveBeenCalledWith(
      expect.objectContaining({
        method: "post",
        url: `https://tenantId.live.dynatrace.com/api/v2/metrics/ingest`,
        headers: {
          Accept: "application/json; charset=utf-8",
          "Content-Type": "text/plain; charset=utf-8",
          Authorization: `Api-Token token`,
        },
        data: metricData,
      })
    );
  });
});
