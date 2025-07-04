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
import useAppointmentStore from "@/stores/useAppointmentStore";
import { useAvailabilityStore } from "@/stores/useAvailabilityStore";
import useUserStore from "@/stores/userStore";
import { AppointmentsType } from "@/types/appointmentType";
import React, { useEffect, useState } from "react";

type Props = {
  children: React.ReactNode;
  item: AppointmentsType;
  userBtn: "ADMIN" | "USER";
};

export const ActionsAgend = ({ children, item, userBtn }: Props) => {
  const { toast } = useToast();
  const { user } = useUserStore((state) => state);
  const availabilities = useAvailabilityStore((state) => state.availabilities);
  const setAvailabilities = useAvailabilityStore(
    (state) => state.setAvailabilities
  );
  const { appointments, setApointment } = useAppointmentStore();
  const [selectedDate, setSelectedDate] = useState<string>("");
  const [selectedHour, setSelectedHour] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchAvailables = async () => {
      const response = await getAvailables();
      setAvailabilities(response);
    };
    fetchAvailables();
  }, []);

  const handleComplete = async () => {
    const response = await putCompleted(item);
    if (response.status === 200) {
      toast({ title: "Atendimento concluído com sucesso!" });
    }
    setIsOpen(false);
  };

  const handleCanceled = async () => {
    const response = await putCanceled(item);
    if (response.status === 200) {
      toast({ title: "Agendamento cancelado com sucesso!" });
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
      const updated: AppointmentsType[] = appointments.map((a) =>
        a.id === response.data.newUpdateAppointmest.id
          ? response.data.newUpdateAppointmest
          : a
      );
      setApointment(updated);

      toast({ title: "Reagendado com sucesso!" });
    }
    setIsOpen(false);
  };

  const isFuture = new Date(item.services[0].due_date[0]) > new Date();

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Ações para esse agendamento</DialogTitle>
          <DialogDescription>
            Marque como atendido, cancelado ou reagende.
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3">
          {/* Atender */}
          {user?.role === "ADMIN" && userBtn === "ADMIN" && (
            <DialogConfirm
              confirm={handleComplete}
              contentArea={
                <AlertDestructive description="Ao confirmar, você informa que o pagamento foi efetuado e o atendimento concluído." />
              }
            >
              <Button className="w-full">Atendido</Button>
            </DialogConfirm>
          )}

          {/* Reagendar */}
          {isFuture ? (
            <DialogConfirm
              confirm={handleEdit}
              contentArea={
                <UserDateTimePicker
                  availables={filterAvailables(availabilities)}
                  selectedDate={selectedDate}
                  setSelectedDate={setSelectedDate}
                  setSelectedHour={setSelectedHour}
                />
              }
            >
              <Button variant="outline" className="w-full">
                Reagendar
              </Button>
            </DialogConfirm>
          ) : (
            <Button variant="outline" disabled className="w-full">
              Reagendar indisponível
            </Button>
          )}

          {/* Cancelar */}
          {isFuture ? (
            <DialogConfirm confirm={handleCanceled}>
              <Button variant="destructive" className="w-full">
                Cancelar
              </Button>
            </DialogConfirm>
          ) : (
            <Button variant="destructive" disabled className="w-full">
              Cancelar indisponível
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
