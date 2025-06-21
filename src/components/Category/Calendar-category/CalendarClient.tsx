"use client";
import { Calendar } from "@/components/ui/calendar";
import { buscarHorariosOcupados } from "@/services/generateHours";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAvailabilityStore } from "@/stores/useAvailabilityStore";
import { ServiceType } from "@/types/servicesType";
import { getAvailables } from "@/services/getApi";
import { AvailablesFormattedHours } from "@/services/AvailablesFormattedHours";

type Props = {
  item?: ServiceType;
};

export const CalendarClient = ({ item }: Props) => {
  const [date, setDate] = React.useState<Date | undefined>(new Date());
  const [openModal, setOpenModal] = React.useState(false);
  const [horariosOcupados, setHorariosOcupados] = React.useState<string[]>([]);
  const { availabilities, setAvailabilities } = useAvailabilityStore();

  useEffect(() => {
    const handleList = async () => {
      const list = await getAvailables();
      setAvailabilities(list);
    };
    handleList();
  }, [setAvailabilities, setOpenModal]);

  function formatDate(date: Date | string) {
    const parsedDate = date instanceof Date ? date : new Date(date);
    return parsedDate.toISOString().split("T")[0];
  }

  const handleDateSelect = async (selectedDate: Date | undefined) => {
    setOpenModal(true);
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

  const horariosDisponiveis = React.useMemo(() => {
    if (!date) return [];
    const dataFormatada = formatDate(date);
    const diaDisponivel = availabilities.find(
      (a) => formatDate(a.date) === dataFormatada
    );
    return diaDisponivel?.availableHours || [];
  }, [date, availabilities]);

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        onDayClick={handleDateSelect}
        disabled={(date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const comparingDate = new Date(date);
          comparingDate.setHours(0, 0, 0, 0);

          const dataFormatada = formatDate(comparingDate);
          const estaDisponivel = availabilities.some((a) => {
            const data = new Date(a.date);
            return data.toISOString().split("T")[0] === dataFormatada;
          });

          return comparingDate < today || !estaDisponivel;
        }}
        className="w-full max-w-min rounded-md border shadow px-5"
      />

      <Dialog open={openModal} onOpenChange={setOpenModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Agende seu horário</DialogTitle>
            <DialogDescription>
              Escolha o melhor horário para {date?.toLocaleDateString()}
            </DialogDescription>
          </DialogHeader>

          <div className="flex flex-col gap-4">
            <h2 className="text-lg font-semibold">Horários disponíveis</h2>
            <AvailablesFormattedHours
              horariosDisponiveis={horariosDisponiveis}
              horariosOcupados={horariosOcupados}
              date={date}
              item={item}
              onClose={() => setOpenModal(false)}
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
