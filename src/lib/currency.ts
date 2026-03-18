import type { Gateway } from "./gateways";

export function formatAmount(
  value: number,
  currency: string,
  decimalPlaces: number
): string {
  return new Intl.NumberFormat("en-US", {
    style: "decimal",
    minimumFractionDigits: decimalPlaces,
    maximumFractionDigits: decimalPlaces,
  }).format(value);
}

export function formatWithSymbol(
  value: number,
  gateway: Gateway
): string {
  const formatted = formatAmount(
    value,
    gateway.currency,
    gateway.decimalPlaces
  );
  return gateway.currencySymbol + formatted;
}
