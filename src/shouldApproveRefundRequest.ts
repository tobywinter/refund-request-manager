import { getRefundInvalidFrom } from "./getRefundInvalidFrom";
import { getRegion } from "./getRegion";
import { RequestType, getRequestTimeLimit } from "./getRequestTimeLimit";
import { getTermsOfServiceVersion } from "./getTermsOfServiceVersion";
import { normaliseDate } from "./normaliseDate";
import { phoneRefundRequestEffectiveDateTime } from "./phoneRefundRequestEffectiveDateTime";

export function shouldApproveRefundRequest(
  timezone: string,
  signUpDate: string,
  requestSource: RequestType,
  investmentDate: string,
  investmentTime: string,
  refundRequestDate: string,
  refundRequestTime: string
): boolean {
  const region = getRegion(timezone);
  const normalisedSignUpDate = normaliseDate(signUpDate, region);
  const termsOfServiceVersion = getTermsOfServiceVersion(normalisedSignUpDate);
  const approvalTimeLimit = getRequestTimeLimit(
    requestSource,
    termsOfServiceVersion
  );
  // Calculate the time from which the refund request is invalid
  const normalisedInvestmentDate = normaliseDate(investmentDate, region);
  const investmentDateTime = new Date(
    normalisedInvestmentDate.toDateString() + " " + investmentTime
  );

  const refundInvalidFrom = getRefundInvalidFrom(
    investmentDateTime,
    approvalTimeLimit
  );

  // Get the time the refund request is be registered
  let refundRequestEffectiveDateTime: Date;
  if (requestSource === "phone") {
    refundRequestEffectiveDateTime = phoneRefundRequestEffectiveDateTime(
      refundRequestDate,
      refundRequestTime,
      region
    );
  } else {
    refundRequestEffectiveDateTime = new Date(
      normaliseDate(refundRequestDate, region).toDateString() +
        " " +
        refundRequestTime
    );
  }

  if (refundRequestEffectiveDateTime > refundInvalidFrom) {
    return false;
  }

  return true;
}
