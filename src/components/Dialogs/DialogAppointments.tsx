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
import api from "@/services/api";
import useUserStore from "@/stores/userStore";
import { CustomerType } from "@/types/customerType";
import { useToast } from "@/hooks/use-toast";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useState } from "react";

type Props = {
  children: React.ReactNode;
  reserved_date?: string;
  reserved_hours?: string;
  services?: ServiceType;
};

export const DialogAppointments = ({
  children,
  reserved_date,
  reserved_hours,
  services,
}: Props) => {
  const [observation, setObservation] = useState("");
  const { toast } = useToast();
  const { user } = useUserStore((state) => state);

  const handleConfirm = async (
    id_user: string | undefined,
    reserved_date: string,
    reserved_hours: string,
    services: ServiceType,
    observation: string
  ) => {
    if (id_user && reserved_date && reserved_hours && services) {
      const response = await api.post("add-agend", {
        id_user,
        reserved_date,
        reserved_hours: [reserved_hours],
        services: [services],
        observation,
      });
      if (response.status === 200) {
        toast({
          title: "Deu certo",
        });
      }
    }
  };

  return (
    <Dialog>
      <DialogTrigger className="w-full h-full">{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Deseja realmente agendar esse horário?</DialogTitle>
          <DialogDescription>
            Olá {user?.name}, você está realizando um agendamento para a data{" "}
            {reserved_date}, no horário de {reserved_hours}
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-3">
          {services && (
            <>
              <div className="flex flex-col">
                <span>Serviço: {services.title}</span>
                <span>
                  R$ {services.price.toFixed(2)} | {services.temp}min
                </span>
              </div>
              <Textarea
                placeholder="Observações"
                value={observation}
                onChange={(e) => setObservation(e.target.value)}
              />
            </>
          )}
          {reserved_date && reserved_hours && services && (
            <Button
              className="mt-3"
              onClick={() =>
                handleConfirm(
                  user?.id,
                  reserved_date,
                  reserved_hours,
                  services,
                  observation
                )
              }
            >
              Confirmar Agendamento
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
