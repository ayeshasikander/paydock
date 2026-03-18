import { NextRequest, NextResponse } from "next/server";
import { addWebhook, getWebhooks, clearWebhooks } from "@/lib/webhookDb";
import { isMockDemo } from "@/lib/config";
import {
  getMockWebhookStore,
  pushMockWebhook,
  clearMockWebhookStore,
} from "@/lib/mockWebhookStore";

function headersToRecord(headers: Headers): Record<string, string> {
  const record: Record<string, string> = {};
  headers.forEach((value, key) => {
    record[key] = value;
  });
  return record;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json().catch(() => ({}));
    if (isMockDemo()) {
      const id = pushMockWebhook({
        method: "POST",
        headers: headersToRecord(request.headers),
        body,
      });
      return NextResponse.json({ success: true, id, mock: true });
    }
    const id = await addWebhook({
      method: "POST",
      headers: headersToRecord(request.headers),
      body,
    });
    return NextResponse.json({ success: true, id });
  } catch (e) {
    console.error("Webhook POST error:", e);
    return NextResponse.json(
      { success: false, error: "Failed to store webhook" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    if (isMockDemo()) {
      return NextResponse.json(getMockWebhookStore());
    }
    const webhooks = await getWebhooks();
    return NextResponse.json(webhooks);
  } catch (e) {
    console.error("Webhook GET error:", e);
    return NextResponse.json([], { status: 200 });
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  if (searchParams.get("clear") !== "1") {
    return NextResponse.json({ success: false }, { status: 400 });
  }
  try {
    if (isMockDemo()) {
      clearMockWebhookStore();
      return NextResponse.json({ success: true, mock: true });
    }
    await clearWebhooks();
    return NextResponse.json({ success: true });
  } catch (e) {
    console.error("Webhook DELETE error:", e);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
