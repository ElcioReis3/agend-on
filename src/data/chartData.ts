import useAppointmentStore from "@/stores/useAppointmentStore";
import { AppointmentsType } from "@/types/appointmentType";

export const chartDateFilter = (appointments: AppointmentsType[]) => {
  const summary: Record<string, { agendamentos: number; concluidos: number }> =
    {};

  for (const appoint of appointments) {
    const [day, month, year] = appoint.reserved_date.split("/");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    if (!summary[formattedDate]) {
      summary[formattedDate] = { agendamentos: 0, concluidos: 0 };
    }

    summary[formattedDate].agendamentos += 1;

    const completedServices = appoint.services.filter(
      (s) => s.status === "completed"
    );

    if (completedServices.length > 0) {
      summary[formattedDate].concluidos += 1;
    }
  }

  const result = Object.entries(summary).map(([date, values]) => ({
    date,
    ...values,
  }));

  console.log("📊 Resultado final formatado para o gráfico:", result);

  return result;
};

// Em vez de um array fixo, transforme chartData em função:
export const getChartData = () => {
  const appointments = useAppointmentStore.getState().appointments;
  return chartDateFilter(appointments);
};
