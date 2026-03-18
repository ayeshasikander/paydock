"use client";

export function Badge({
  children,
  variant = "default",
  className = "",
}: {
  children: React.ReactNode;
  variant?: "default" | "success" | "warning";
  className?: string;
}) {
  const variants = {
    default: "bg-[#1e293b] text-[#94a3b8] border border-[#334155]",
    success: "bg-[#10b981]/20 text-[#10b981] border border-[#10b981]/40",
    warning: "bg-amber-500/20 text-amber-400 border border-amber-500/40",
  };
  return (
    <span
      className={`inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
