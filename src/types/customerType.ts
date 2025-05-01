export type CustomerType = {
  id: string;
  name: string;
  email: string;
  address: string;
  password: string;
  phone: string;
  role: "USER" | "ADMIN";
  dueDate?: string;
  reserved_data?: string[];
  subscriptionDate?: string;
  create_at?: string;
  update_at?: string;
};
