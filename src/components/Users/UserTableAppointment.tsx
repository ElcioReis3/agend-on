"use client";
import { StatusAppointments } from "@/app/plan/list-appointments/statusAppointments";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FormattedDate } from "@/services/formattedDate";
import { AppointmentsType } from "@/types/appointmentType";
import { ActionsAgend } from "../Category/Agends-category/ActionsAgend";
import { CalendarClock, CalendarSync, Check, Menu, X } from "lucide-react";
import { accordionFilterDates, FilterType } from "@/utils/accordionFilterDates";
import { useState } from "react";

type Props = {
  appointments: AppointmentsType[];
  userBtn: "ADMIN" | "USER";
};

export const UserTableAppointment = ({ appointments, userBtn }: Props) => {
  const [selectedFilter, setSelectedFilter] = useState<FilterType>("thisWeek");

  const filteredAvailabilities = appointments.filter((item) =>
    accordionFilterDates(new Date(item.reserved_date), selectedFilter)
  );

  return (
    <Table className="text-sm border-collapse">
      <TableCaption>
        <div>Lista completa de Agendamentos.</div>
        <div className="w-max flex gap-1 m-auto text-black">
          <span className="w-min flex items-center px-2 bg-green-500 rounded-md text-xs justify-center">
            <Check />
            Atentido
          </span>
          <span className="w-min flex items-center px-2 bg-green-500 rounded-md text-xs justify-center">
            <CalendarSync /> Reagendado
          </span>
          <span className="w-min flex items-center px-2 bg-gray-500 rounded-md text-xs justify-center">
            <CalendarClock /> Reservado
          </span>
          <span className="w-min flex items-center px-2 bg-red-500 rounded-md text-xs justify-center">
            <X />
            Cancelado
          </span>
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow className="h-9">
          <TableHead className="w-36 px-1 py-2">Status</TableHead>
          <TableHead className="w-32 md:w-40 px-1 py-2">Data</TableHead>
          <TableHead className="w-40 px-1 py-2">Serviço</TableHead>
          <TableHead className="w-40 px-1 py-2">Observações</TableHead>
          <TableHead className="w-40 px-1 py-2">Cliente</TableHead>
          <TableHead className="w-32 px-1 py-2">Vencimento</TableHead>
          <TableHead className="px-1 py-2">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="min-h-96">
        {appointments &&
          appointments.map((appointment) => (
            <TableRow
              key={appointment.id}
              className="space-x-0 sm:text-xs md:text-sm"
            >
              <TableCell className="px-1 py-2">
                {appointment.services.map((service) => (
                  <StatusAppointments
                    key={service.id}
                    service={service}
                    onText={true}
                  />
                ))}
              </TableCell>
              <TableCell className=" font-medium flex flex-col md:flex-row px-2 items-center justify-center">
                <div>
                  {appointment.reserved_date.split("-").reverse().join("/")}
                </div>
                {appointment.services.map((service) => (
                  <div
                    key={service.id}
                    className="px-2 text-center text-xs rounded-sm text-muted-foreground"
                  >
                    {service.reserved_hours}
                  </div>
                ))}
              </TableCell>
              <TableCell className="px-2 py-2">
                {appointment.services.map((service) => (
                  <div className="min-w-32 px-2 py-2" key={service.id}>
                    {service.title}
                  </div>
                ))}
              </TableCell>
              <TableCell className="px-2 py-2">
                {appointment.services.map((obs) => (
                  <span key={obs.id} className="text-xs text-red-700">
                    {obs.observation}
                  </span>
                ))}
              </TableCell>
              <TableCell className="px-2 py-2">
                {appointment.user_name}
              </TableCell>
              <TableCell className="px-2 py-2">
                {appointment.services.map((service) => (
                  <div key={service.id}>
                    {service.due_date.map((date, index) => (
                      <span key={index} className="text-xs">
                        {FormattedDate(date)}
                      </span>
                    ))}
                  </div>
                ))}
              </TableCell>
              <TableCell className="px-2 py-2">
                <ActionsAgend item={appointment} userBtn={`${userBtn}`}>
                  <Menu className="cursor-pointer" />
                </ActionsAgend>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
