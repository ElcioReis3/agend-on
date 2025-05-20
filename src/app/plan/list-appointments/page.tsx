"use client";
import { Accordion } from "@/components/ui/accordion";
import useAppointmentsStore from "@/stores/useAppointmentsStore";
import { UserTableAppointment } from "@/components/Users/UserTableAppointment";

export default function Page() {
  const { appointments } = useAppointmentsStore();

  return (
    <Accordion type="single" collapsible>
      <div className="w-full h-96 max-w-3xl m-auto my-20 ">
        <div className="text-xl text-center text-gray-700 font-bold">
          Meus Agendamentos
        </div>
        {appointments.length === 0 ? (
          <div className="w-full text-gray-500 text-sm text-center mt-32">
            Nenhum agendamento encontrado...
          </div>
        ) : (
          <UserTableAppointment appointments={appointments} userBtn="USER" />
        )}
      </div>
    </Accordion>
  );
}
