"use client";
import {
  TrendingDown,
  TrendingDownIcon,
  TrendingUp,
  TrendingUpIcon,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import useDashboardStore from "@/stores/dashboardStore";
import { carregarMetricasDashboard } from "@/utils/dashboardMetrics";
import { useEffect } from "react";
import { calcularCrescimento } from "@/utils/dashboardUtils";

export function SectionCards() {
  const { metrics } = useDashboardStore();
  const comparativoAnterior = useDashboardStore(
    (state) => state.metrics.comparativoAnterior
  );
  const totalConcluidos = useDashboardStore(
    (state) => state.metrics.totalConcluidos
  );
  const totalReceita = useDashboardStore((state) => state.metrics.totalReceita);
  const ticketMedio = useDashboardStore((state) => state.metrics.ticketMedio);

  useEffect(() => {
    carregarMetricasDashboard();
  }, []);

  const crescimentoConcluidos = calcularCrescimento(
    totalConcluidos,
    comparativoAnterior?.concluidos ?? 0
  );
  const crescimentoReceita = calcularCrescimento(
    totalReceita,
    comparativoAnterior?.receita ?? 0
  );
  const crescimentoTicketMedio = calcularCrescimento(
    ticketMedio,
    comparativoAnterior?.ticketMedio ?? 0
  );

  return (
    <div className="w-full *:data-[slot=card]:shadow-xs xl:grid-cols-2 4xl:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card text-orange-500">
        <CardHeader className="relative">
          <CardDescription>Receita</CardDescription>
          <CardTitle className="[250px]:text-3xl text-2xl font-semibold tabular-nums">
            R$ {metrics.totalReceita.toFixed(2)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {crescimentoReceita.isPositive ? (
                <TrendingUp className="w-4 h-4 text-orange-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </Badge>
            {crescimentoReceita.percentage}
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Tendências em alta neste mês <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Receita nos últimos 6 meses
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card text-green-500">
        <CardHeader className="relative">
          <CardDescription>Concluídos</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            {metrics.totalConcluidos}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {crescimentoConcluidos.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </Badge>
            {crescimentoConcluidos.percentage}
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Crescimento de 20% neste período
            <TrendingUpIcon className="size-3" />
          </div>
          <div className="text-muted-foreground">Mantenha essa constância</div>
        </CardFooter>
      </Card>
      <Card className="@container/card text-red-500">
        <CardHeader className="relative">
          <CardDescription>Cancelados</CardDescription>
          <CardTitle className="[250px]:text-3xl text-2xl font-semibold tabular-nums">
            {metrics.totalCancelados}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingDownIcon className="size-4" />
              +10.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Forte evasão de usuários
            <TrendingDownIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Desempenho abaixo das expectativas
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Ticket Médio</CardDescription>
          <CardTitle className="[250px]:text-3xl text-2xl font-semibold tabular-nums">
            R$ {metrics.ticketMedio.toFixed(2)}
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              {crescimentoTicketMedio.isPositive ? (
                <TrendingUp className="w-4 h-4 text-green-500" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500" />
              )}
            </Badge>
            {crescimentoTicketMedio.percentage}
          </div>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1 text-sm">
          <div className="line-clamp-1 flex gap-2 font-medium">
            Desempenho estável
            <TrendingUpIcon className="size-4" />
          </div>
          <div className="text-muted-foreground">
            Atende às projeções de crescimento
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
