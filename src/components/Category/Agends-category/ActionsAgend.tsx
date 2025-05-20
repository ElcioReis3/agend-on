"use client";
import { AlertDestructive } from "@/components/alerts/alertDestructive";
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
import { UserDateTimePicker } from "@/components/Users/UserDateTimePicker";
import { useToast } from "@/hooks/use-toast";
import { filterAvailables } from "@/services/generateHours";
import { getAvailables } from "@/services/getApi";
import { putCanceled, putCompleted, putRescheduled } from "@/services/putApi";
import useUserStore from "@/stores/userStore";
import { AppointmentsType } from "@/types/appointmentType";
import { AvailabilityType } from "@/types/availabilityType";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  item: AppointmentsType;
  userBtn: "ADMIN" | "USER";
};

export const ActionsAgend = ({ children, item, userBtn }: Props) => {
  const { toast } = useToast();
  const [availables, setAvailables] = useState<AvailabilityType[]>([]);
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const { user } = useUserStore((state) => state);
  const [isOpen, setIsOpen] = useState(false);
  const myHour = availables.map((available) => available.availableHours);
  console.log(myHour);

  useEffect(() => {
    const fetchAvailables = async () => {
      const response = await getAvailables();
      setAvailables(response);
    };

    fetchAvailables();
  }, [setSelectedHour, setSelectedDate, setAvailables]);

  const handleComplete = async (item: AppointmentsType) => {
    const response = await putCompleted(item);
    if (response.status === 200) {
      toast({
        title: "Foi concluído",
      });
    }
    setIsOpen(false);
  };
  const handleCanceled = async () => {
    const response = await putCanceled(item);
    if (response.status === 200) {
      toast({
        title: "Foi cancelado",
      });
    }
    setIsOpen(false);
  };
  const handleEdit = async () => {
    if (!selectedDate || !selectedHour) {
      toast({ title: "Selecione uma data e horário." });
      return;
    }

    const response = await putRescheduled(item, selectedDate, selectedHour);
    if (response.status === 200) {
      toast({ title: "Reagendado com sucesso!" });
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ações para esse agendamento.</DialogTitle>
          <DialogDescription>
            Marque como atendido, cancelado e/ou reagendado.
          </DialogDescription>
        </DialogHeader>
        <div className="flex gap-5 max-w-32">
          {user && userBtn === "ADMIN" && user?.role === "ADMIN" && (
            <DialogConfirm
              confirm={() => handleComplete(item)}
              contentArea={
                <AlertDestructive
                  description="Ao clicar em confirmar, você está confirmando que o pagamento já
                foi efetuado e o cliente ja foi atendido."
                />
              }
            >
              <Button onClick={() => setIsOpen(true)}>Atendido</Button>
            </DialogConfirm>
          )}
          {new Date(item.services[0].due_date[0]) > new Date() ? (
            <DialogConfirm
              confirm={handleEdit}
              contentArea={
                <UserDateTimePicker
                  availables={filterAvailables(availables)}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  setSelectedHour={setSelectedHour}
                />
              }
            >
              <Button onClick={() => setIsOpen(true)} variant="outline">
                Reagendar
              </Button>
            </DialogConfirm>
          ) : (
            <Button variant="outline" disabled>
              Reagendar indisponível
            </Button>
          )}
          {new Date(item.services[0].due_date[0]) > new Date() ? (
            <DialogConfirm confirm={handleCanceled}>
              <Button onClick={() => setIsOpen(true)} variant="destructive">
                Cancelar
              </Button>
            </DialogConfirm>
          ) : (
            <Button variant="destructive" disabled>
              Cancelar indisponível
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
