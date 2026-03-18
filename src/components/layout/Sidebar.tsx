"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Webhook, Calculator, Library, FileText, Command } from "lucide-react";
import { StatusDot } from "@/components/ui/StatusDot";
import { Badge } from "@/components/ui/Badge";

const nav = [
  { href: "/webhook-tester", label: "Webhook Tester", icon: Webhook },
  { href: "/fee-calculator", label: "Fee Calculator", icon: Calculator },
  { href: "/components", label: "Component Library", icon: Library },
  { href: "/docs", label: "Global Gateway Docs", icon: FileText },
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="fixed left-0 top-0 z-40 hidden h-screen w-60 flex-col border-r border-[#334155] bg-[#0f172a] md:flex">
      <div className="flex h-14 items-center gap-2 border-b border-[#334155] px-4">
        <span className="font-bold text-lg text-[#f1f5f9]">PayDev Hub</span>
        <Badge variant="success">v1</Badge>
      </div>
      <nav className="flex-1 space-y-0.5 p-3">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-[#1e293b] text-[#10b981]"
                  : "text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f1f5f9]"
              }`}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-[#334155] p-3 space-y-2">
        <div className="flex items-center gap-2 rounded-lg bg-[#1e293b] px-3 py-2">
          <StatusDot live />
          <span className="text-xs text-[#94a3b8]">API Status</span>
        </div>
        <Link
          href="/"
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-[#94a3b8] hover:bg-[#1e293b] hover:text-[#f1f5f9] transition-colors"
        >
          <Command className="h-4 w-4" />
          <span>Command palette</span>
          <kbd className="ml-auto rounded bg-[#334155] px-1.5 py-0.5 text-[10px]">
            ⌘K
          </kbd>
        </Link>
      </div>
    </aside>
  );
}
