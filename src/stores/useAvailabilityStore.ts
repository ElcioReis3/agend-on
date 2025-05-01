import { create } from "zustand";

type Availability = {
  id?: string;
  date: string;
  availableHours: string[];
};

type AvailabilityStore = {
  availabilities: Availability[];
  addAvailability: (availability: Availability) => void;
  setAvailabilities: (items: Availability[]) => void;
  clearAvailabilities: () => void;
};

export const useAvailabilityStore = create<AvailabilityStore>((set) => ({
  availabilities: [],

  addAvailability: (availability) =>
    set((state) => ({
      availabilities: [...state.availabilities, availability],
    })),

  setAvailabilities: (items) => set({ availabilities: items }),

  clearAvailabilities: () => set({ availabilities: [] }),
}));
