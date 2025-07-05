import { ServiceType } from "@/types/servicesType";
import { create } from "zustand";

interface selectService {
  services: ServiceType | null;
  reserved_date: string | null;
  reserved_hours: string | null;
}

interface selectServiceStore {
  selectServices: selectService | null;
  setSelectServices: (services: selectService) => void;
  clearSelectServices: () => void;
}

const useselectServiceStore = create<selectServiceStore>((set) => ({
  selectServices: {
    services: null,
    reserved_date: null,
    reserved_hours: null,
  },
  setSelectServices: (selectServices) => set({ selectServices }),
  clearSelectServices: () => set({ selectServices: null }),
}));

export default useselectServiceStore;
