"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown, Copy } from "lucide-react";
import { JsonViewer } from "./JsonViewer";
import { CurlGenerator } from "./CurlGenerator";
import type { WebhookEntry } from "@/hooks/useWebhooks";

interface WebhookRowProps {
  webhook: WebhookEntry;
  isNew?: boolean;
}

export function WebhookRow({ webhook, isNew }: WebhookRowProps) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={isNew ? { backgroundColor: "rgba(16, 185, 129, 0.2)" } : false}
      animate={{ backgroundColor: "transparent" }}
      transition={{ duration: 1 }}
      className={`rounded-lg border border-[#334155] bg-[#1e293b] overflow-hidden min-w-0 ${isNew ? "animate-flash-green" : ""}`}
    >
      <button
        type="button"
        onClick={() => setExpanded((e) => !e)}
        className="flex w-full min-h-[44px] items-center justify-between gap-2 p-3 sm:p-4 text-left hover:bg-[#334155]/50 transition-colors touch-manipulation"
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2 sm:gap-3">
          <span className="font-mono text-xs sm:text-sm text-[#10b981] shrink-0">{webhook.method}</span>
          <span className="text-xs sm:text-sm text-[#94a3b8] truncate">
            {new Date(webhook.timestamp).toLocaleString()}
          </span>
          <span className="text-xs text-[#64748b] shrink-0">#{webhook.id.slice(0, 8)}</span>
        </div>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-[#94a3b8] transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>
      {expanded && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          className="border-t border-[#334155] p-3 sm:p-4 space-y-4 min-w-0 overflow-hidden"
        >
          <div>
            <p className="text-xs font-medium text-[#94a3b8] mb-1">Body</p>
            <JsonViewer data={webhook.body} />
          </div>
          <div>
            <p className="text-xs font-medium text-[#94a3b8] mb-1">cURL</p>
            <CurlGenerator webhook={webhook} />
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
