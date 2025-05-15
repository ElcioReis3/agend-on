"use client";
import { getAppointments } from "@/services/getApi";
import useAppointmentStore from "@/stores/useAppointmentStore";
import { RefreshCwIcon } from "lucide-react";
import { useEffect } from "react";
import { UserTableAppointment } from "@/components/Users/UserTableAppointment";

export const TableAgends = () => {
  const { appointments, setApointment } = useAppointmentStore((state) => state);

  const handleListAgends = async () => {
    const list = await getAppointments();
    setApointment(list);
  };
  useEffect(() => {
    handleListAgends();
  }, [setApointment]);

  return (
    <div className="min-h-96">
      <RefreshCwIcon
        className="cursor-pointer text-muted-foreground active:animate-spin"
        onClick={handleListAgends}
      />
      <UserTableAppointment appointments={appointments} userBtn="ADMIN" />
    </div>
  );
};
