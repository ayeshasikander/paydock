import type { Metadata } from "next";
import Link from "next/link";
import { Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";
import { DemoBanner } from "@/components/layout/DemoBanner";

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PayDev Hub — Developer Utilities",
  description: "Webhook tester, fee calculator, and gateway docs for PayDock",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${syne.variable} ${jetbrainsMono.variable} min-h-screen bg-[#0f172a] font-sans text-[#f1f5f9] antialiased`}
      >
        <Sidebar />
        <MobileNav />
        <header className="fixed left-0 right-0 top-0 z-30 flex h-14 items-center border-b border-[#334155] bg-[#0f172a] px-4 md:hidden">
          <Link href="/" className="font-bold text-[#f1f5f9] hover:text-[#10b981] transition-colors">
            PayDev Hub
          </Link>
        </header>
        <main className="min-h-screen w-full min-w-0 pl-0 pt-14 md:pt-0 md:pl-60 pb-[calc(5rem+env(safe-area-inset-bottom,0px))] md:pb-0">
          <DemoBanner />
          {children}
        </main>
      </body>
    </html>
  );
}
