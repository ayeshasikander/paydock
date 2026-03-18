"use client";

export function JsonViewer({ data }: { data: unknown }) {
  const str =
    typeof data === "string"
      ? data
      : JSON.stringify(data, null, 2);
  return (
    <pre className="min-w-0 overflow-auto rounded-lg bg-[#0f172a] p-3 sm:p-4 text-xs sm:text-sm font-mono text-[#94a3b8] max-h-64">
      <code>{str}</code>
    </pre>
  );
}
