import useAppointmentStore from "@/stores/useAppointmentStore";
import { AppointmentsType } from "@/types/appointmentType";

export const chartData = [
  { date: "2024-04-01", agendamentos: 222, concluidos: 150 },
  { date: "2024-04-02", agendamentos: 97, concluidos: 180 },
  { date: "2024-04-03", agendamentos: 167, concluidos: 120 },
  { date: "2024-04-04", agendamentos: 242, concluidos: 260 },
];

export const chartDateFilter = (appointments: AppointmentsType[]) => {
  const summary: Record<string, { agendamentos: number; concluidos: number }> =
    {};

  for (const appoint of appointments) {
    // Converte a data de "dd/MM/yyyy" para "yyyy-MM-dd"
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

  // Converte o objeto em array
  const result = Object.entries(summary).map(([date, values]) => ({
    date,
    ...values,
  }));

  return result;
};
