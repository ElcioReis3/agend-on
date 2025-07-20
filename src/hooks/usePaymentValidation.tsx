"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/services/api";
import useUserStore from "@/stores/userStore";
import { useToast } from "./use-toast";
import { useQueryClient } from "@tanstack/react-query";
import useAppointmentTempStore from "@/stores/useAppointTempState";

export const usePaymentValidation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");

  const { user } = useUserStore((state) => state);
  const dataAgend = useAppointmentTempStore((state) => state.dataAgend);
  const clear = useAppointmentTempStore((state) => state.clear);
  const [count, setCount] = useState(30);
  const [isPaymentValid, setIsPaymentValid] = useState(false);

  // 1️ Função para registrar o pagamento no backend
  const registerPayment = async () => {
    try {
      if (!paymentId || !status) {
        console.warn("Dados inválidos para registro de pagamento");
        router.replace("/");
        return;
      }
      const response = await api.post("/payments/webhook", {
        payment_id: paymentId,
        status,
        user_id: user?.id,
      });
      console.log("Pagamento registrado:", response.data);
    } catch (error) {
      console.warn("Erro ao registrar pagamento:", error);
      router.replace("/"); // Redireciona em caso de erro
    }
  };

  // 2️ Função para verificar o pagamento no backend
  const verifyPayment = async () => {
    try {
      await api.put(`/payments/activate/${paymentId}`);
      toast({ description: "Pagamento efetuado com sucesso!" });
      handlePlan();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro - Pagamento existente!",
        description: "Seu pagamento é inválido.",
      });
    }
  };

  // 3️ Quando o status e os parâmetros estiverem corretos, registra o pagamento e verifica a ativação
  useEffect(() => {
    if (!status || !paymentId || status !== "approved") {
      console.warn("Parâmetros inválidos! Redirecionando...");
      router.replace("/"); // Redireciona se o pagamento não for válido
      return;
    }
    // Registrar o pagamento no backend
    registerPayment();
  }, [status, paymentId, externalReference, user?.id]);

  // 4️ Verificar se o pagamento foi ativado corretamente e realizar ações após a confirmação
  useEffect(() => {
    if (status === "approved" && paymentId && user?.id && !isPaymentValid) {
      setTimeout(() => {
        verifyPayment(); // Verificar o pagamento no backend após um pequeno delay
      }, 3000);
    }
  }, [status, paymentId, isPaymentValid, user?.id, dataAgend?.services]);

  // 5️ Countdown antes de ativar o plano
  useEffect(() => {
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
        router.replace("/");
      }
    }
  }, [count, isPaymentValid, user?.id, dataAgend?.services]);

  const convertDateToISO = (dateStr: string) => {
    const [day, month, year] = dateStr.split("/");
    return `${year}-${month}-${day}`;
  };

  // Função para ativar o plano
  const handlePlan = async () => {
    try {
      const temp = localStorage.getItem("appointment-temp");
      if (!temp) return;

      const parsed = JSON.parse(temp);
      const dataAgend = parsed?.state?.dataAgend;
      if (!dataAgend || !user?.id) return;
      const reserved_date_iso = convertDateToISO(dataAgend.reserved_date);

      await api.post("/add-agend", {
        id_user: user.id,
        services: [dataAgend.services],
        reserved_date: reserved_date_iso,
        reserved_hours: dataAgend.reserved_hours,
        observation: dataAgend.observation,
      });

      await queryClient.invalidateQueries({ queryKey: ["users"] });
      toast({ title: "Agendamento concluído com sucesso!" });
      clear();
      router.replace("/"); // Redireciona para a home após sucesso
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erro ao efetuar agendamento.:",
      });
      console.log(error);
    }
  };

  return { count, user };
};
