import { create } from "zustand";

interface Appointment {
  id: string;
  id_user: string;
  user_name: string;
  services: {
    id: string;
    title: string;
    description: string;
    temp: number;
    price: number;
    clas: "MASTER" | "OPTIONAL";
    reserved_hours: string[];
    due_date: string[];
    status: "reserved" | "completed" | "canceled" | "reprice";
  }[];
  reserved_date: string;
  created_at?: string;
  updated_at?: string;
}

interface AppointStore {
  appointments: Appointment[];
  setApointment: (appointments: Appointment[]) => void;
  clearAppointment: () => void;
}

const useAppointmentStore = create<AppointStore>((set) => ({
  appointments: [],
  setApointment: (appointments) => set({ appointments }),
  clearAppointment: () => set({ appointments: [] }),
}));

export default useAppointmentStore;
