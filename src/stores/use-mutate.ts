import { create } from "zustand";

type StoreState = {
  mutate: () => void;
  setMutate: (mutate: () => void) => void;
};

export const useStore = create<StoreState>((set) => ({
  mutate: () => {},
  setMutate: (mutate) => set({ mutate }),
}));
