import api from "@/services/api";
import useUserStore from "@/stores/userStore";
import { FormattedDate } from "@/services/formattedDate";

export const UserPlan = () => {
  const { user } = useUserStore((state) => state);

  return (
    <span className="flex flex-col">
      {user?.role === "USER" && (
        <span className="text-gray-700 font-bold">Agendamentos</span>
      )}
    </span>
  );
};
