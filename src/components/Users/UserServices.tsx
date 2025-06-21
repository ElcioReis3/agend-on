import { StatusAppointments } from "@/app/plan/list-appointments/statusAppointments";
import { useLoadAppointments } from "@/hooks/useLoadAppointments";
import useAppointmentsStore from "@/stores/useAppointmentsStore";
import useUserStore from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";

export const UserPlan = () => {
  const router = useRouter();
  useLoadAppointments();
  const user = useUserStore((state) => state.user);
  const appointments = useAppointmentsStore((state) => state.appointments);

  if (user?.role !== "USER") return null;

  return (
    <div className="flex flex-col">
      <div className="flex justify-between items-center">
        <span className="text-gray-700 font-bold">Agendamentos</span>
        <Button
          className="text-sm underline text-muted-foreground bg-transparent hover:bg-transparent"
          onClick={() => router.replace("/plan/list-appointments")}
        >
          Ver lista
        </Button>
      </div>
      {appointments.length === 0 && (
        <span className="text-gray-500 text-sm">
          Nenhum agendamento encontrado.
        </span>
      )}
      {appointments.length > 0 && (
        <div className="h-72 overflow-y-scroll">
          {appointments.map((agendamento) => (
            <div key={agendamento.id} className=" text-sm text-gray-700 mt-1">
              <div className="border rounded-md p-1">
                <div key={agendamento.id} className="font-semibold">
                  {agendamento.reserved_date}
                </div>
                {agendamento.services.map((service) => (
                  <div key={service.id} className="flex gap-1 items-center">
                    <StatusAppointments service={service} onText={false} />
                    <div className="bg-green-300 rounded-md">
                      {service.reserved_hours}
                    </div>
                    <div>{service.title}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
