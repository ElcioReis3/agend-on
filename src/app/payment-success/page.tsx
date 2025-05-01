"use client";

import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { usePaymentValidation } from "@/hooks/usePaymentValidation";
import { Check } from "lucide-react";
import { Suspense } from "react";

const PaymentSuccessContent = () => {
  const { count, user } = usePaymentValidation();

  return (
    <>
      <Header />
      <div className="w-full max-w-xl min-h-96 m-auto my-7 flex flex-col justify-center items-center text-center p-3">
        <div className="text-xl">Obrigado, {user?.name}</div>
        <div className="text-green-400">Seu Pagamento foi Aprovado!</div>
        <Check className="text-green-400 animate-ping animate-out" />
        {count > 0 && (
          <div className="text-xs text-muted-foreground space-x-3 mt-7">
            <span>Aguarde só um instante</span>
            <span>{count}</span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

// Envolvendo o componente com Suspense
const PaymentSuccess = () => {
  return (
    <Suspense fallback={<div>Carregando informações de pagamento...</div>}>
      <PaymentSuccessContent />
    </Suspense>
  );
};

export default PaymentSuccess;
