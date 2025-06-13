"use client";
import { Footer } from "@/components/Layout/footer";
import { Header } from "@/components/Layout/header";
import useUserStore from "@/stores/userStore";
import { CircleX } from "lucide-react";
import { useEffect, useState } from "react";

const PaymentFailure = () => {
  let [count, setCount] = useState(10);
  const { user } = useUserStore((state) => state);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => Math.max(prev - 1, 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <>
      <Header />
      <div className="w-full max-w-xl min-h-96 m-auto my-7 flex flex-col justify-center items-center text-center p-3">
        <div className="text-xl">Desculpe, {user?.name}</div>
        <div className="text-red-400">Seu Pagamento foi Recusado!</div>
        <CircleX className="text-red-400" />
        {count > 0 && (
          <div className="text-xs text-muted-foreground space-x-3 mt-7">
            <span>Aguarde só um instate e tente novamente</span>
            <span>{count}</span>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default PaymentFailure;
