import { normaliseDate } from "./normaliseDate";

const dayMap: Record<number, { day: string; isWorkingDay: boolean }> = {
  0: { day: "Sunday", isWorkingDay: false },
  1: { day: "Monday", isWorkingDay: true },
  2: { day: "Tuesday", isWorkingDay: true },
  3: { day: "Wednesday", isWorkingDay: true },
  4: { day: "Thursday", isWorkingDay: true },
  5: { day: "Friday", isWorkingDay: true },
  6: { day: "Saturday", isWorkingDay: false },
};
export function phoneRefundRequestEffectiveDateTime(
  refundRequestDate: string,
  refundRequestTime: string,
  region: "US" | "EU" = "US"
): Date {
  const normalisedDate = normaliseDate(refundRequestDate, region);
  const normalisedDateTime = new Date(
    normalisedDate.toDateString() + " " + refundRequestTime
  );

  if (normalisedDateTime.getHours() < 9) {
    normalisedDateTime.setHours(9, 0, 0, 0);
  }

  if (normalisedDateTime.getHours() >= 17) {
    normalisedDateTime.setDate(normalisedDateTime.getDate() + 1);
    normalisedDateTime.setHours(9, 0, 0, 0);
  }

  while (!dayMap[normalisedDateTime.getDay()].isWorkingDay) {
    normalisedDateTime.setDate(normalisedDateTime.getDate() + 1);
    normalisedDateTime.setHours(9, 0, 0, 0);
  }

  return normalisedDateTime;
}
