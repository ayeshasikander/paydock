"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Copy } from "lucide-react";
import { useWebhooks } from "@/hooks/useWebhooks";
import { WebhookRow } from "@/components/webhook/WebhookRow";
import { Button } from "@/components/ui/Button";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.03 },
  },
};

const item = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

export default function WebhookTesterPage() {
  const { webhooks, isLoading, clearAll } = useWebhooks();
  const [newestId, setNewestId] = useState<string | null>(null);
  const prevLength = useRef(0);

  useEffect(() => {
    if (webhooks.length > prevLength.current && webhooks.length > 0) {
      setNewestId(webhooks[0].id);
      const t = setTimeout(() => setNewestId(null), 1200);
      prevLength.current = webhooks.length;
      return () => clearTimeout(t);
    }
    prevLength.current = webhooks.length;
  }, [webhooks]);

  return (
    <div className="w-full min-w-0 px-4 py-5 sm:p-6 md:p-8">
      <div className="mb-6 sm:mb-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs sm:text-sm text-[#94a3b8]">Tools</p>
          <h1 className="text-xl sm:text-2xl font-bold text-[#f1f5f9]">Webhook Tester</h1>
        </div>
        <Button variant="secondary" size="sm" onClick={clearAll} className="w-full sm:w-auto min-h-[44px] touch-manipulation">
          <Trash2 className="h-4 w-4 mr-2 shrink-0" />
          Clear all
        </Button>
      </div>

      <motion.div
        className="rounded-xl border border-[#334155] bg-[#1e293b] p-3 sm:p-4 mb-4 sm:mb-6 font-mono text-xs sm:text-sm overflow-x-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <p className="text-[#94a3b8] mb-2">POST endpoint (send payloads here):</p>
        <div className="flex items-start sm:items-center gap-2 flex-wrap min-w-0">
          <code className="text-[#10b981] break-all min-w-0 overflow-x-auto">
            {typeof window !== "undefined" ? `${window.location.origin}/api/webhook` : "/api/webhook"}
          </code>
          <button
            type="button"
            onClick={() => {
              const url = typeof window !== "undefined" ? `${window.location.origin}/api/webhook` : "";
              navigator.clipboard.writeText(url);
            }}
            className="rounded p-1 text-[#94a3b8] hover:text-[#10b981]"
            title="Copy"
          >
            <Copy className="h-4 w-4" />
          </button>
        </div>
      </motion.div>

      <div>
        <h2 className="text-lg font-semibold text-[#f1f5f9] mb-3">Recent requests (last 10)</h2>
        {isLoading ? (
          <p className="text-[#94a3b8]">Loading...</p>
        ) : (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-3"
          >
            <AnimatePresence mode="popLayout">
              {webhooks.length === 0 ? (
                <motion.p variants={item} className="text-[#94a3b8]">
                  No webhooks yet. POST JSON to the endpoint above.
                </motion.p>
              ) : (
                webhooks.map((w) => (
                  <motion.div key={w.id} variants={item}>
                    <WebhookRow
                      webhook={w}
                      isNew={w.id === newestId}
                    />
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </div>
    </div>
  );
}
