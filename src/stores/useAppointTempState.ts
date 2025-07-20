// stores/appointmentStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { ServiceType } from "@/types/servicesType";

interface AppointmentState {
  dataAgend: {
    reserved_date: string;
    reserved_hours: string[];
    services: ServiceType;
    observation?: string;
  } | null;
  setAppointmentTemp: (dataAgend: AppointmentState["dataAgend"]) => void;
  clear: () => void;
}

const useAppointmentTempStore = create<AppointmentState>()(
  persist(
    (set) => ({
      dataAgend: null,
      setAppointmentTemp: (dataAgend) => set({ dataAgend }),
      clear: () => set({ dataAgend: null }),
    }),
    {
      name: "appointment-temp",
    }
  )
);

export default useAppointmentTempStore;
