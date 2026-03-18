import type { Gateway } from "./gateways";
import { formatAmount, formatWithSymbol } from "./currency";

export interface FeeResult {
  netAmount: number;
  totalFee: number;
  percentagePart: number;
  fixedPart: number;
  formattedNet: string;
  formattedFee: string;
  gateway: Gateway;
}

export function calculateFees(
  baseAmount: number,
  gateway: Gateway
): Omit<FeeResult, "gateway"> & { gateway: Gateway } {
  const percentagePart = (baseAmount * gateway.percentageFee) / 100;
  const fixedPart = gateway.fixedFee;
  const totalFee = percentagePart + fixedPart;
  const netAmount = baseAmount - totalFee;

  return {
    netAmount,
    totalFee,
    percentagePart,
    fixedPart,
    formattedNet: formatWithSymbol(netAmount, gateway),
    formattedFee: formatWithSymbol(totalFee, gateway),
    gateway,
  };
}
