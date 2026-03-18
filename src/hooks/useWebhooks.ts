"use client";

import { useState, useEffect, useCallback } from "react";

export interface WebhookEntry {
  id: string;
  timestamp: string;
  headers: Record<string, string>;
  body: unknown;
  method: string;
  url?: string;
}

const POLL_INTERVAL_MS = 3000;

export function useWebhooks() {
  const [webhooks, setWebhooks] = useState<WebhookEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchWebhooks = useCallback(async () => {
    try {
      const res = await fetch("/api/webhook");
      if (res.ok) {
        const data = await res.json();
        setWebhooks(Array.isArray(data) ? data : data.webhooks ?? []);
      }
    } catch {
      setWebhooks([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchWebhooks();
    const interval = setInterval(fetchWebhooks, POLL_INTERVAL_MS);
    return () => clearInterval(interval);
  }, [fetchWebhooks]);

  const clearAll = useCallback(async () => {
    try {
      await fetch("/api/webhook?clear=1", { method: "DELETE" });
      setWebhooks([]);
    } catch {
      // ignore
    }
  }, []);

  return { webhooks, isLoading, clearAll, refresh: fetchWebhooks };
}
