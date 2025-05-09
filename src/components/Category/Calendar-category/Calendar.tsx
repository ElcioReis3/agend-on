"use client";
import { Calendar } from "@/components/ui/calendar";
import { DateRange } from "react-day-picker";
import { SelectHours } from "./SelectHours";
import { useState } from "react";
import { AccordionDates } from "@/components/Accordions/AccordionDates";

export function CalendarApp() {
  const [dateRange, setDateRange] = useState<DateRange | undefined>(undefined);

  return (
    <div className="w-full max-w-2xl grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="col-span-1 md:col-span-2 m-auto">
        <SelectHours dateRange={dateRange} setDateRange={setDateRange} />
      </div>
      <Calendar
        className="w-80 rounded-md border shadow px-7 m-auto md:mx-3"
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
      <div>
        <AccordionDates />
      </div>
    </div>
  );
}
