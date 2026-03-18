"use client";

import { Card } from "@/components/ui/Card";
import { MOCK_DASHBOARD } from "@/lib/mockData";

const useMock = process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export function MockStats() {
  if (!useMock) return null;

  const items = [
    { label: "Webhooks (demo 24h)", value: String(MOCK_DASHBOARD.webhooksToday) },
    { label: "Fee calcs (demo)", value: String(MOCK_DASHBOARD.feeCalculations) },
    { label: "API latency (mock)", value: `${MOCK_DASHBOARD.apiLatencyMs}ms` },
    { label: "Uptime (mock)", value: MOCK_DASHBOARD.uptime },
  ];

  return (
    <div className="mb-6 sm:mb-8 grid grid-cols-2 gap-3 lg:grid-cols-4">
      {items.map(({ label, value }) => (
        <Card key={label} hover={false} className="p-4">
          <p className="text-[10px] uppercase tracking-wide text-[#64748b] sm:text-xs">
            {label}
          </p>
          <p className="mt-1 font-mono text-lg font-semibold text-[#10b981] sm:text-xl">
            {value}
          </p>
        </Card>
      ))}
    </div>
  );
}
