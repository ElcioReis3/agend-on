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
  const { user } = useUserStore((state) => state);

  const [observation, setObservation] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleConfirm = async () => {
    if (!user?.id || !reserved_date || !reserved_hours || !services) {
      toast({ title: "Preencha todas as informações necessárias." });
      return;
    }

    const [day, month, year] = reserved_date.split("/");
    const formattedDate = `${year}-${month.padStart(2, "0")}-${day.padStart(
      2,
      "0"
    )}`;

    try {
      const response = await api.post("/add-agend", {
        id_user: user.id,
        reserved_date: formattedDate,
        reserved_hours: [reserved_hours],
        services: [services],
        observation,
      });

      if (response.status === 200) {
        toast({ title: "Agendamento concluído com sucesso!" });
        setIsOpen(false);
        onConfirm && onConfirm();
      }
    } catch (error) {
      toast({ title: "Erro ao realizar o agendamento." });
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

          <Button className="mt-2" onClick={handleConfirm}>
            Confirmar Agendamento
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
