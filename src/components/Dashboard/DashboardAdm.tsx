"use client";
import * as React from "react";
import { TrendingUp } from "lucide-react";
import { Label, Pie, PieChart } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

// Configuração do gráfico
const chartConfig: ChartConfig = {
  visitors: {
    label: "Visitors",
  },
  ativos: {
    label: "Ativos",
    color: "hsl(var(--chart-2))",
  },
  inativos: {
    label: "Inativos",
    color: "hsl(var(--chart-1))",
  },
};

interface DashboardAdmProps {
  activeUsers: number;
  inactiveUsers: number;
}

function isPolarViewBox(viewBox: any): viewBox is { cx: number; cy: number } {
  return typeof viewBox?.cx === "number" && typeof viewBox?.cy === "number";
}

export const DashboardAdm: React.FC<DashboardAdmProps> = ({
  activeUsers,
  inactiveUsers,
}) => {
  const chartData = React.useMemo(
    () => [
      { browser: "ativos", visitors: activeUsers, fill: "var(--color-ativos)" },
      {
        browser: "inativos",
        visitors: inactiveUsers,
        fill: "var(--color-inativos)",
      },
    ],
    [activeUsers, inactiveUsers]
  );

  const totalClients = React.useMemo(
    () => activeUsers + inactiveUsers,
    [activeUsers, inactiveUsers]
  );

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>Total de Assinaturas</CardTitle>
        <CardDescription>Marcos Vinicius Barbearia</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="visitors"
              nameKey="browser"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  // Verifica se viewBox é Polar e tem cx/cy
                  if (!isPolarViewBox(viewBox)) return null;

                  return (
                    <text
                      x={viewBox.cx}
                      y={viewBox.cy}
                      textAnchor="middle"
                      dominantBaseline="middle"
                    >
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy}
                        className="fill-foreground text-3xl font-bold"
                      >
                        {totalClients.toLocaleString()}
                      </tspan>
                      <tspan
                        x={viewBox.cx}
                        y={viewBox.cy + 24}
                        className="fill-muted-foreground"
                      >
                        Cadastrados
                      </tspan>
                    </text>
                  );
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none text-base">
          Ativos: {activeUsers.toLocaleString()}
          <TrendingUp className="h-4 w-4 text-green-300" />
        </div>
        <div className="leading-none text-muted-foreground">
          Quantidade total de assinaturas
        </div>
      </CardFooter>
    </Card>
  );
};
