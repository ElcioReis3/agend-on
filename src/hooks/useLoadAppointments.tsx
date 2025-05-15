import { useEffect } from "react";
import useUserStore from "@/stores/userStore";
import { getAppointments } from "@/services/getAppointments";
import useAppointmentsStore from "@/stores/useAppointmentsStore";

export const useLoadAppointments = () => {
  const { user } = useUserStore();
  const { setAppointments } = useAppointmentsStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) return;

      try {
        const appointments = await getAppointments(user.id);
        setAppointments(appointments);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAppointments();
  }, [user?.id, setAppointments]);
};
