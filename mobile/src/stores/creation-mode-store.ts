import { create } from 'zustand';

interface CreationModeState {
  isCreating: boolean;
  setIsCreating: (isCreating: boolean) => void;
}

export const useCreationModeStore = create<CreationModeState>((set) => ({
  isCreating: false,
  setIsCreating: (isCreating) => set({ isCreating }),
}));
