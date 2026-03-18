"use client";

import { motion } from "framer-motion";
import type { FeeResult } from "@/lib/fees";
import CountUp from "react-countup";

interface GatewayCardProps {
  result: FeeResult;
  isCheapest?: boolean;
  index?: number;
}

export function GatewayCard({ result, isCheapest, index = 0 }: GatewayCardProps) {
  const { gateway, netAmount, totalFee, formattedNet, formattedFee } = result;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className="card-hover min-w-0 rounded-xl border border-[#334155] bg-[#1e293b] p-4 sm:p-5"
    >
      <div className="flex items-center justify-between mb-3">
        <span className="font-semibold text-[#f1f5f9]">{gateway.name}</span>
        {isCheapest && (
          <span className="rounded-full bg-[#10b981]/20 px-2 py-0.5 text-xs font-medium text-[#10b981]">
            Best rate
          </span>
        )}
      </div>
      <div className="space-y-1 font-mono text-sm">
        <p className="text-[#94a3b8]">
          Fee:{" "}
          <CountUp
            end={totalFee}
            duration={0.4}
            decimals={gateway.decimalPlaces}
            prefix={gateway.currencySymbol}
            className="text-[#10b981]"
          />
        </p>
        <p className="text-[#94a3b8]">
          You receive:{" "}
          <CountUp
            end={netAmount}
            duration={0.4}
            decimals={gateway.decimalPlaces}
            prefix={gateway.currencySymbol}
            className="text-[#f1f5f9]"
          />
        </p>
      </div>
    </motion.div>
  );
}
