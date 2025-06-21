import { getAppointments, getAvailables } from "@/services/getApi";
import useDashboardStore, { DayMetrics } from "@/stores/dashboardStore";
import dayjs from "dayjs";

export const carregarMetricasDashboard = async () => {
  const [appointments, availables] = await Promise.all([
    getAppointments(),
    getAvailables(),
  ]);

  const diasDisponiveis = availables.map((item) =>
    dayjs(item.date).format("YYYY-MM-DD")
  );

  const resumoPorDia: DayMetrics[] = diasDisponiveis.map((data) => {
    const agendamentosDoDia = appointments.filter((a) => {
      const sameDay = dayjs(a.reserved_date).format("YYYY-MM-DD") === data;
      if (sameDay) return sameDay;
    });

    let totalAgendados = 0;
    let totalConcluidos = 0;
    let totalCancelados = 0;
    let totalReprice = 0;
    let receita = 0;

    for (const agendamento of agendamentosDoDia) {
      for (const servico of agendamento.services) {
        if (
          servico.due_date.some((d) => dayjs(d).format("YYYY-MM-DD") === data)
        ) {
          totalAgendados++;
          if (servico.status === "completed") {
            totalConcluidos++;
            receita += servico.price;
          }
          if (servico.status === "canceled") totalCancelados++;
          if (servico.status === "reprice") totalReprice++;
        }
      }
    }

    return {
      date: data,
      totalAgendados,
      totalConcluidos,
      totalCancelados,
      totalReprice,
      receita,
    };
  });

  const totalAgendados = resumoPorDia.reduce(
    (acc, d) => acc + d.totalAgendados,
    0
  );

  const totalConcluidos = resumoPorDia.reduce(
    (acc, d) => acc + d.totalConcluidos,
    0
  );
  const totalCancelados = resumoPorDia.reduce(
    (acc, d) => acc + d.totalCancelados,
    0
  );
  const totalReprice = resumoPorDia.reduce((acc, d) => acc + d.totalReprice, 0);
  const totalReceita = resumoPorDia.reduce((acc, d) => acc + d.receita, 0);
  const ticketMedio = totalConcluidos > 0 ? totalReceita / totalConcluidos : 0;

  useDashboardStore.getState().setMetrics({
    diasDisponiveis,
    resumoPorDia,
    totalAgendados,
    totalConcluidos,
    totalCancelados,
    totalReprice,
    totalReceita,
    ticketMedio,
  });
};
