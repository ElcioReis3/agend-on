import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Ellipsis } from "lucide-react";

const PaymentPending = () => {
  return (
    <>
      <Header />
      <div className="w-full max-w-xl min-h-96 m-auto my-7 flex flex-col justify-center items-center text-center p-3">
        <div className="text-xl">Pagamento Pendente</div>
        <div className="text-orange-400 animate-pulse">
          Seu pagamento está pendente.
          <div className="text-xs"> Aguarde a confirmação.</div>
        </div>

        <Ellipsis className="animate-bounce" />
      </div>
      <Footer />
    </>
  );
};

export default PaymentPending;
