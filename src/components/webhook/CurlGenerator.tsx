"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { generateCurl, type WebhookEntry } from "@/lib/curlGenerator";

interface CurlGeneratorProps {
  webhook: WebhookEntry;
  baseUrl?: string;
}

export function CurlGenerator({ webhook, baseUrl }: CurlGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const url = typeof window !== "undefined" ? window.location.origin : baseUrl ?? "";
  const curl = generateCurl(webhook, url);

  const copy = () => {
    navigator.clipboard.writeText(curl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative min-w-0">
      <pre className="min-w-0 overflow-x-auto rounded-lg bg-[#0f172a] p-3 sm:p-4 pr-12 text-xs font-mono text-[#94a3b8] whitespace-pre-wrap break-all">
        {curl}
      </pre>
      <button
        type="button"
        onClick={copy}
        className="absolute right-2 top-2 rounded p-2 min-h-[36px] min-w-[36px] flex items-center justify-center text-[#94a3b8] hover:bg-[#334155] hover:text-[#10b981] transition-colors touch-manipulation"
        title="Copy cURL"
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </button>
    </div>
  );
}
