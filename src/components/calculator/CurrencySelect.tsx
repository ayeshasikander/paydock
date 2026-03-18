"use client";

import { GATEWAYS } from "@/lib/gateways";

interface CurrencySelectProps {
  value: string;
  onChange: (gatewayId: string) => void;
  label?: string;
}

export function CurrencySelect({ value, onChange, label = "Gateway" }: CurrencySelectProps) {
  return (
    <div>
      {label && (
        <label className="mb-1.5 block text-sm font-medium text-[#94a3b8]">
          {label}
        </label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-[#334155] bg-[#1e293b] px-4 py-2.5 text-[#f1f5f9] font-mono focus:border-[#10b981] focus:outline-none focus:ring-1 focus:ring-[#10b981]"
      >
        {GATEWAYS.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name} ({g.currencySymbol})
          </option>
        ))}
      </select>
    </div>
  );
}
