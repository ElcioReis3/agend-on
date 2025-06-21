"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { DialogAppointments } from "@/components/Dialogs/DialogAppointments";
import { ServiceType } from "@/types/servicesType";

type Props = {
  horariosDisponiveis: string[];
  horariosOcupados: string[];
  date: Date | undefined;
  item?: ServiceType;
  onClose?: () => void;
};

export const AvailablesFormattedHours = ({
  horariosDisponiveis,
  horariosOcupados,
  date,
  item,
  onClose,
}: Props) => {
  if (!date) return null;

  const hoje = new Date();

  return (
    <div className="grid gap-1 grid-cols-4">
      {horariosDisponiveis.length === 0 && (
        <span className="text-sm text-muted-foreground col-span-4">
          Nenhum horário disponível para esta data.
        </span>
      )}

      {horariosDisponiveis.map((horario) => {
        const ocupado = horariosOcupados.includes(horario);
        const mesmaData = hoje.toDateString() === new Date(date).toDateString();

        let desabilitadoPorTempo = false;
        if (mesmaData) {
          const [horaDisp, minutoDisp] = horario.split(":").map(Number);
          const horarioDisponivel = new Date();
          horarioDisponivel.setHours(horaDisp, minutoDisp, 0, 0);

          const diferencaMinutos =
            (hoje.getTime() - horarioDisponivel.getTime()) / (1000 * 60);
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
                reserved_date={date.toLocaleDateString()}
                services={item}
                onConfirm={onClose}
              >
                <Button className="w-full">{horario}</Button>
              </DialogAppointments>
            )}
          </div>
        );
      })}
    </div>
  );
};
