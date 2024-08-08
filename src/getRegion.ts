export function getRegion(timezone: string): "US" | "EU" {
  return timezone.split(" ")[0] === "US" ? "US" : "EU";
}
