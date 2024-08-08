import { describe, expect, test } from "vitest";
import { normaliseDate } from "./normaliseDate";
import { getTermsOfServiceVersion } from "./getTermsOfServiceVersion";

describe("getTermsOfServiceVersion", () => {
  describe("if signupDate is on or after 1/2/2020 (Jan 2nd, 2020)", () => {
    test('should be "new" if signupDate is on 1/2/2020', () => {
      const normalisedDate = normaliseDate("1/2/2020", "US");

      expect(getTermsOfServiceVersion(normalisedDate)).toBe("new");
    });

    test('should be "new" if signupDate is on 1/4/2020', () => {
      const normalisedDate = normaliseDate("1/4/2020", "US");

      expect(getTermsOfServiceVersion(normalisedDate)).toBe("new");
    });
  });

  describe("if signupDate is before 1/2/2020 (Jan 2nd, 2020)", () => {
    test('should be "old" if signupDate is on 1/1/2020', () => {
      const normalisedDate = normaliseDate("1/1/2020", "US");

      expect(getTermsOfServiceVersion(normalisedDate)).toBe("old");
    });

    test('should be "old" if signupDate is on 10/10/2019', () => {
      const normalisedDate = normaliseDate("10/10/2019", "US");

      expect(getTermsOfServiceVersion(normalisedDate)).toBe("old");
    });
  });
});
