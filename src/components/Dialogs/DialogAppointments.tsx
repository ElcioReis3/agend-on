import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { ServiceType } from "@/types/servicesType";
import useUserStore from "@/stores/userStore";
import { useToast } from "@/hooks/use-toast";
import { Textarea } from "../ui/textarea";
import { useState } from "react";
import { paymentCheckout } from "@/services/payments";

type Props = {
  children: React.ReactNode;
  reserved_date?: string;
  reserved_hours?: string;
  services?: ServiceType;
  onSuccess?: () => void;
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
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async (
    id_user: string | undefined,
    reserved_date: string,
    reserved_hours: string,
    services: ServiceType,
    observation: string
  ) => {
    if (!id_user || !reserved_date || !reserved_hours || !services) return;

    try {
      const response = await paymentCheckout(
        id_user,
        services,
        reserved_date,
        reserved_hours
      );

      if (response.status === 200 && response.data.url) {
        window.open(response.data.url, "_blank");
      } else {
        toast({ title: "Erro ao redirecionar para o pagamento" });
      }
    } catch (error) {
      console.error("Erro ao criar preferência de pagamento:", error);
      toast({ title: "Erro ao iniciar pagamento" });
    }
  };

  /* const handleConfirm = async (
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
          title: "Agendamento concluído com sucesso!",
        });
        setIsOpen(false);
      }
    }
  }; */

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
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
              Efetuar o pagamento
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
