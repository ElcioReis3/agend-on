import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import useUserStore from "@/stores/userStore";
import { getUsers } from "@/services/getUser";
import api from "@/services/api";

export const useUserData = () => {
  const { data: session, status } = useSession();
  const setUser = useUserStore((state) => state.setUser);
  const clearUser = useUserStore((state) => state.clearUser);
  const today = new Date();
  const [loading, setLoading] = useState(true);

  // Use React Query para buscar usuários
  const {
    data: users,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
    staleTime: 1000 * 60 * 3, // 3 minutos
    enabled: status === "authenticated",
  });
  useEffect(() => {
    const updateUserStatus = async () => {
      if (!users || !session?.user?.email) return;

      const user = users.find((u) => u.email === session.user.email);

      if (user) {
        setUser(user);

        if (user.dueDate) {
          const dueDate = new Date(user.dueDate);
          if (dueDate < today) {
            try {
              await api.put(`/edit-client?id=${user.id}`, { status: false });
              setUser({ ...user });
            } catch (error) {
              console.error("Erro ao atualizar o status do usuário:", error);
            }
          }
        }
      } else {
        clearUser();
      }

      setLoading(false);
    };

    if (status === "authenticated") {
      updateUserStatus();
    } else {
      clearUser();
      setLoading(false);
    }
  }, [users, session, status, setUser, clearUser, refetch]);

  const forceRefetch = async () => {
    await refetch();
  };

  return { loading: isLoading || loading, session, forceRefetch };
};
