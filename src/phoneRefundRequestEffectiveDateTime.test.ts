import { describe, expect, test } from "vitest";
import { phoneRefundRequestEffectiveDateTime } from "./phoneRefundRequestEffectiveDateTime";

//   Special phone call rules
// Requests made via phone can only be registered within business hours (Mon-Fri, 9am-5pm UK time). Requests made over the phone outside of these times are logged to voicemail but are not registered for the purposes of working out refund elegibility until the next business hours window, e.g:

// If a phone call is made at 7pm UK time on a Monday, the request will be deemed as having been requested at 9am on Tuesday.
// If a phone call is made at 7pm UK time on a Friday, the request will be deemed as having been requested at 9am on the following Monday.
// If a phone call is made at 4.45pm UK time, the request is registered immediately.

describe("phoneRequestEffectiveDateTime", () => {
  describe("If request is between 9am and 5pm", () => {
    test('on Monday 1/4/2021 09:00 effective date time should be "1/4/2021 09:00"', () => {
      const refundRequestDate = "1/4/2021";
      const refundRequestTime = "09:00";
      const expectedRefundRequestEffectiveDateTime = new Date("1/4/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Tuesday 1/5/2021 09:00 effective date time should be "1/5/2021 09:00"', () => {
      const refundRequestDate = "1/5/2021";
      const refundRequestTime = "09:00";
      const expectedRefundRequestEffectiveDateTime = new Date("1/5/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Wednesday 1/6/2021 09:00 effective date time should be "1/6/2021 09:00"', () => {
      const refundRequestDate = "1/6/2021";
      const refundRequestTime = "09:00";
      const expectedRefundRequestEffectiveDateTime = new Date("1/6/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Thursday 1/7/2021 09:00 effective date time should be "1/7/2021 09:00"', () => {
      const refundRequestDate = "1/7/2021";
      const refundRequestTime = "09:00";
      const expectedRefundRequestEffectiveDateTime = new Date("1/7/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Friday 1/8/2021 09:00 effective date time should be "1/8/2021 09:00"', () => {
      const refundRequestDate = "1/8/2021";
      const refundRequestTime = "09:00";
      const expectedRefundRequestEffectiveDateTime = new Date("1/8/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Sunday 1/3/2021 09:00 effective date time should be "1/4/2021 09:00"', () => {
      const refundRequestDate = "1/3/2021";
      const refundRequestTime = "09:00";
      const expectedRefundRequestEffectiveDateTime = new Date("1/4/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Saturday 1/2/2021 09:00 effective date time should be "1/4/2021 09:00"', () => {
      const refundRequestDate = "1/2/2021";
      const refundRequestTime = "09:00";
      const expectedRefundRequestEffectiveDateTime = new Date("1/4/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });
  });

  describe('If request is made out of "9am - 5pm"', () => {
    test('on Sunday 1/3/2021 08:59 effective date time should be "1/4/2021 09:00"', () => {
      const refundRequestDate = "1/3/2021";
      const refundRequestTime = "08:59";
      const expectedRefundRequestEffectiveDateTime = new Date("1/4/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Saturday 1/2/2021 18:30 effective date time should be "1/4/2021 09:00"', () => {
      const refundRequestDate = "1/2/2021";
      const refundRequestTime = "18:30";
      const expectedRefundRequestEffectiveDateTime = new Date("1/4/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Monday 1/4/2021 08:59 effective date time should be "1/4/2021 09:00"', () => {
      const refundRequestDate = "1/4/2021";
      const refundRequestTime = "08:59";
      const expectedRefundRequestEffectiveDateTime = new Date("1/4/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Monday 1/4/2021 17:00 effective date time should be "1/4/2021 09:00"', () => {
      const refundRequestDate = "1/4/2021";
      const refundRequestTime = "17:00";
      const expectedRefundRequestEffectiveDateTime = new Date("1/5/2021 09:00");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Tuesday 1/5/2021 16:59 effective date time should be "1/4/2021 09:00"', () => {
      const refundRequestDate = "1/5/2021";
      const refundRequestTime = "16:59";
      const expectedRefundRequestEffectiveDateTime = new Date("1/5/2021 16:59");
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });

    test('on Friday 1/8/2021 17:00 effective date time should be "1/11/2021 09:00"', () => {
      const refundRequestDate = "1/8/2021";
      const refundRequestTime = "17:00";
      const expectedRefundRequestEffectiveDateTime = new Date(
        "1/11/2021 09:00"
      );
      expect(
        phoneRefundRequestEffectiveDateTime(
          refundRequestDate,
          refundRequestTime
        )
      ).toEqual(expectedRefundRequestEffectiveDateTime);
    });
  });
});
