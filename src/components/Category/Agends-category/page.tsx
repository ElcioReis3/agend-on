"use client";
import { getAppointments } from "@/services/getApi";
import { RefreshCwIcon } from "lucide-react";
import { use, useEffect } from "react";
import { UserTableAppointment } from "@/components/Users/UserTableAppointment";
import useAppointmentStore from "@/stores/useAppointmentStore";
import { chartDateFilter } from "@/data/AppointsData";

export const TableAgends = () => {
  const appointments = useAppointmentStore((state) => state.appointments);
  const setApointment = useAppointmentStore((state) => state.setApointment);

  const handleListAgends = async () => {
    const list = await getAppointments();
    setApointment(list);
  };
  useEffect(() => {
    handleListAgends();
  }, [setApointment]);

  return (
    <div className="min-h-96">
      <RefreshCwIcon className="cursor-pointer text-muted-foreground active:animate-spin" />
      <UserTableAppointment appointments={appointments} userBtn="ADMIN" />
    </div>
  );
};
