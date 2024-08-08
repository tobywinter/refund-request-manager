export function normaliseDate(signupDate: string, region: "US" | "EU"): Date {
  if (region === "EU") {
    return new Date(signupDate.split("/").reverse().join("/"));
  }

  return new Date(signupDate);
}
