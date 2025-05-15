"use client";
import { Accordion } from "@/components/ui/accordion";
import useAppointmentsStore from "@/stores/useAppointmentsStore";
import { UserTableAppointment } from "@/components/Users/UserTableAppointment";

export default function Page() {
  const { appointments } = useAppointmentsStore();

  return (
    <Accordion type="single" collapsible>
      <div className="w-full max-w-3xl m-auto my-20">
        <div className="text-xl text-center text-gray-700 font-bold">
          Meus Agendamentos
        </div>
        {appointments.length === 0 ? (
          <span className="text-gray-500 text-sm text-center">
            Nenhum agendamento encontrado.
          </span>
        ) : (
          <UserTableAppointment appointments={appointments} userBtn="USER" />
        )}
      </div>
    </Accordion>
  );
}
