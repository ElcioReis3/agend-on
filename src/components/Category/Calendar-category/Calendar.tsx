"use client";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { SelectHours } from "./SelectHours";
import { useState } from "react";
import { AccordionDates } from "@/components/Accordions/AccordionDates";

export function CalendarApp() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  return (
    <div className="w-full max-w-2xl flex flex-col flex-wrap sm:flex-row gap-4 px-4 mx-auto">
      {/* Coluna 1: SelectHours */}
      <div className="max-w-80 m-auto">
        <SelectHours dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      {/* Coluna 2: Calendário */}
      <div className="w-min m-auto">
        <Calendar
          className="w-full rounded-md border shadow-md px-4 py-2"
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
        />
      </div>

      {/* Coluna 3: AccordionDates */}
      <div className="w-full">
        <AccordionDates />
      </div>
    </div>
  );
}
