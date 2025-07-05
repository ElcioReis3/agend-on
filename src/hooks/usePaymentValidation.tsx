"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/services/api";
import useUserStore from "@/stores/userStore";
import { useToast } from "./use-toast";
import { useQueryClient } from "@tanstack/react-query";
import useServiceStore from "@/stores/serviceStore";
import useselectServiceStore from "@/stores/useSelectionService";

export const usePaymentValidation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const status = searchParams.get("status");
  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");
  const setUser = useUserStore((state) => state.setUser);
  const user = useUserStore((state) => state.user);
  const [count, setCount] = useState(10);
  const [isPaymentValid, setIsPaymentValid] = useState(false);
  const selectServices = useselectServiceStore((state) => state.selectServices);
  const [loadingUser, setLoadingUser] = useState(true);
  const [message, setMessage] = useState<string | null>(null);

  const services = selectServices?.services;
  const reserved_date = selectServices?.reserved_date as string;
  const reserved_hours = selectServices?.reserved_hours;
  const observation = selectServices?.services?.observation ?? "";

  // 1️ Função para registrar o pagamento no backend
  const registerPayment = async () => {
    try {
      if (!paymentId || !status) {
        setMessage("Dados inválidos para registro de pagamento");
        router.replace("/"); // Redireciona para a home caso falte algum dado
        return;
      }
      const response = await api.post("/payments/webhook", {
        payment_id: paymentId,
        status,
        user_id: user?.id, // Certifique-se de que o user?.id não seja undefined ou null
      });
      console.log("Pagamento registrado:", response.data);
      setMessage(`Pagamento registrado:", ${response.data}`);
    } catch (error) {
      console.warn("Erro ao registrar pagamento:", error);
      router.replace("/"); // Redireciona em caso de erro
    }
  };

  // 2️ Função para verificar o pagamento no backend
  const verifyPayment = async () => {
    try {
      const response = await api.put(`/payments/activate/${paymentId}`);
      toast({ description: "Agendamento efetuado." });
      handlePlan();
      setIsPaymentValid(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao efetuar o agendamento.",
        description: "Seu pagamento é inválido.",
      });
    }
  };

  // 3️ Quando o status e os parâmetros estiverem corretos, registra o pagamento e verifica a ativação
  useEffect(() => {
    if (user?.id) {
      setLoadingUser(false);
    }
  }, [user?.id]);
  useEffect(() => {
    if (loadingUser) return;
    console.log("Validando pagamento:", {
      status,
      paymentId,
      externalReference,
      user,
    });

    if (!status || !paymentId || status !== "approved") {
      console.warn("Parâmetros inválidos! Redirecionando...");
      router.replace("/"); // Redireciona se o pagamento não for válido
      return;
    }

    // Registrar o pagamento no backend
    registerPayment();
  }, [status, paymentId, externalReference, user?.id, loadingUser]);

  // 4️ Verificar se o pagamento foi ativado corretamente e realizar ações após a confirmação
  useEffect(() => {
    if (status === "approved" && paymentId && user?.id && !isPaymentValid) {
      setTimeout(() => {
        verifyPayment(); // Verificar o pagamento no backend após um pequeno delay
      }, 2000);
    }
  }, [status, paymentId, isPaymentValid, user?.id, loadingUser]);

  // 5️ Countdown antes de ativar o plano
  useEffect(() => {
    if (loadingUser) return;
    const interval = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 0) {
      if (isPaymentValid && user?.id) {
        handlePlan();
      } else {
        console.warn("Pagamento inválido! Redirecionando para home...");
        router.replace("/"); // Redireciona se o pagamento não for válido
      }
    }
  }, [count, isPaymentValid, user?.id]);

  // Função para ativar o agendamento
  const handlePlan = async () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const expirationDate = date.toISOString();

    try {
      if (!user?.id) return;
      console.log("Efetuando o agendamento do usuário...");

      await api.post(`/add-agend2?id=${user.id}`, {
        user_id: user.id,
        reserved_date,
        reserved_hours,
        services,
        observation,
      });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setUser({ ...user, reserved_date: [reserved_date] });
      toast({ description: "Agendamento efetuado com sucesso!" });
      router.replace("/"); // Redireciona para a home após sucesso
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erro ao efetuar o agendamento.",
      });
      console.log(error);
    }
  };

  return { count, user, loadingUser, message };
};
