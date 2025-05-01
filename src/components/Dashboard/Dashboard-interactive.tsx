"use client";
import * as React from "react";
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
const chartData = [
  { date: "2024-04-01", agendamentos: 222, concluidos: 150 },
  { date: "2024-04-02", agendamentos: 97, concluidos: 180 },
  { date: "2024-04-03", agendamentos: 167, concluidos: 120 },
  { date: "2024-04-04", agendamentos: 242, concluidos: 260 },
  { date: "2024-04-05", agendamentos: 373, concluidos: 290 },
  { date: "2024-04-06", agendamentos: 301, concluidos: 340 },
  { date: "2024-04-07", agendamentos: 245, concluidos: 180 },
  { date: "2024-04-08", agendamentos: 409, concluidos: 320 },
  { date: "2024-04-09", agendamentos: 59, concluidos: 110 },
  { date: "2024-04-10", agendamentos: 261, concluidos: 190 },
  { date: "2024-04-11", agendamentos: 327, concluidos: 350 },
  { date: "2024-04-12", agendamentos: 292, concluidos: 210 },
  { date: "2024-04-26", agendamentos: 75, concluidos: 130 },
  { date: "2024-04-27", agendamentos: 383, concluidos: 420 },
  { date: "2024-04-28", agendamentos: 122, concluidos: 180 },
  { date: "2024-04-29", agendamentos: 315, concluidos: 240 },
  { date: "2024-04-30", agendamentos: 454, concluidos: 380 },
  { date: "2024-05-01", agendamentos: 165, concluidos: 220 },
  { date: "2024-05-02", agendamentos: 293, concluidos: 310 },
  { date: "2024-05-03", agendamentos: 247, concluidos: 190 },
  { date: "2024-05-04", agendamentos: 385, concluidos: 420 },
  { date: "2024-05-05", agendamentos: 481, concluidos: 390 },
  { date: "2024-05-06", agendamentos: 498, concluidos: 520 },
  { date: "2024-05-07", agendamentos: 388, concluidos: 300 },
  { date: "2024-05-08", agendamentos: 149, concluidos: 210 },
  { date: "2024-05-09", agendamentos: 227, concluidos: 180 },
  { date: "2024-05-10", agendamentos: 293, concluidos: 330 },
  { date: "2024-05-11", agendamentos: 335, concluidos: 270 },
  { date: "2024-05-12", agendamentos: 197, concluidos: 240 },
  { date: "2024-05-13", agendamentos: 197, concluidos: 160 },
  { date: "2024-05-14", agendamentos: 448, concluidos: 490 },
  { date: "2024-05-15", agendamentos: 473, concluidos: 380 },
  { date: "2024-05-16", agendamentos: 338, concluidos: 400 },
  { date: "2024-05-17", agendamentos: 499, concluidos: 420 },
  { date: "2024-05-18", agendamentos: 315, concluidos: 350 },
  { date: "2024-05-19", agendamentos: 235, concluidos: 180 },
  { date: "2024-05-20", agendamentos: 177, concluidos: 230 },
  { date: "2024-05-21", agendamentos: 82, concluidos: 140 },
  { date: "2024-05-22", agendamentos: 81, concluidos: 120 },
  { date: "2024-05-23", agendamentos: 252, concluidos: 290 },
  { date: "2024-05-24", agendamentos: 294, concluidos: 220 },
  { date: "2024-05-25", agendamentos: 201, concluidos: 250 },
  { date: "2024-05-26", agendamentos: 213, concluidos: 170 },
  { date: "2024-05-27", agendamentos: 420, concluidos: 460 },
  { date: "2024-05-28", agendamentos: 233, concluidos: 190 },
  { date: "2024-05-29", agendamentos: 78, concluidos: 130 },
  { date: "2024-05-30", agendamentos: 340, concluidos: 280 },
  { date: "2024-05-31", agendamentos: 178, concluidos: 230 },
  { date: "2024-06-01", agendamentos: 178, concluidos: 200 },
  { date: "2024-06-02", agendamentos: 470, concluidos: 410 },
  { date: "2024-06-03", agendamentos: 103, concluidos: 160 },
  { date: "2024-06-04", agendamentos: 439, concluidos: 380 },
  { date: "2024-06-05", agendamentos: 88, concluidos: 140 },
  { date: "2024-06-06", agendamentos: 294, concluidos: 250 },
  { date: "2024-06-07", agendamentos: 323, concluidos: 370 },
  { date: "2024-06-08", agendamentos: 385, concluidos: 320 },
  { date: "2024-06-09", agendamentos: 438, concluidos: 480 },
  { date: "2024-06-10", agendamentos: 155, concluidos: 200 },
  { date: "2024-06-11", agendamentos: 92, concluidos: 150 },
  { date: "2024-06-12", agendamentos: 492, concluidos: 420 },
  { date: "2024-06-13", agendamentos: 81, concluidos: 130 },
  { date: "2024-06-14", agendamentos: 426, concluidos: 380 },
  { date: "2024-06-15", agendamentos: 307, concluidos: 350 },
  { date: "2024-06-16", agendamentos: 371, concluidos: 310 },
  { date: "2024-06-17", agendamentos: 475, concluidos: 520 },
  { date: "2024-06-18", agendamentos: 107, concluidos: 170 },
  { date: "2024-06-19", agendamentos: 341, concluidos: 290 },
  { date: "2024-06-20", agendamentos: 408, concluidos: 450 },
  { date: "2024-06-21", agendamentos: 169, concluidos: 210 },
  { date: "2024-06-22", agendamentos: 317, concluidos: 270 },
  { date: "2024-06-23", agendamentos: 480, concluidos: 530 },
  { date: "2024-06-24", agendamentos: 132, concluidos: 180 },
  { date: "2024-06-25", agendamentos: 141, concluidos: 190 },
  { date: "2024-06-26", agendamentos: 434, concluidos: 380 },
  { date: "2024-06-27", agendamentos: 448, concluidos: 490 },
  { date: "2024-06-28", agendamentos: 149, concluidos: 200 },
  { date: "2024-06-30", agendamentos: 446, concluidos: 400 },
  { date: "2024-06-29", agendamentos: 103, concluidos: 160 },
];

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

export function DashboardInteractive() {
  const isMobile = useIsMobile();
  const [timeRange, setTimeRange] = React.useState("30d");

  React.useEffect(() => {
    if (isMobile) {
      setTimeRange("7d");
    }
  }, [isMobile]);

  const filteredData = chartData.filter((item) => {
    const date = new Date(item.date);
    const referenceDate = new Date("2024-06-30");
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
          <span className="@[540px]/card:block hidden">
            Total dos últimos 3 meses
          </span>
          <span className="@[540px]/card:hidden">Últimos 3 meses</span>
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
              Últimos 3 dias
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
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
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
