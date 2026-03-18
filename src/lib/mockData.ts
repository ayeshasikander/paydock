import type { WebhookRecord } from "@/lib/webhookDb";

/** Seed webhooks shown in demo mode (and after “Clear all” reset). */
export const MOCK_WEBHOOKS_SEED: WebhookRecord[] = [
  {
    id: "mock-demo-001",
    timestamp: new Date(Date.now() - 3600_000).toISOString(),
    method: "POST",
    headers: {
      "content-type": "application/json",
      "user-agent": "PayDock-Demo/1.0",
    },
    body: {
      event: "payment.succeeded",
      amount: 4999,
      currency: "USD",
      customer: "demo_customer_01",
    },
  },
  {
    id: "mock-demo-002",
    timestamp: new Date(Date.now() - 7200_000).toISOString(),
    method: "POST",
    headers: {
      "content-type": "application/json",
      "x-webhook-signature": "demo_sig_abc123",
    },
    body: {
      type: "invoice.paid",
      id: "inv_demo_xyz",
    },
  },
  {
    id: "mock-demo-003",
    timestamp: new Date(Date.now() - 86400_000).toISOString(),
    method: "POST",
    headers: { "content-type": "application/json" },
    body: { message: "Hello from mock webhook demo" },
  },
];

export const MOCK_DASHBOARD = {
  webhooksToday: 847,
  feeCalculations: 1203,
  apiLatencyMs: 42,
  uptime: "99.98%",
} as const;
