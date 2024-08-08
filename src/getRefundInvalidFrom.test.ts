import { describe, expect, test } from "vitest";
import { normaliseDate } from "./normaliseDate";
import { getRefundInvalidFrom } from "./getRefundInvalidFrom";
import { TimeLimits } from "./getRequestTimeLimit";

describe("getRefundInvalidFrom", () => {
  describe("Region is US", () => {
    test.each([
      ["1/2/2021 06:00", TimeLimits[4], new Date("1/2/2021 10:00")],
      ["1/2/2021 06:00", TimeLimits[8], new Date("1/2/2021 14:00")],
      ["1/2/2021 06:00", TimeLimits[16], new Date("1/2/2021 22:00")],
      ["1/2/2021 06:00", TimeLimits[24], new Date("1/3/2021 06:00")],
    ])(
      "when investment date is %s and requestTimeLimit is %i returns %s",
      (investmentDate, requestTimeLimit, expectedRefundInvalidFrom) => {
        const region = "US";
        const normalisedInvestmentDate = normaliseDate(investmentDate, region);
        expect(
          getRefundInvalidFrom(normalisedInvestmentDate, requestTimeLimit)
        ).toEqual(expectedRefundInvalidFrom);
      }
    );
  });
});
