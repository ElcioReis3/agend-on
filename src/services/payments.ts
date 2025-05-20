import { ServiceType } from "@/types/servicesType";
import api from "./api";

export const paymentCheckout = async (
  id_user: string,
  services: ServiceType,
  reserved_date: string,
  reserved_hours: string
) => {
  const response = await api.post("/payments/checkout", {
    title: services.title,
    quantity: 1,
    price: services.price,
    description: `Agendamento para ${reserved_date} às ${reserved_hours}`,
    user_id: id_user,
  });

  return response;
};
