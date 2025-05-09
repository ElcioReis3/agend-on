"use client";
import { DialogConfirm } from "@/components/Dialogs/DialogConfirm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { AppointmentsType } from "@/types/appointmentType";
import React from "react";

type Props = {
  children: React.ReactNode;
  item: AppointmentsType;
};

export const ActionsAgend = ({ children, item }: Props) => {
  const { toast } = useToast();

  const handleComplete = async (item: AppointmentsType) => {
    const updatedServices = item.services.map((service) => ({
      id: service.id,
      status: "completed",
    }));
    const response = await api.put("update-agend", {
      id: item.id,
      id_user: item.id_user,
      user_name: item.user_name,
      services: updatedServices,
      reserved_date: item.reserved_date,
    });

    toast({
      title: "Foi concluído",
    });
  };
  const handleCanceled = () => {
    toast({
      title: "Foi cancelado",
    });
  };
  const handleEdit = () => {
    toast({
      title: "Foi reagendado",
    });
  };

  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ações para esse agendamento.</DialogTitle>
          <DialogDescription>
            Marque como atendido, cancelado e/ou reagendado.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-5 max-w-32">
          <DialogConfirm
            confirm={() => handleComplete(item)}
            contentArea={
              <div>
                Ao clicar em confirmar, você está confirmando que o pagamento já
                foi efetuado e o cliente ja foi atendido.
              </div>
            }
          >
            <Button>Atendido</Button>
          </DialogConfirm>
          <DialogConfirm
            confirm={handleEdit}
            contentArea={
              <div>
                Escolha uma nova Data/Horário
                <div className="flex gap-1">
                  <Input type="date" />
                  <Input type="time" />
                </div>
              </div>
            }
          >
            <Button variant="outline">Reagendar</Button>
          </DialogConfirm>
          <DialogConfirm confirm={handleCanceled}>
            <Button variant="destructive">Cancelar</Button>
          </DialogConfirm>
        </div>
      </DialogContent>
    </Dialog>
  );
};
