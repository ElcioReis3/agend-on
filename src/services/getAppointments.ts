import api from "./api";

export const getAppointments = async (id_user: string) => {
  const response = await api.get("list-agend", {
    params: { id_user },
  });
  return response.data;
};
