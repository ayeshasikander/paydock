import Link from "next/link";
import { ArrowRight, Webhook, Calculator, Library, FileText } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { MockStats } from "@/components/dashboard/MockStats";

const quickActions = [
  {
    href: "/webhook-tester",
    title: "Webhook Tester",
    description: "Send and inspect webhook payloads in real time.",
    icon: Webhook,
  },
  {
    href: "/fee-calculator",
    title: "Fee Calculator",
    description: "Compare gateway fees and see what you'll receive.",
    icon: Calculator,
  },
  {
    href: "/components",
    title: "Component Library",
    description: "Browse UI components for your integration.",
    icon: Library,
  },
  {
    href: "/docs",
    title: "Global Gateway Docs",
    description: "MDX-powered documentation for gateways.",
    icon: FileText,
  },
];

export default function Home() {
  return (
    <div className="w-full min-w-0 px-4 py-5 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8">
        <p className="text-xs sm:text-sm text-[#94a3b8] mb-1">PayDev Hub</p>
        <h1 className="text-xl sm:text-2xl font-bold text-[#f1f5f9]">Dashboard</h1>
      </div>
      <MockStats />
      <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {quickActions.map(({ href, title, description, icon: Icon }) => (
          <Link key={href} href={href}>
            <Card className="flex flex-col gap-2 cursor-pointer group">
              <div className="flex items-center justify-between">
                <div className="rounded-lg bg-[#10b981]/10 p-2 text-[#10b981]">
                  <Icon className="h-5 w-5" />
                </div>
                <ArrowRight className="h-4 w-4 text-[#94a3b8] group-hover:text-[#10b981] group-hover:translate-x-1 transition-all" />
              </div>
              <h2 className="font-semibold text-[#f1f5f9]">{title}</h2>
              <p className="text-sm text-[#94a3b8]">{description}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
