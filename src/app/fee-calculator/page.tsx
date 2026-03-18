"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useFees } from "@/hooks/useFees";
import { useFeeStore } from "@/store/feeStore";
import { GatewayCard } from "@/components/calculator/GatewayCard";

export default function FeeCalculatorPage() {
  const { baseAmount, setBaseAmount } = useFeeStore();
  const [inputValue, setInputValue] = useState(baseAmount > 0 ? String(baseAmount) : "");
  const { results, cheapestGateway, isCalculating } = useFees(baseAmount);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/[^0-9.]/g, "");
    setInputValue(v);
    const num = parseFloat(v);
    setBaseAmount(Number.isFinite(num) ? num : 0);
  };

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm text-[#94a3b8]">Tools</p>
        <h1 className="text-xl sm:text-2xl font-bold text-[#f1f5f9]">Fee Calculator</h1>
      </div>

      <motion.div
        className="mb-6 sm:mb-8 rounded-xl border border-[#334155] bg-[#1e293b] p-4 sm:p-6"
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.2 }}
      >
        <label className="block text-sm font-medium text-[#94a3b8] mb-2">
          Transaction amount (gross)
        </label>
        <input
          type="text"
          inputMode="decimal"
          value={inputValue}
          onChange={handleChange}
          placeholder="e.g. 100"
          className="w-full max-w-full sm:max-w-xs rounded-lg border border-[#334155] bg-[#0f172a] px-4 py-3 font-mono text-base text-[#f1f5f9] placeholder:text-[#64748b] focus:border-[#10b981] focus:outline-none focus:ring-1 focus:ring-[#10b981] min-h-[44px] touch-manipulation"
        />
        <p className="mt-2 text-xs text-[#64748b]">
          Enter the amount the customer pays. We show fee and what you receive per gateway.
        </p>
      </motion.div>

      {baseAmount > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {results.map((r, i) => (
            <GatewayCard
              key={r.gateway.id}
              result={r}
              isCheapest={cheapestGateway?.id === r.gateway.id}
              index={i}
            />
          ))}
        </motion.div>
      )}

      {baseAmount <= 0 && (
        <p className="text-[#94a3b8]">Enter an amount to see fee comparison across gateways.</p>
      )}
    </div>
  );
}
