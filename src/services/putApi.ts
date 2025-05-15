import { AppointmentsType } from "@/types/appointmentType";
import api from "./api";

export const putCompleted = async (item: AppointmentsType) => {
  const updateStatus = "completed";
  const newServices = item.services.map((service) => ({
    id: service.id,
    status: updateStatus,
  }));

  const response = await api.put("update-agend", {
    id: item.id,
    id_user: item.id_user,
    user_name: item.user_name,
    services: newServices,
    reserved_date: item.reserved_date,
  });

  return response;
};

export const putCanceled = async (item: AppointmentsType) => {
  const updateStatus = "canceled";
  const newServices = item.services.map((service) => ({
    id: service.id,
    status: updateStatus,
  }));

  const response = await api.put("update-agend", {
    id: item.id,
    id_user: item.id_user,
    user_name: item.user_name,
    services: newServices,
    reserved_date: item.reserved_date,
  });

  return response;
};

export const putRescheduled = async (
  item: AppointmentsType,
  newDate: string,
  newHour: string
) => {
  const updateStatus = "reprice";
  const newServices = item.services.map((service) => ({
    id: service.id,
    status: updateStatus,
    reserved_hours: newHour,
  }));

  const response = await api.put("update-agend", {
    id: item.id,
    id_user: item.id_user,
    user_name: item.user_name,
    services: newServices,
    reserved_date: newDate,
  });

  return response;
};
