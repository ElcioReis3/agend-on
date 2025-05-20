import { useEffect } from "react";
import useUserStore from "@/stores/userStore";
import useAppointmentsStore from "@/stores/useAppointmentsStore";
import { getAppointment } from "@/services/getApi";

export const useLoadAppointments = () => {
  const { user } = useUserStore();
  const { setAppointments } = useAppointmentsStore();

  useEffect(() => {
    const fetchAppointments = async () => {
      if (!user?.id) return;

      try {
        const appointments = await getAppointment(user.id);
        setAppointments(appointments);
      } catch (error) {
        console.error("Erro ao buscar agendamentos:", error);
      }
    };

    fetchAppointments();
  }, [user?.id, setAppointments]);
};
