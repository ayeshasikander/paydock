"use client";

import { useMemo, useState, useEffect } from "react";
import { calculateFees, type FeeResult } from "@/lib/fees";
import { GATEWAYS, type Gateway } from "@/lib/gateways";

export function useFees(baseAmount: number) {
  const [isCalculating, setIsCalculating] = useState(false);

  const results = useMemo(() => {
    if (baseAmount <= 0 || !Number.isFinite(baseAmount)) return [];
    return GATEWAYS.map((g) => calculateFees(baseAmount, g)) as FeeResult[];
  }, [baseAmount]);

  const cheapestGateway = useMemo((): Gateway | null => {
    if (results.length === 0) return null;
    return results.reduce((min, r) =>
      r.totalFee < min.totalFee ? r : min
    ).gateway;
  }, [results]);

  useEffect(() => {
    if (baseAmount > 0 && Number.isFinite(baseAmount)) {
      setIsCalculating(true);
      const t = setTimeout(() => setIsCalculating(false), 150);
      return () => clearTimeout(t);
    }
  }, [baseAmount]);

  return { results, cheapestGateway, isCalculating };
}
