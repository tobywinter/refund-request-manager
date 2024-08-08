import { describe, expect, test } from "vitest";
import { getRegion } from "./getRegion";

describe("getRegion", () => {
  test('should return "US" for US timezones', () => {
    expect(getRegion("US (PST)")).toBe("US");
  });

  test('should return "EU" for EU timezones', () => {
    expect(getRegion("Europe (CET)")).toBe("EU");
  });
});
