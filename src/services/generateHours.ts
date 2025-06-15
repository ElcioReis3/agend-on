import { getAppointments } from "@/services/getApi";
import { AppointmentsType } from "@/types/appointmentType";
import { AvailabilityType } from "@/types/availabilityType";
import React from "react";
export function generateHours(
  start: string,
  end: string,
  interval: number,
  buffer: number
) {
  const hours: string[] = [];
  const [startHours, startMinutes] = start.split(":").map(Number);
  const [endHours, endMinutes] = end.split(":").map(Number);
  let current = new Date();
  current.setHours(startHours, startMinutes, 0, 0);
  const endDate = new Date();
  endDate.setHours(endHours, endMinutes, 0, 0);
  while (current <= endDate) {
    const hoursFormatted = current.getHours().toString().padStart(2, "0");
    const minutesFormatted = current.getMinutes().toString().padStart(2, "0");
    hours.push(`${hoursFormatted}:${minutesFormatted}`);

    current.setMinutes(current.getMinutes() + interval + buffer);
  }

  return hours;
}

export async function buscarHorariosOcupados(data: Date) {
  const dataFormatada = data.toLocaleDateString("pt-BR");
  const agendamentos = await getAppointments();
  const horariosOcupados: string[] = [];

  agendamentos.forEach((agendamento: AppointmentsType) => {
    if (agendamento.reserved_date === dataFormatada) {
      agendamento.services.forEach((service: any) => {
        if (Array.isArray(service.reserved_hours)) {
          horariosOcupados.push(...service.reserved_hours);
        }
      });
    }
  });

  return horariosOcupados;
}
export function filterAvailables(
  availables: AvailabilityType[]
): AvailabilityType[] {
  const now = new Date();
  const todayStr = now.toISOString().split("T")[0]; // Ex: '2025-05-16'
  const currentMinutes = now.getHours() * 60 + now.getMinutes();

  return availables.map((day) => {
    if (day.date.toString() === todayStr) {
      const filteredHours = day.availableHours.filter((hour) => {
        const [h, m] = hour.split(":").map(Number);
        const hourInMinutes = h * 60 + m;
        return hourInMinutes > currentMinutes;
      });
      return { ...day, availableHours: filteredHours };
    }

    return day;
  });
}

/* 
inicio -> start
fim -> end
horarios -> hours
atual -> current
fimDate -> endDate
horas -> hoursFormatted
minutos -> minutesFormatted
intervalo -> interval
buffer -> buffer  */
