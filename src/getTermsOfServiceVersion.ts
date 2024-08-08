type TermsOfServiceVersion = "old" | "new";

export function getTermsOfServiceVersion(
  signupDate: Date
): TermsOfServiceVersion {
  if (signupDate >= new Date("1/2/2020")) {
    return "new";
  }
  return "old";
}
