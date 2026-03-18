"use client";

const useMock =
  typeof process.env.NEXT_PUBLIC_USE_MOCK_DATA !== "undefined" &&
  process.env.NEXT_PUBLIC_USE_MOCK_DATA === "true";

export function DemoBanner() {
  if (!useMock) return null;

  return (
    <div className="border-b border-amber-500/40 bg-amber-950/95 px-3 py-2.5 text-center text-[11px] leading-snug text-amber-100 sm:text-xs">
      <strong className="font-semibold">Demo mode</strong>
      <span className="text-amber-200/90">
        {" "}
        — Mock webhooks (memory) & demo stats. For real persistence:{" "}
        <code className="rounded bg-amber-900/80 px-1 font-mono text-[10px] whitespace-nowrap">
          NEXT_PUBLIC_USE_MOCK_DATA=false
        </code>
      </span>
    </div>
  );
}
