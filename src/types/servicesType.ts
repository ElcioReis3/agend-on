export type ServiceType = {
  id: string;
  title: string;
  description: string;
  temp: number;
  price: number;
  reserved_hours: string[];
  due_date: string[];
  clas?: string;
  status?: "reserved" | "completed" | "canceled" | "reprice";
  observation?: string;
};
