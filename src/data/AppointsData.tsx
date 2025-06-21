import { AppointmentsType } from "@/types/appointmentType";

export const chartDateFilter = (appointments: AppointmentsType[]) => {
  const summary: Record<string, { agendamentos: number; concluidos: number }> =
    {};

  for (const appoint of appointments) {
    if (!appoint.reserved_date) continue;
    const parts = appoint.reserved_date.split("-");
    if (parts.length !== 3) continue;
    const [year, month, day] = parts;
    if (!year || !month || !day) continue;

    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    if (!summary[formattedDate]) {
      summary[formattedDate] = { agendamentos: 0, concluidos: 0 };
    }
    summary[formattedDate].agendamentos += 1;
    const completedServices =
      appoint.services?.filter((s) => s.status === "completed") ?? [];
    if (completedServices.length > 0) {
      summary[formattedDate].concluidos += 1;
    }
  }

  const result = Object.entries(summary).map(([date, values]) => ({
    date,
    ...values,
  }));
  return result;
};
