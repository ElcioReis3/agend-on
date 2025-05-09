"use client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getAppointments } from "@/services/getApi";
import useAppointmentStore from "@/stores/useAppointmentStore";
import { Menu, RefreshCwIcon } from "lucide-react";
import { useEffect } from "react";
import { ActionsAgend } from "./ActionsAgend";

export const TableAgends = () => {
  const { appointments, setApointment } = useAppointmentStore((state) => state);

  const handleListAgends = async () => {
    const list = await getAppointments();
    setApointment(list);
  };
  useEffect(() => {
    handleListAgends();
  }, [setApointment]);

  return (
    <div>
      <RefreshCwIcon
        className="cursor-pointer text-muted-foreground active:animate-spin"
        onClick={handleListAgends}
      />
      <Table className="[&_th]:py-1 [&_td]:py-1 [&_td]:px-2 [&_th]:px-2 text-sm border-collapse">
        <TableCaption>Lista completa de Agendamentos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Datas</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor a pagar</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="min-h-96">
          {appointments &&
            appointments.map((appointment) => (
              <TableRow key={appointment.id} className="space-x-0">
                <TableCell className="font-medium flex flex-col">
                  <div>{appointment.reserved_date}</div>
                  {appointment.services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-gray-300 px-1 text-center text-xs rounded-sm"
                    >
                      {service.reserved_hours}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  {appointment.services.map((service) => (
                    <div key={service.id}>{service.title}</div>
                  ))}
                </TableCell>
                <TableCell>{appointment.user_name}</TableCell>
                <TableCell>
                  {appointment.services.map((service) => (
                    <div key={service.id}>R$ {service.price.toFixed(2)}</div>
                  ))}
                </TableCell>
                <TableCell>
                  {appointment.services.map((service) => (
                    <div key={service.id}>
                      {service.status === "completed" && (
                        <span className="bg-green-400 p-1 rounded-md">
                          Atentido
                        </span>
                      )}
                      {service.status === "reprice" && (
                        <span className="bg-gray-400 p-1 rounded-md">
                          Reagendado
                        </span>
                      )}
                      {service.status === "reserved" && (
                        <span className="bg-gray-400 p-1 rounded-md">
                          Reservado
                        </span>
                      )}
                      {service.status === "canceled" && (
                        <span className="bg-red-400 p-1 rounded-md">
                          Cancelado
                        </span>
                      )}
                    </div>
                  ))}
                </TableCell>
                <TableCell>
                  <ActionsAgend item={appointment}>
                    <Menu />
                  </ActionsAgend>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
