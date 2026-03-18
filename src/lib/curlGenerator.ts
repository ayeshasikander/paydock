export interface WebhookEntry {
  id: string;
  timestamp: string;
  headers: Record<string, string>;
  body: unknown;
  method: string;
  url?: string;
}

function escapeForShell(str: string): string {
  return str.replace(/'/g, "'\\''");
}

export function generateCurl(webhook: WebhookEntry, baseUrl: string): string {
  const url = webhook.url ?? `${baseUrl}/api/webhook`;
  const parts: string[] = ["curl", "-X", webhook.method, `'${escapeForShell(url)}'`];

  const headers = webhook.headers ?? {};
  for (const [key, value] of Object.entries(headers)) {
    if (key.toLowerCase() === "host") continue;
    parts.push("-H", `'${key}: ${escapeForShell(value)}'`);
  }

  if (webhook.method === "POST" && webhook.body != null) {
    const bodyStr =
      typeof webhook.body === "string"
        ? webhook.body
        : JSON.stringify(webhook.body);
    parts.push("-d", `'${escapeForShell(bodyStr)}'`);
  }

  return parts.join(" ");
}
