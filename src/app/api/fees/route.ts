import { NextRequest, NextResponse } from "next/server";
import { calculateFees } from "@/lib/fees";
import { GATEWAYS } from "@/lib/gateways";
import { isMockDemo } from "@/lib/config";
import { MOCK_DASHBOARD } from "@/lib/mockData";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const amountParam = searchParams.get("amount");
  const amount = amountParam ? parseFloat(amountParam) : 0;

  if (!Number.isFinite(amount) || amount <= 0) {
    return NextResponse.json(
      { error: "Valid amount query required (e.g. ?amount=100)" },
      { status: 400 }
    );
  }

  const results = GATEWAYS.map((g) => calculateFees(amount, g));
  const cheapest = results.reduce((min, r) =>
    r.totalFee < min.totalFee ? r : min
  );

  const base = {
    amount,
    results,
    cheapestGatewayId: cheapest.gateway.id,
  };

  if (isMockDemo()) {
    return NextResponse.json({
      ...base,
      source: "mock" as const,
      demoMeta: {
        sampleCalculations24h: MOCK_DASHBOARD.feeCalculations,
      },
    });
  }

  return NextResponse.json({ ...base, source: "live" as const });
}
