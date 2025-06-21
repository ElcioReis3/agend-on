"use client";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { useEffect, useState } from "react";
import useAppointmentStore from "@/stores/useAppointmentStore";
import { getAppointments } from "@/services/getApi";
import useDashboardStore from "@/stores/dashboardStore";
import { carregarMetricasDashboard } from "@/utils/dashboardMetrics";
import { calcularCrescimento } from "@/utils/dashboardUtils";

const chartConfig = {
  visitors: {
    label: "Visitors",
  },
  desktop: {
    label: "concluidos",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "agendamentos",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

type result = {
  agendamentos: number;
  concluidos: number;
  date: string;
}[];

export function DashboardInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = useState("30d");
  const setApointment = useAppointmentStore((state) => state.setApointment);
  const [chartData, setChartData] = useState<result>([]);
  const resumoPorDia = useDashboardStore((state) => state.metrics.resumoPorDia);

  const handleListAgends = async () => {
    const list = await getAppointments();
    setApointment(list);
  };

  useEffect(() => {
    carregarMetricasDashboard();
    handleListAgends();
    if (isMobile && timeRange !== "7d") {
      setTimeRange("7d");
    }
    const formated = resumoPorDia.map((dia) => ({
      date: dia.date,
      agendamentos: dia.totalAgendados,
      concluidos: dia.totalConcluidos,
    }));
    setChartData(formated);
  }, []);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date + "T07:00:00");
    const referenceDate = new Date();
    referenceDate.setHours(12, 0, 0, 0);
    let daysToSubtract = 90;
    if (timeRange === "30d") {
      daysToSubtract = 30;
    } else if (timeRange === "7d") {
      daysToSubtract = 7;
    }
    const startDate = new Date(referenceDate);
    startDate.setDate(startDate.getDate() - daysToSubtract);
    return date >= startDate;
  });

  return (
    <Card className="@container/card">
      <CardHeader className="relative">
        <CardTitle>Dashboard</CardTitle>
        <CardDescription>
          <span className="@[540px]/card:hidden">
            {timeRange === "90d" && <span>Últimos 3 meses</span>}
            {timeRange === "30d" && <span>Últimos 30 dias</span>}
            {timeRange === "7d" && <span>Últimos 7 dias</span>}
          </span>
        </CardDescription>
        <div className="absolute right-4 top-4">
          <ToggleGroup
            type="single"
            value={timeRange}
            onValueChange={setTimeRange}
            variant="outline"
            className="@[767px]/card:flex hidden"
          >
            <ToggleGroupItem value="90d" className="h-8 px-2.5">
              Últimos 3 meses
            </ToggleGroupItem>
            <ToggleGroupItem value="30d" className="h-8 px-2.5">
              Últimos 30 dias
            </ToggleGroupItem>
            <ToggleGroupItem value="7d" className="h-8 px-2.5">
              Últimos 7 dias
            </ToggleGroupItem>
          </ToggleGroup>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger
              className="@[767px]/card:hidden flex w-40"
              aria-label="Select a value"
            >
              <SelectValue placeholder="Last 3 months" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="90d" className="rounded-lg">
                Últimos 3 meses
              </SelectItem>
              <SelectItem value="30d" className="rounded-lg">
                Últimos 30 dias
              </SelectItem>
              <SelectItem value="7d" className="rounded-lg">
                Últimos 7 dias
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[250px] w-full"
        >
          <AreaChart data={filteredData}>
            <defs>
              <linearGradient id="fillDesktop" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={1.0}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-desktop)"
                  stopOpacity={0.1}
                />
              </linearGradient>
              <linearGradient id="fillMobile" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.8}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-mobile)"
                  stopOpacity={0.1}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value + "T12:00:00");
                return date.toLocaleDateString("pt-BR", {
                  day: "2-digit",
                  month: "short",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    const date = new Date(value + "T12:00:00");
                    return date.toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "short",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="concluidos"
              type="natural"
              fill="url(#fillMobile)"
              stroke="var(--color-mobile)"
              stackId="a"
            />
            <Area
              dataKey="agendamentos"
              type="natural"
              fill="url(#fillDesktop)"
              stroke="var(--color-desktop)"
              stackId="a"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
