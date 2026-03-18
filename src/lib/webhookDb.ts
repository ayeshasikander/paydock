import path from "node:path";
import fs from "node:fs";
import { JSONFilePreset } from "lowdb/node";
import type { Low } from "lowdb";

export interface WebhookRecord {
  id: string;
  timestamp: string;
  headers: Record<string, string>;
  body: unknown;
  method: string;
  url?: string;
}

interface WebhookSchema {
  webhooks: WebhookRecord[];
}

const MAX_WEBHOOKS = 10;
const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "webhooks.json");

let dbPromise: Promise<Low<WebhookSchema>> | null = null;

async function getDb(): Promise<Low<WebhookSchema>> {
  if (!dbPromise) {
    try {
      fs.mkdirSync(dataDir, { recursive: true });
    } catch {
      // ignore
    }
    dbPromise = JSONFilePreset<WebhookSchema>(dbPath, { webhooks: [] });
  }
  return dbPromise;
}

export async function addWebhook(record: Omit<WebhookRecord, "id" | "timestamp">): Promise<string> {
  const db = await getDb();
  const id = crypto.randomUUID();
  const timestamp = new Date().toISOString();
  const full: WebhookRecord = { ...record, id, timestamp };

  await db.update((data) => {
    data.webhooks.unshift(full);
    data.webhooks.splice(MAX_WEBHOOKS);
  });

  return id;
}

export async function getWebhooks(): Promise<WebhookRecord[]> {
  const db = await getDb();
  await db.read();
  return [...(db.data.webhooks ?? [])];
}

export async function clearWebhooks(): Promise<void> {
  const db = await getDb();
  await db.update((data) => {
    data.webhooks = [];
  });
}
