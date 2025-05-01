import { Menu } from "lucide-react";
import { DialogProfile } from "../Dialogs/Dialog-profile";
import useUserStore from "@/stores/userStore";

const formatPhone = (phone: string) => {
  const cleaned = phone.replace(/\D/g, "");
  return cleaned.replace(/^(\d{2})(\d{1})(\d{4})(\d{4})$/, "($1) $2 $3-$4");
};

export const UserInfo = () => {
  const { user } = useUserStore((state) => state);
  return (
    <>
      <span className="flex flex-col text-left text-xs md:text-sm">
        {user?.email && <span>{user?.email}</span>}
        {user?.phone && <span>Tel: {formatPhone(user?.phone)}</span>}
        {user?.address && <span>End: {user?.address}</span>}
      </span>
    </>
  );
};
