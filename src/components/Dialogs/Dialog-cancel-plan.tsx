import { useEffect, useState } from "react";
import api from "@/services/api";
import { Button } from "../ui/button";
import { AccordionTerms } from "../Accordions/AccordionTerms";
import useUserStore from "@/stores/userStore";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { jsPDF } from "jspdf";

type Props = {
  children: React.ReactNode;
  userId: string;
  asChild?: boolean;
};

export const DialogCancelPlan = ({ asChild, userId, children }: Props) => {
  const { user, setUser } = useUserStore();
  const [isCanceling, setIsCanceling] = useState(false);
  const [refundMessage, setRefundMessage] = useState("");
  const [refundType, setRefundType] = useState<"full" | "partial" | null>(null);

  // Estado do Dialog
  const [openDialog, setOpenDialog] = useState(false);

  const calculateRefundType = (subscriptionDate: string) => {
    const currentDate = new Date();
    const subscriptionDateObj = new Date(subscriptionDate);
    const diffTime = currentDate.getTime() - subscriptionDateObj.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays <= 7) {
      setRefundMessage(
        "Caso cancele sua assinatura agora, você receberá o reembolso integral."
      );
      setRefundType("full");
    } else if (diffDays <= 15) {
      setRefundMessage(
        "Caso cancele sua assinatura agora, você receberá o reembolso parcial."
      );
      setRefundType("partial");
    } else {
      setRefundMessage("Você não tem direito a reembolso. O prazo já expirou.");
      setRefundType(null);
    }
  };

  const generatePDF = (message: string) => {
    const doc = new jsPDF();

    doc.setFont("helvetica");
    doc.setFontSize(18);
    doc.text("Comprovante de Cancelamento", 20, 20);

    doc.setFontSize(12);
    doc.text(message, 20, 40);

    doc.save("comprovante_cancelamento.pdf");
  };

  async function cancelSubscription() {
    if (!user?.subscriptionDate) {
      toast({
        title: "Erro",
        description: "❌ Data de assinatura não encontrada.",
        variant: "destructive",
      });
      return;
    }

    if (!refundType) {
      toast({
        title: "Aviso",
        description: "⚠️ Nenhum reembolso disponível para esta assinatura.",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsCanceling(true);
      const response = await api.post("/cancel-subscription", {
        user_id: userId,
        refund_type: refundType,
      });

      const successMessage = `✅ Cancelamento realizado com sucesso!\n\n${response.data.refundDetails}`;

      toast({
        title: "Sucesso",
        description: successMessage,
        variant: "default",
      });
      // Gerar PDF
      generatePDF(successMessage);

      setUser({ ...user, subscriptionDate: undefined });
    } catch (error) {
      console.error("Erro ao cancelar assinatura:", error);
      toast({
        title: "Erro",
        description: "❌ Erro ao cancelar assinatura. Tente novamente.",
        variant: "destructive",
      });
    } finally {
      setIsCanceling(false);
    }
  }

  useEffect(() => {
    if (user?.subscriptionDate) {
      calculateRefundType(user.subscriptionDate);
    }
  }, [user?.subscriptionDate]);

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog} modal={true}>
        <DialogTrigger asChild={asChild}>{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              Tem certeza que deseja cancelar sua assinatura?
            </DialogTitle>
            <DialogDescription className="text-red-500">
              {refundMessage}
            </DialogDescription>
          </DialogHeader>

          <div className="my-3 text-sm">
            <div>Conforme descrito nos nossos termos.</div>
            <AccordionTerms />
          </div>

          <Button onClick={cancelSubscription} disabled={isCanceling}>
            {isCanceling ? "Cancelando..." : "Cancelar Assinatura"}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
};
