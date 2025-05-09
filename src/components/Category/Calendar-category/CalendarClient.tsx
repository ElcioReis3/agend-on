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
import { Button } from "@/components/ui/button";
import { useAvailabilityStore } from "@/stores/useAvailabilityStore";
import { DialogAppointments } from "@/components/Dialogs/DialogAppointments";
import { ServiceType } from "@/types/servicesType";
import { getAvailables } from "@/services/getApi";

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
    const dataFormatada = date?.toISOString().split("T")[0];
    const diaDisponivel = availabilities.find((a) => a.date === dataFormatada);
    return diaDisponivel?.availableHours || [];
  }, [date, availabilities]);

  return (
    <>
      <Calendar
        mode="single"
        selected={date}
        onSelect={handleDateSelect}
        disabled={(date) => {
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          const comparingDate = new Date(date);
          comparingDate.setHours(0, 0, 0, 0);

          const dataFormatada = comparingDate.toISOString().split("T")[0];
          const estaDisponivel = availabilities.some(
            (a) => a.date === dataFormatada
          );

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
            <div className="grid gap-1 grid-cols-4">
              {horariosDisponiveis.length === 0 && (
                <span className="text-sm text-muted-foreground col-span-4">
                  Nenhum horário disponível para esta data.
                </span>
              )}

              {horariosDisponiveis.map((horario) => {
                const ocupado = horariosOcupados.includes(horario);

                const hoje = new Date();
                const mesmaData =
                  date && hoje.toDateString() === new Date(date).toDateString();

                let desabilitadoPorTempo = false;
                if (mesmaData) {
                  const [horaDisp, minutoDisp] = horario.split(":").map(Number);
                  const horarioDisponivel = new Date();
                  horarioDisponivel.setHours(horaDisp, minutoDisp, 0, 0);

                  const diferencaMinutos =
                    (hoje.getTime() - horarioDisponivel.getTime()) /
                    (1000 * 60);
                  desabilitadoPorTempo = diferencaMinutos > 5;
                }
                const desabilitado = ocupado || desabilitadoPorTempo;

                return (
                  <div key={horario}>
                    {desabilitado ? (
                      <Button
                        disabled
                        className="bg-gray-400 text-gray-600 cursor-not-allowed w-full"
                      >
                        {horario}
                      </Button>
                    ) : (
                      <DialogAppointments
                        reserved_hours={horario}
                        reserved_date={date?.toLocaleDateString()}
                        services={item}
                      >
                        <Button className="w-full">{horario}</Button>
                      </DialogAppointments>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};
