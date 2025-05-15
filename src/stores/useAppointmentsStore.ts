import { AppointmentsType } from "@/types/appointmentType";
import { create } from "zustand";

type AppointmentStore = {
  appointments: AppointmentsType[];
  setAppointments: (appointments: AppointmentsType[]) => void;
};

const useAppointmentsStore = create<AppointmentStore>((set) => ({
  appointments: [],
  setAppointments: (appointments) => set({ appointments }),
}));

export default useAppointmentsStore;
