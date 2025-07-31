import { create } from "zustand";

interface TentoStore {
  Tentos: number[];
  TentoTracker: number;
  getTento: () => number;
  getNextTento: () => number;
  updateTentoTracker: () => void;
  resetTracker: () => void;
}

const useTentoStore = create<TentoStore>((set, get) => ({
  Tentos: [1, 3, 6, 9, 12],
  TentoTracker: 0,

  getTento: () => {
    const { Tentos, TentoTracker } = get();
    return Tentos[TentoTracker];
  },

  getNextTento: () => {
    const { Tentos, TentoTracker } = get();
    const nextIndex = (TentoTracker + 1) % Tentos.length;
    return Tentos[nextIndex];
  },

  updateTentoTracker: () => {
    set((state) => ({
      TentoTracker: (state.TentoTracker + 1) % state.Tentos.length,
    }));
  },

  resetTracker: () => {
    set({ TentoTracker: 0 });
  },
}));

export default useTentoStore;
