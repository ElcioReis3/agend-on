"use client";
import * as React from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  buscarHorariosOcupados,
  generateHours,
} from "@/services/generateHours";
import { CalendarClient } from "./CalendarClient";
import { DateRange } from "react-day-picker";
import { useToast } from "@/hooks/use-toast";
import { SelectHours } from "./SelectHours";

export function CalendarApp() {
  const [dateRange, setDateRange] = React.useState<DateRange | undefined>(
    undefined
  );
  const { toast } = useToast();
  const [horariosOcupados, setHorariosOcupados] = React.useState<string[]>([]);
  const [date, setDate] = React.useState<Date | undefined>();

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    if (!selectedDate) return;

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selected = new Date(selectedDate);
    selected.setHours(0, 0, 0, 0);

    if (selected < today) return;

    setDate(selectedDate);
    const ocupados = await buscarHorariosOcupados(selectedDate);
    setHorariosOcupados(ocupados);
  };

  return (
    <div className="w-full flex flex-col gap-4">
      <div className="flex flex-col md:flex-row flex-wrap gap-4">
        <SelectHours dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      <Calendar
        mode="range"
        selected={dateRange}
        onSelect={setDateRange}
        disabled={(date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const comparingDate = new Date(date);
          comparingDate.setHours(0, 0, 0, 0);
          return comparingDate < today;
        }}
        className="w-full max-w-min rounded-md border shadow px-5 "
      />
    </div>
  );
}
