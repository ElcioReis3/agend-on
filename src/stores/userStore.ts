import { create } from "zustand";

interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  password: string;
  phone: string;
  role: "USER" | "ADMIN";
  dueDate?: string;
  reserved_date?: string[];
  create_at?: string;
  update_at?: string;
  subscriptionDate?: string;
}

interface UserStore {
  user: User | undefined;
  setUser: (user: User) => void;
  clearUser: () => void;
}

const useUserStore = create<UserStore>((set) => ({
  user: undefined,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: undefined }),
}));

export default useUserStore;
