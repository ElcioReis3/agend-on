"use server";
import { AppointmentsType } from "@/types/appointmentType";
import api from "./api";
import { ServiceType } from "@/types/servicesType";
import { AvailabilityType } from "@/types/availabilityType";
import { CustomerType } from "@/types/customerType";

export const getUsers = async (): Promise<CustomerType[]> => {
  const response = await api.get("/list-clients");
  return response.data;
};

export const getServices = async (): Promise<ServiceType[]> => {
  const response = await api.get("/list-service");
  return response.data;
};
export const getAppointments = async (): Promise<AppointmentsType[]> => {
  const response = await api.get("/list-agend");
  return response.data;
};
export const getAppointment = async (id_user: string) => {
  const response = await api.get("list-agend", {
    params: { id_user },
  });
  return response.data;
};
export const getAvailables = async (): Promise<AvailabilityType[]> => {
  const response = await api.get("list-availables");
  return response.data;
};
