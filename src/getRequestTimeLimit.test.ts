import { describe, expect, test } from "vitest";
import { getRequestTimeLimit } from "./getRequestTimeLimit";

describe("getRequestTimeLimit", () => {
  describe('when requestType is "phone"', () => {
    test('should be 4 hours after investment if termsOfService is "old"', () => {
      const requestType = "phone";
      const termsOfService = "old";
      expect(getRequestTimeLimit(requestType, termsOfService)).toBe(4);
    });

    test('should be 24 hours after investment if termsOfService is "new"', () => {
      const requestType = "phone";
      const termsOfService = "new";
      expect(getRequestTimeLimit(requestType, termsOfService)).toBe(24);
    });
  });

  describe('when requestType is "web app"', () => {
    test('should be 8 hours after investment if termsOfService is "old"', () => {
      const requestType = "web app";
      const termsOfService = "old";
      expect(getRequestTimeLimit(requestType, termsOfService)).toBe(8);
    });

    test('should be 16 hours after investment if termsOfService is "new"', () => {
      const requestType = "web app";
      const termsOfService = "new";
      expect(getRequestTimeLimit(requestType, termsOfService)).toBe(16);
    });
  });
});
