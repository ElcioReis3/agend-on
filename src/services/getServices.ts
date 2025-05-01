import api from "./api";
import { ServiceType } from "@/types/servicesType";

export const getServices = async (): Promise<ServiceType[]> => {
  const response = await api.get("/list-service");
  return response.data;
};
