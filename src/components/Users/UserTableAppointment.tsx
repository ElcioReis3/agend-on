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
import { Menu } from "lucide-react";

type Props = {
  appointments: AppointmentsType[];
  userBtn: "ADMIN" | "USER";
};

export const UserTableAppointment = ({ appointments, userBtn }: Props) => {
  return (
    <Table className="[&_th]:py-1 [&_td]:py-1 [&_td]:px-2 [&_th]:px-2 text-sm border-collapse">
      <TableCaption>Lista completa de Agendamentos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-24">Data</TableHead>
          <TableHead className="w-20">Serviço</TableHead>
          <TableHead className="w-40">Cliente</TableHead>
          <TableHead className="w-28">Vencimento</TableHead>
          <TableHead className="w-40">Status</TableHead>
          <TableHead className="text-right">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="min-h-96">
        {appointments &&
          appointments.map((appointment) => (
            <TableRow
              key={appointment.id}
              className="space-x-0 sm:text-xs md:text-sm"
            >
              <TableCell className="font-medium flex flex-col">
                <div>
                  {appointment.reserved_date.split("-").reverse().join("/")}
                </div>
                {appointment.services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-gray-300 px-1 text-center text-xs rounded-sm text-black"
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
                  <div key={service.id}>
                    {service.due_date.map((date, index) => (
                      <span key={index}>{FormattedDate(date)}</span>
                    ))}
                  </div>
                ))}
              </TableCell>
              <TableCell>
                {appointment.services.map((service) => (
                  <StatusAppointments service={service} onText={true} />
                ))}
              </TableCell>
              <TableCell className="text-right">
                <ActionsAgend item={appointment} userBtn={`${userBtn}`}>
                  <Menu />
                </ActionsAgend>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
