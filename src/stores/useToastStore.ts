import { create } from "zustand";

type ToastStore = {
  message: string | null;
  showMessage: (message: string) => void;
};

const useToastStore = create<ToastStore>((set) => ({
  message: null,
  showMessage: (message: string) => set({ message }),
}));

export default useToastStore;
