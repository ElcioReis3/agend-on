"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";
import { useToast } from "@/hooks/use-toast";
import useUserStore from "@/stores/userStore";
import { ServiceType } from "@/types/servicesType";
import api from "@/services/api";
import { useState } from "react";
import useAppointmentTempStore from "@/stores/useAppointTempState";
import { useQueryClient } from "@tanstack/react-query";

type Props = {
  children: React.ReactNode;
  reserved_date?: string;
  reserved_hours?: string;
  services?: ServiceType;
  onConfirm?: () => void;
};

export const DialogAppointments = ({
  children,
  reserved_date,
  reserved_hours,
  services,
  onConfirm,
}: Props) => {
  const { toast } = useToast();
  const user = useUserStore((state) => state.user);
  const [observation, setObservation] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const setAppointmentTemp = useAppointmentTempStore(
    (state) => state.setAppointmentTemp
  );
  const queryClient = useQueryClient();

  const handleConfirm = async () => {
    if (!user?.id || !reserved_date || !reserved_hours || !services) {
      toast({ title: "Preencha todas as informações necessárias." });
      return;
    }

    try {
      setAppointmentTemp({
        reserved_date,
        reserved_hours: [reserved_hours],
        services,
        observation,
      });

      handlePayment(services.title, services.price, [services.description]);
    } catch (error) {
      toast({ title: "Erro ao realizar o agendamento." });
    }
  };

  const handlePayment = async (
    title: string,
    price: number,
    desc: string[]
  ) => {
    if (user?.role === "ADMIN") {
      toast({
        variant: "destructive",
        autoFocus: true,
        title: "Você é um administrador!!!",
        description: "As assinaturas só são válidas para usuários comuns.",
      });
      return;
    }
    if (!user) {
      toast({
        variant: "destructive",
        autoFocus: true,
        title: "Faça o login!!!",
        description: "É necessário que acesse com email e senha.",
      });
      //router.replace("/auth/signin");
      return;
    }

    try {
      const description = desc.join(",");

      // Primeira requisição: POST para criar o checkout
      let response;
      try {
        response = await api.post("/checkout", {
          title,
          quantity: 1,
          description,
          price,
        });
      } catch (error) {
        console.error("Erro ao criar o checkout:", error);
        toast({
          title: "Erro ao tentar processar o pagamento. Tente novamente.",
        });
        return;
      }

      if (response?.data?.url) {
        window.open(response.data.url, "_blank");
      } else {
        console.error("A URL do checkout não foi retornada.");
        toast({ title: "Erro ao tentar redirecionar para o pagamento." });
      }
    } catch (error) {
      console.error("Erro ao processar pagamento:", error);
      toast({
        title:
          "Ocorreu um erro ao tentar processar o pagamento. Tente novamente mais tarde.",
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Confirmar Agendamento</DialogTitle>
          <DialogDescription>
            Olá {user?.name}, você está agendando para a data {reserved_date} às{" "}
            {reserved_hours}.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          {services && (
            <div className="flex flex-col">
              <span>Serviço: {services.title}</span>
              <span>
                R$ {services.price.toFixed(2)} | {services.temp}min
              </span>
            </div>
          )}

          <Textarea
            placeholder="Observações (opcional)"
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
          />
          {services && (
            <Button className="mt-2" onClick={handleConfirm}>
              Confirmar Agendamento
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
