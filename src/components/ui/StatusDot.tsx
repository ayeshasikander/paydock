"use client";

export function StatusDot({ live = true }: { live?: boolean }) {
  return (
    <span
      className={`inline-block h-2 w-2 rounded-full ${live ? "bg-[#10b981] animate-pulse-dot" : "bg-[#64748b]"}`}
      title={live ? "API live" : "Offline"}
    />
  );
}
