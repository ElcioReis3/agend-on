import { create } from "zustand";

interface Service {
  id: string;
  title: string;
  description: string;
  temp: number;
  price: number;
  reserved_hours: string[];
  due_date: string[];
  clas?: string;
  status?: "reserved" | "completed" | "canceled" | "reprice";
  observation?: string;
}

interface ServiceStore {
  services: Service[];
  addService: (service: Service) => void;
  setServices: (services: Service[]) => void;
  clearServices: () => void;
}

const useServiceStore = create<ServiceStore>((set) => ({
  services: [],
  addService: (service) =>
    set((state) => ({ services: [...state.services, service] })),
  setServices: (services) => set({ services }),
  clearServices: () => set({ services: [] }),
}));

export default useServiceStore;
