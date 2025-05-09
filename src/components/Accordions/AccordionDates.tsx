"use client";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getAvailables } from "@/services/getApi";
import { useAvailabilityStore } from "@/stores/useAvailabilityStore";
import { endOfWeek, isAfter, isBefore, parseISO, startOfDay } from "date-fns";
import { useEffect } from "react";

export function AccordionDates() {
  const today = startOfDay(new Date());
  const endOfThisWeek = endOfWeek(today, { weekStartsOn: 1 });
  const { availabilities, setAvailabilities } = useAvailabilityStore(
    (state) => state
  );

  useEffect(() => {
    const handleList = async () => {
      const list = await getAvailables();
      setAvailabilities(list);
    };
    handleList();
  }, [setAvailabilities]);

  const availabilitiesThisWeek = availabilities
    .filter((a) => {
      const date = parseISO(a.date);
      return !isBefore(date, today) && !isAfter(date, endOfThisWeek);
    })
    .sort((a, b) => parseISO(a.date).getTime() - parseISO(b.date).getTime());
  return (
    <>
      <div>
        <div className="font-bold mb-2">Disponibilidades esta Semana</div>
        {availabilitiesThisWeek.length === 0 && (
          <div className="text-sm text-muted-foreground">
            Nenhuma disponibilidade para esta semana.
          </div>
        )}
        <Accordion type="single" collapsible className="w-full p-1 text-xs ">
          {availabilitiesThisWeek.map((dates) => (
            <AccordionItem value={`${dates.id}`}>
              <AccordionTrigger>{dates.date}</AccordionTrigger>
              <AccordionContent className="grid grid-cols-5 gap-1">
                {dates.availableHours.map((it) => (
                  <span className="text-xs p-1 bg-green-300 rounded-md">
                    {it}
                  </span>
                ))}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
}
