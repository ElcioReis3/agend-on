import { CustomerType } from "@/types/customerType";
import api from "./api";

export const getUsers = async (): Promise<CustomerType[]> => {
  const response = await api.get("/list-clients");

  return response.data;
};
