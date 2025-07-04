"use client";
import { getAppointments } from "@/services/getApi";
import { RefreshCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { UserTableAppointment } from "@/components/Users/UserTableAppointment";
import useAppointmentStore from "@/stores/useAppointmentStore";
import { FilterDates } from "@/components/Accordions/FilterDates";
import { AppointmentsType } from "@/types/appointmentType";

export const TableAgends = () => {
  const appointments = useAppointmentStore((state) => state.appointments);
  const setApointment = useAppointmentStore((state) => state.setApointment);
  const [filteredAppointments, setFilteredAppointments] =
    useState(appointments);

  const handleListAgends = async () => {
    const list = await getAppointments("desc");
    setApointment(list);
    setFilteredAppointments(list);
  };
  useEffect(() => {
    handleListAgends();
  }, [setApointment]);

  return (
    <div className="min-h-96">
      <div className="flex justify-between">
        <RefreshCwIcon className="cursor-pointer text-muted-foreground active:animate-spin" />
        <FilterDates
          data={appointments}
          dateKey="reserved_date"
          onFilter={setFilteredAppointments}
        />
      </div>
      <UserTableAppointment
        appointments={filteredAppointments}
        userBtn="ADMIN"
      />
    </div>
  );
};
