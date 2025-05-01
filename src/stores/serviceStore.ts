import { create } from "zustand";

interface Service {
  id: string;
  title: string;
  description: string;
  temp: number;
  price: number;
  clas?: string;
}

interface ServiceStore {
  services: Service[];
  setServices: (services: Service[]) => void;
  clearServices: () => void;
}

const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
  clearServices: () => set({ services: [] }),
}));

export default useServiceStore;
