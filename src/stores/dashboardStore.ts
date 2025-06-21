import { create } from "zustand";

export type DayMetrics = {
  date: string;
  totalAgendados: number;
  totalConcluidos: number;
  totalCancelados: number;
  totalReprice: number;
  receita: number;
};

type ComparativoMetrics = {
  receita: number;
  concluidos: number;
  cancelados: number;
  ticketMedio: number;
};

type DashboardMetrics = {
  diasDisponiveis: string[];
  resumoPorDia: DayMetrics[];
  totalAgendados: number;
  totalConcluidos: number;
  totalCancelados: number;
  totalReprice: number;
  totalReceita: number;
  ticketMedio: number;

  // Dados anteriores
  comparativoAnterior?: ComparativoMetrics;
};

type DashboardStore = {
  metrics: DashboardMetrics;
  setMetrics: (data: DashboardMetrics) => void;
};

const useDashboardStore = create<DashboardStore>((set) => ({
  metrics: {
    diasDisponiveis: [],
    resumoPorDia: [],
    totalAgendados: 0,
    totalConcluidos: 0,
    totalCancelados: 0,
    totalReprice: 0,
    totalReceita: 0,
    ticketMedio: 0,
  },
  setMetrics: (data) => set({ metrics: data }),
}));

export default useDashboardStore;
