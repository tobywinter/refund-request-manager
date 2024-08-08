export type RequestTimeLimit = 4 | 8 | 16 | 24;

export type RequestType = "phone" | "web app";
export type TermsOfService = "old" | "new";

export const TimeLimits: Record<string, RequestTimeLimit> = {
  4: 4,
  8: 8,
  16: 16,
  24: 24,
};
export function getRequestTimeLimit(
  requestType: RequestType,
  termsOfService: TermsOfService
): RequestTimeLimit {
  if (requestType === "phone" && termsOfService === "old") {
    return TimeLimits[4];
  }

  if (requestType === "phone" && termsOfService === "new") {
    return TimeLimits[24];
  }

  if (requestType === "web app" && termsOfService === "old") {
    return TimeLimits[8];
  }

  return TimeLimits[16];
}
