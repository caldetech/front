import { create } from 'zustand'

export const useStore = create((set) => ({
  invite: null,
  setInvite: (newInvite: string) => set({ invite: newInvite })
}))