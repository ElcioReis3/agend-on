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
  addService: (newService: Service) => void;
  clearServices: () => void;
}

const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  setServices: (services) => set({ services }),
  addService: (newService) =>
    set((state) => ({
      services: [...state.services, newService],
    })),
  clearServices: () => set({ services: [] }),
}));

export default useServiceStore;
