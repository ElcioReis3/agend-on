import { ServiceType } from "@/types/servicesType";
import { CalendarClock, CalendarSync, Check, X } from "lucide-react";

type Props = {
  service: ServiceType;
  onText?: boolean;
};

export const StatusAppointments = ({ service, onText }: Props) => {
  return (
    <div key={service.id}>
      {service.status === "completed" && (
        <span className="flex items-center bg-green-400 p-1 rounded-md">
          <Check />
          {onText && "Atentido"}
        </span>
      )}
      {service.status === "reprice" && (
        <span className="flex items-center bg-gray-400 p-1 rounded-md">
          <CalendarSync /> {onText && "Reagendado"}
        </span>
      )}
      {service.status === "reserved" && (
        <span className="flex items-center bg-gray-400 p-1 rounded-md">
          <CalendarClock /> {onText && "Reservado"}
        </span>
      )}
      {service.status === "canceled" && (
        <span className="flex items-center bg-red-400 p-1 rounded-md">
          <X />
          {onText && "Cancelado"}
        </span>
      )}
    </div>
  );
};
