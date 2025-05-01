import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Badge } from "../ui/badge";
import { ServiceType } from "@/types/servicesType";

type Props = {
  children: React.ReactNode;
  date?: string;
  hours?: string;
  item?: ServiceType;
};

export const DialogAppointments = ({ children, date, hours, item }: Props) => {
  return (
    <Dialog>
      <DialogTrigger className="w-full h-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja realmente agendar esse horário?</DialogTitle>
          <DialogDescription>
            Você está realizando um agendamento para a data {date}, no horário
            de {hours}
          </DialogDescription>
        </DialogHeader>
        <div>
          {item && (
            <Badge className="p-3 my-3" variant="secondary">{`Serviço:${
              item.title
            }, ${item.description}, ${item.temp}min, R$ ${item.price.toFixed(
              2
            )}`}</Badge>
          )}
          <Button>Confirmar Agendamento</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
