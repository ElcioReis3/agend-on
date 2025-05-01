import { create } from "zustand";

interface Clients {
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
}

interface ClientsStore {
  clients: Clients[];
  setClients: (clients: Clients[]) => void;
  clearClients: () => void;
}

const useClientsStore = create<ClientsStore>((set) => ({
  clients: [],
  setClients: (clients) => set({ clients }),
  clearClients: () => set({ clients: [] }),
}));

export default useClientsStore;
