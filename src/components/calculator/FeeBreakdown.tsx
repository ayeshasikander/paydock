"use client";

import type { FeeResult } from "@/lib/fees";

interface FeeBreakdownProps {
  result: FeeResult;
}

export function FeeBreakdown({ result }: FeeBreakdownProps) {
  const { gateway, percentagePart, fixedPart, totalFee, netAmount } = result;

  return (
    <div className="rounded-lg bg-[#0f172a] p-4 font-mono text-sm space-y-2">
      <div className="flex justify-between text-[#94a3b8]">
        <span>Percentage ({gateway.percentageFee}%)</span>
        <span>
          {gateway.currencySymbol}
          {percentagePart.toFixed(gateway.decimalPlaces)}
        </span>
      </div>
      <div className="flex justify-between text-[#94a3b8]">
        <span>Fixed fee</span>
        <span>
          {gateway.currencySymbol}
          {fixedPart.toFixed(gateway.decimalPlaces)}
        </span>
      </div>
      <div className="border-t border-[#334155] pt-2 flex justify-between text-[#f1f5f9]">
        <span>Total fee</span>
        <span>{result.formattedFee}</span>
      </div>
      <div className="flex justify-between text-[#10b981] font-medium">
        <span>Net</span>
        <span>{result.formattedNet}</span>
      </div>
    </div>
  );
}
