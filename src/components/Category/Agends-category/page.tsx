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
import { RefreshCwIcon } from "lucide-react";
import { useEffect } from "react";

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
      <Table>
        <TableCaption>Lista completa de Agendamentos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Datas</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appointments &&
            appointments.map((appointment) => (
              <TableRow key={appointment.id}>
                <TableCell className="font-medium flex flex-col">
                  <div>{appointment.reserved_date}</div>
                  {appointment.services.map((service) => (
                    <div
                      key={service.id}
                      className="bg-green-400 p-1 rounded-md text-center"
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
                    <div key={service.id}>{service.status}</div>
                  ))}
                </TableCell>
                <TableCell className="text-right"></TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
