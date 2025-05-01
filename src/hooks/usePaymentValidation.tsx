"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import api from "@/services/api";
import useUserStore from "@/stores/userStore";
import { useToast } from "./use-toast";
import { useQueryClient } from "@tanstack/react-query";

export const usePaymentValidation = () => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const status = searchParams.get("status");
  const paymentId = searchParams.get("payment_id");
  const externalReference = searchParams.get("external_reference");

  const { user, setUser } = useUserStore((state) => state);
  const [count, setCount] = useState(10);
  const [isPaymentValid, setIsPaymentValid] = useState(false);

  // 1️ Função para registrar o pagamento no backend
  const registerPayment = async () => {
    try {
      if (!paymentId || !status) {
        console.warn("Dados inválidos para registro de pagamento");
        router.replace("/"); // Redireciona para a home caso falte algum dado
        return;
      }
      const response = await api.post("/payments/webhook", {
        payment_id: paymentId,
        status,
        user_id: user?.id, // Certifique-se de que o user?.id não seja undefined ou null
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
      const response = await api.put(`/payments/activate/${paymentId}`);
      toast({ description: "Plano ativado" });
      handlePlan();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Erro ao atualizar plano",
        description: "Seu pagamento é inválido.",
      });
    }
  };

  // 3️ Quando o status e os parâmetros estiverem corretos, registra o pagamento e verifica a ativação
  useEffect(() => {
    console.log("Validando pagamento:", {
      status,
      paymentId,
      externalReference,
    });

    if (!status || !paymentId || !externalReference || status !== "approved") {
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
      }, 2000); // Delay de 2 segundos
    }
  }, [status, paymentId, isPaymentValid, user?.id]);

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
        router.replace("/"); // Redireciona se o pagamento não for válido
      }
    }
  }, [count, isPaymentValid, user?.id]);

  // Função para ativar o plano
  const handlePlan = async () => {
    const date = new Date();
    date.setDate(date.getDate() + 30);
    const expirationDate = date.toISOString();

    try {
      if (!user?.id) return;
      console.log("Atualizando plano do usuário...");
      await api.put(`/customer?id=${user.id}`, {
        status: true,
        dueDate: expirationDate,
      });
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setUser({ ...user, dueDate: expirationDate });
      toast({ description: "Plano atualizado com sucesso!" });
      router.replace("/"); // Redireciona para a home após sucesso
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Erro ao atualizar plano:",
      });
      console.log(error);
    }
  };

  return { count, user };
};
