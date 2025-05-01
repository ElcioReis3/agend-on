import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { generateHours } from "@/services/generateHours";
import { useAvailabilityStore } from "@/stores/useAvailabilityStore";
import React from "react";
import { DateRange } from "react-day-picker";

type SelectHoursProps = {
  dateRange: DateRange | undefined;
  setDateRange: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
};

export const SelectHours = ({ dateRange, setDateRange }: SelectHoursProps) => {
  const { addAvailability } = useAvailabilityStore();
  const { toast } = useToast();
  const [morningStart, setMorningStart] = React.useState("08:00");
  const [morningEnd, setMorningEnd] = React.useState("11:50");
  const [afternoonStart, setAfternoonStart] = React.useState("14:00");
  const [afternoonEnd, setAfternoonEnd] = React.useState("17:50");
  const [includeMorning, setIncludeMorning] = React.useState(true);
  const [includeAfternoon, setIncludeAfternoon] = React.useState(true);

  async function gerarDisponibilidades() {
    if (!dateRange?.from || !dateRange?.to) {
      return toast({ title: "Selecione o intervalo de datas." });
    }

    const start = new Date(dateRange.from);
    const end = new Date(dateRange.to);
    const promises = [];
    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
      const horarios: string[] = [];

      if (includeMorning) {
        horarios.push(...generateHours(morningStart, morningEnd, 30, 10));
      }
      if (includeAfternoon) {
        horarios.push(...generateHours(afternoonStart, afternoonEnd, 30, 10));
      }

      const dataFormatada = new Date(d).toISOString().split("T")[0];

      promises.push(
        api.post("/add-available", {
          date: dataFormatada,
          availableHours: horarios,
        })
      );
    }

    try {
      const responses = await Promise.all(promises);
      responses.forEach((res) => {
        if (res.status === 200) {
          addAvailability(res.data.availability);
        }
      });

      toast({ title: "Todas as disponibilidades foram criadas com sucesso!" });
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error.message ||
        "Verifique e tente novamente.";
      toast({
        title: "Erro ao gerar algumas disponibilidades",
        description: errorMessage,
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <div className="w-full max-w-md flex gap-2 items-center justify-evenly">
        <Label>Manhã Início:</Label>
        <Input
          type="time"
          value={morningStart}
          onChange={(e) => setMorningStart(e.target.value)}
          disabled={!includeMorning}
          className="w-min"
        />
        <Label>Manhã Fim:</Label>
        <Input
          type="time"
          value={morningEnd}
          onChange={(e) => setMorningEnd(e.target.value)}
          disabled={!includeMorning}
          className="w-min"
        />
        <Label className="flex items-center gap-2">
          <Input
            type="checkbox"
            checked={includeMorning}
            onChange={() => setIncludeMorning(!includeMorning)}
            className="w-4"
          />
          Incluir Manhã
        </Label>
      </div>
      <div className="w-full max-w-md flex gap-2 items-center justify-evenly">
        <Label>Tarde Início:</Label>
        <Input
          type="time"
          value={afternoonStart}
          onChange={(e) => setAfternoonStart(e.target.value)}
          disabled={!includeAfternoon}
          className="w-min"
        />
        <Label>Tarde Fim:</Label>
        <Input
          type="time"
          value={afternoonEnd}
          onChange={(e) => setAfternoonEnd(e.target.value)}
          disabled={!includeAfternoon}
          className="w-min"
        />
        <Label className="flex items-center gap-2">
          <Input
            type="checkbox"
            checked={includeAfternoon}
            onChange={() => setIncludeAfternoon(!includeAfternoon)}
            className="w-4"
          />
          Incluir Tarde
        </Label>
      </div>
      <div className="flex gap-4 items-center">
        <div className="flex gap-1">
          <Button
            onClick={gerarDisponibilidades}
            disabled={!includeMorning && !includeAfternoon}
          >
            Gerar Datas/Horários disponíveis
          </Button>
          <Button variant="outline">Bloquear data</Button>
        </div>
      </div>
    </>
  );
};
