import { create } from "zustand";

export interface WebhookEntry {
  id: string;
  timestamp: string;
  headers: Record<string, string>;
  body: unknown;
  method: string;
}

interface WebhookState {
  lastId: string | null;
  setLastId: (id: string | null) => void;
}

export const useWebhookStore = create<WebhookState>((set) => ({
  lastId: null,
  setLastId: (id) => set({ lastId: id }),
}));
