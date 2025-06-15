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
    <Table className="text-sm border-collapse">
      <TableCaption>Lista completa de Agendamentos.</TableCaption>
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
              className="space-x-0 sm:text-xs md:text-sm h-7"
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
              <TableCell className="font-medium flex flex-col md:flex-row px-2 items-center justify-center">
                <div>
                  {appointment.reserved_date.split("-").reverse().join("/")}
                </div>
                {appointment.services.map((service) => (
                  <div
                    key={service.id}
                    className="bg-gray-300 px-2 text-center text-xs rounded-sm text-black md:text-sm"
                  >
                    {service.reserved_hours}
                  </div>
                ))}
              </TableCell>
              <TableCell className="px-2 py-2">
                {appointment.services.map((service) => (
                  <div key={service.id}>{service.title}</div>
                ))}
              </TableCell>
              <TableCell className="px-2 py-2">
                {appointment.services.map((observation) => (
                  <span className="text-xs text-red-700">
                    {observation.observation}
                  </span>
                ))}
              </TableCell>
              <TableCell className="px-2 py-2">
                {appointment.user_name}
              </TableCell>
              <TableCell className="px-2 py-2">
                {appointment.services.map((service) => (
                  <div key={service.id}>
                    {service.due_date.map((date) => (
                      <span className="text-xs" key={service.id}>
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
