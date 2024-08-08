import { RequestTimeLimit } from "./getRequestTimeLimit";

export function getRefundInvalidFrom(
  investmentDate: Date,
  requestTimeLimit: RequestTimeLimit
): Date {
  const refundInvalidFrom = new Date(investmentDate);
  refundInvalidFrom.setHours(refundInvalidFrom.getHours() + requestTimeLimit);
  return refundInvalidFrom;
}
