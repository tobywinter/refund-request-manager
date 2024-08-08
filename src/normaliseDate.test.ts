import { describe, expect, test } from "vitest";
import { normaliseDate } from "./normaliseDate";

// #### Dates
// US customers follow the date format MONTH/DAY/YEAR, whereas Europeans use DAY/MONTH/YEAR.
// US Investor signed up after 1/2/2020 = new TOS
// UK Investor signed up after 2/1/2020 (same date) for Europeans = new TOS
// The date in the table is already formatted based on the users location.

describe("normaliseDate", () => {
  test("normalise a US date correctly from MM/DD/YYYY", () => {
    const signupDate = "1/2/2020";
    const region = "US";
    expect(normaliseDate(signupDate, region).toDateString()).toBe(
      "Thu Jan 02 2020"
    );
  });

  test("normalise a EU date correctly from MM/DD/YYYY", () => {
    const signupDate = "2/1/2020";
    const region = "EU";
    expect(normaliseDate(signupDate, region).toDateString()).toBe(
      "Thu Jan 02 2020"
    );
  });
});
