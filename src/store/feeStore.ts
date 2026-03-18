import { create } from "zustand";

interface FeeState {
  baseAmount: number;
  setBaseAmount: (amount: number) => void;
  selectedGatewayId: string | null;
  setSelectedGatewayId: (id: string | null) => void;
}

export const useFeeStore = create<FeeState>((set) => ({
  baseAmount: 0,
  setBaseAmount: (baseAmount) => set({ baseAmount }),
  selectedGatewayId: null,
  setSelectedGatewayId: (selectedGatewayId) => set({ selectedGatewayId }),
}));
