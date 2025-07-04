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
        <span className="w-min flex items-center px-2 bg-green-400 rounded-md text-xs justify-center">
          <Check />
          {/* {onText && "Atentido"} */}
        </span>
      )}
      {service.status === "reprice" && (
        <span className="w-min flex items-center px-2 bg-green-400 rounded-md text-xs justify-center">
          <CalendarSync /> {/* {onText && "Reagendado"} */}
        </span>
      )}
      {service.status === "reserved" && (
        <span className="w-min flex items-center px-2 bg-gray-400 rounded-md text-xs justify-center">
          <CalendarClock /> {/* {onText && "Reservado"} */}
        </span>
      )}
      {service.status === "canceled" && (
        <span className="w-min flex items-center px-2 bg-red-400 rounded-md text-xs justify-center">
          <X />
          {/* {onText && "Cancelado"} */}
        </span>
      )}
    </div>
  );
};
