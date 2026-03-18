import { MOCK_WEBHOOKS_SEED } from "@/lib/mockData";
import type { WebhookRecord } from "@/lib/webhookDb";

let store: WebhookRecord[] = [...MOCK_WEBHOOKS_SEED];

export function getMockWebhookStore(): WebhookRecord[] {
  return [...store];
}

export function pushMockWebhook(
  entry: Omit<WebhookRecord, "id" | "timestamp">
): string {
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  const full: WebhookRecord = { ...entry, id, timestamp };
  store = [full, ...store].slice(0, 10);
  return id;
}

/** Clear all (demo); list is empty until new POSTs. */
export function clearMockWebhookStore(): void {
  store = [];
}

/** Reset to seed webhooks (e.g. dev only — not used by API). */
export function resetMockWebhookStoreToSeed(): void {
  store = [...MOCK_WEBHOOKS_SEED];
}
