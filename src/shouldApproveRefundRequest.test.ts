import { describe, expect, test } from "vitest";
import { shouldApproveRefundRequest } from "./shouldApproveRefundRequest";

describe("shouldApproveRefundRequest", () => {
  test.each`
    name                  | timezone          | signUpDate      | requestSource | investmentDate  | investmentTime | refundRequestDate | refundRequestTime | expected
    ${"Emma Smith"}       | ${"US (PST)"}     | ${"1/2/2020"}   | ${"phone"}    | ${"1/2/2021"}   | ${"06:00"}     | ${"1/2/2021"}     | ${"09:00"}        | ${false}
    ${"Benjamin Johnson"} | ${"Europe (CET)"} | ${"12/2/2020"}  | ${"web app"}  | ${"2/1/2021"}   | ${"06:30"}     | ${"1/2/2021"}     | ${"23:00"}        | ${false}
    ${"Olivia Davis"}     | ${"Europe (CET)"} | ${"1/2/2020"}   | ${"web app"}  | ${"2/2/2021"}   | ${"13:00"}     | ${"2/2/2021"}     | ${"20:00"}        | ${true}
    ${"Ethan Anderson"}   | ${"US (PST)"}     | ${"1/11/2011"}  | ${"web app"}  | ${"2/1/2021"}   | ${"13:00"}     | ${"2/2/2021"}     | ${"16:00"}        | ${false}
    ${"Sophia Wilson"}    | ${"US (PST)"}     | ${"2/1/2020"}   | ${"phone"}    | ${"2/1/2021"}   | ${"22:00"}     | ${"2/2/2021"}     | ${"05:00"}        | ${true}
    ${"Liam Martinez"}    | ${"Europe (GMT)"} | ${"1/1/2020"}   | ${"web app"}  | ${"1/1/2021"}   | ${"11:00"}     | ${"11/1/2021"}    | ${"12:00"}        | ${false}
    ${"Jonathan Giles"}   | ${"Europe (CET)"} | ${"1/1/2020"}   | ${"phone"}    | ${"1/1/2021"}   | ${"11:00"}     | ${"12/1/2021"}    | ${"12:00"}        | ${false}
    ${"Priya Sharp"}      | ${"Europe (CET)"} | ${"10/10/2020"} | ${"phone"}    | ${"5/5/2021"}   | ${"00:30"}     | ${"5/5/2021"}     | ${"21:00"}        | ${false}
    ${"Raja Ortiz"}       | ${"US (EST)"}     | ${"10/10/2021"} | ${"phone"}    | ${"01/15/2022"} | ${"21:30"}     | ${"01/16/2022"}   | ${"07:00"}        | ${false}
    ${"Livia Burns"}      | ${"US (PST)"}     | ${"10/10/2021"} | ${"phone"}    | ${"01/15/2022"} | ${"21:30"}     | ${"01/16/2022"}   | ${"19:00"}        | ${false}
    ${"Lacey Gates"}      | ${"Europe (CET)"} | ${"10/10/2021"} | ${"web app"}  | ${"15/01/2022"} | ${"23:36"}     | ${"16/01/2022"}   | ${"13:12"}        | ${true}
  `(
    "$name should be approved: $expected",
    ({
      timezone,
      signUpDate,
      requestSource,
      investmentDate,
      investmentTime,
      refundRequestDate,
      refundRequestTime,
      expected,
    }) => {
      expect(
        shouldApproveRefundRequest(
          timezone,
          signUpDate,
          requestSource,
          investmentDate,
          investmentTime,
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expected);
    }
  );
});
