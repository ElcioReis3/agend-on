"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAvailables } from "@/services/getApi";
import { buscarHorariosOcupados } from "@/services/generateHours";
import { useAvailabilityStore } from "@/stores/useAvailabilityStore";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import { FilterDates } from "./FilterDates";

export function AccordionDates() {
  const { availabilities, setAvailabilities } = useAvailabilityStore();
  const [horariosOcupadosPorData, setHorariosOcupadosPorData] = useState<{
    [data: string]: string[];
  }>({});
  const [filtered, setFiltered] = useState<typeof availabilities>([]);

  useEffect(() => {
    const handleList = async () => {
      const list = await getAvailables();
      setAvailabilities(list);
      setFiltered(list);
      const ocupadosPorData: { [data: string]: string[] } = {};

      for (const item of list) {
        const date = new Date(item.date);
        const ocupados = await buscarHorariosOcupados(date);
        const key = date.toISOString().split("T")[0]; // yyyy-mm-dd
        ocupadosPorData[key] = ocupados;
      }

      setHorariosOcupadosPorData(ocupadosPorData);
    };
    handleList();
  }, [setAvailabilities]);

  function formatDate(date: string | Date) {
    const d = new Date(date);
    return d.toISOString().split("T")[0];
  }

  return (
    <div>
      <Separator />
      <div className="font-bold text-center mt-3">Disponibilidades geradas</div>
      {/* Filtro de disponibilidades*/}
      <FilterDates
        data={availabilities}
        dateKey="date"
        onFilter={setFiltered}
      />

      {filtered && filtered.length === 0 && (
        <div className="text-sm text-muted-foreground text-center">
          Nenhuma disponibilidade para esta semana.
        </div>
      )}
      <Accordion type="single" collapsible className="w-full p-1 text-xs">
        {filtered &&
          filtered.map((dates) => {
            const formattedDate = formatDate(dates.date);
            const ocupados = horariosOcupadosPorData[formattedDate] || [];

            return (
              <AccordionItem key={dates.id} value={`${dates.id}`}>
                <AccordionTrigger>
                  {new Date(dates.date).toLocaleDateString("pt-BR")}
                </AccordionTrigger>
                <AccordionContent className="grid grid-cols-5 gap-1">
                  {dates.availableHours.map((it, index) => {
                    const isOcupado = ocupados.includes(it);

                    return (
                      <span
                        key={index}
                        className={`text-center text-xs p-1 rounded-md text-black ${
                          isOcupado ? "bg-gray-400" : "bg-green-300"
                        }`}
                      >
                        {it}
                      </span>
                    );
                  })}
                </AccordionContent>
              </AccordionItem>
            );
          })}
      </Accordion>
    </div>
  );
}
