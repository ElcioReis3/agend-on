export type AppointmentsType = {
  id: string;
  id_user: string;
  user_name: string;
  services: {
    id: string;
    title: string;
    description: string;
    temp: number;
    price: number;
    clas: "MASTER" | "OPTIONAL";
    reserved_hours: string[];
    due_date: string[] | Date[];
    status: "reserved" | "completed" | "canceled";
  }[];
  reserved_date: string;
  created_at?: string;
  updated_at?: string;
};
