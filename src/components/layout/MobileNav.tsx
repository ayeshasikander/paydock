"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Webhook, Calculator, Library, FileText } from "lucide-react";

const nav = [
  { href: "/webhook-tester", label: "Webhook", icon: Webhook },
  { href: "/fee-calculator", label: "Fees", icon: Calculator },
  { href: "/components", label: "Components", icon: Library },
  { href: "/docs", label: "Docs", icon: FileText },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 flex border-t border-[#334155] bg-[#0f172a] pb-[env(safe-area-inset-bottom)] md:hidden">
      {nav.map(({ href, label, icon: Icon }) => {
        const active = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            className={`flex min-h-[44px] flex-1 flex-col items-center justify-center gap-0.5 py-2 text-xs transition-colors touch-manipulation ${
              active ? "text-[#10b981]" : "text-[#94a3b8]"
            }`}
          >
            <Icon className="h-5 w-5 shrink-0" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
