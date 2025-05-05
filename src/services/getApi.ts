import { AppointmentsType } from "@/types/appointmentType";
import api from "./api";
import { ServiceType } from "@/types/servicesType";
import { AvailabilityType } from "@/types/availabilityType";

export const getServices = async (): Promise<ServiceType[]> => {
  const response = await api.get("/list-service");
  return response.data;
};
export const getAppointments = async (): Promise<AppointmentsType[]> => {
  const response = await api.get("/list-agend");
  return response.data;
};
export const getAvailables = async (): Promise<AvailabilityType[]> => {
  const response = await api.get("list-availables");
  return response.data;
};
