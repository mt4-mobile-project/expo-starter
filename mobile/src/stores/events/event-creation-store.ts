import { create } from 'zustand';

interface EventCreationState {
  isCreatingMode: boolean;
  newMarkerLocation: { latitude: number; longitude: number } | null;
  showCreateNotif: boolean;
  formStep: number;
  selectedImage: string | null;
  createdEventId: number | null;

  // Actions
  setIsCreatingMode: (value: boolean) => void;
  setNewMarkerLocation: (location: { latitude: number; longitude: number } | null) => void;
  setShowCreateNotif: (value: boolean) => void;
  setFormStep: (step: number) => void;
  setSelectedImage: (uri: string | null) => void;
  setCreatedEventId: (id: number | null) => void;
  resetCreationState: () => void;
}

export const useEventCreationStore = create<EventCreationState>((set) => ({
  isCreatingMode: false,
  newMarkerLocation: null,
  showCreateNotif: true,
  formStep: 1,
  selectedImage: null,
  createdEventId: null,

  // Actions
  setIsCreatingMode: (value) => set({ isCreatingMode: value }),
  setNewMarkerLocation: (location) => set({ newMarkerLocation: location }),
  setShowCreateNotif: (value) => set({ showCreateNotif: value }),
  setFormStep: (step) => set({ formStep: step }),
  setSelectedImage: (uri) => set({ selectedImage: uri }),
  setCreatedEventId: (id) => set({ createdEventId: id }),
  resetCreationState: () =>
    set({
      isCreatingMode: false,
      newMarkerLocation: null,
      showCreateNotif: true,
      formStep: 1,
      selectedImage: null,
      createdEventId: null,
    }),
}));
