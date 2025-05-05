import { useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import useUserStore from "@/stores/userStore";
import api from "@/services/api";
import { FormattedDate } from "@/services/formattedDate";
import { Separator } from "../ui/separator";
import { DialogCancelPlan } from "./Dialog-cancel-plan";

type Props = {
  children: React.ReactNode;
};

export const DialogProfile = ({ children }: Props) => {
  const queryClient = useQueryClient();
  const { user, setUser } = useUserStore();

  const [localName, setLocalName] = useState(user?.name || "");
  const [localPhone, setLocalPhone] = useState(user?.phone || "");
  const [localAddress, setLocalAddress] = useState(user?.address || "");

  const [isOpen, setIsOpen] = useState(false);
  const [duesCancel, setDuesCancel] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      const response = await api.put(`/customer?id=${user?.id}`, {
        name: localName,
        phone: localPhone,
        address: localAddress,
      });
      setUser(response.data);
      await queryClient.invalidateQueries({ queryKey: ["users"] });
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao salvar os dados", error);
    }
  };
  const calculateRefundType = (subscriptionDate: string) => {
    const currentDate = new Date();
    const subscriptionDateObj = new Date(subscriptionDate);
    const diffTime = currentDate.getTime() - subscriptionDateObj.getTime();
    const diffDays = diffTime / (1000 * 3600 * 24);

    if (diffDays <= 7) {
      setDuesCancel(
        `Caso se arrependa da sua assinatura, você tem até o dia ${
          subscriptionDateObj.getDate() + 7
        } para cancelá-la com reembolso integral.`
      );
      return "full";
    } else if (diffDays <= 15) {
      setDuesCancel("Você pode cancelar, mas terá um reembolso parcial.");
      return "partial";
    } else {
      setDuesCancel("O prazo para reembolso já expirou.");
      return null;
    }
  };

  useEffect(() => {
    if (user?.subscriptionDate) {
      calculateRefundType(user.subscriptionDate);
    }
  }, [user?.subscriptionDate]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>SUAS INFORMAÇÕES</DialogTitle>
          <DialogDescription>
            Consulte seus dados e edite se necessário.
          </DialogDescription>
        </DialogHeader>
        {user?.id && user?.subscriptionDate && (
          <div className="space-y-2">
            <div>Sobre sua Assinatura</div>
            <div className="text-sm">
              Data da assinatura: {FormattedDate(user.subscriptionDate)}
              <div className="text-xs text-destructive">{duesCancel}</div>
            </div>
            <DialogCancelPlan userId={user.id} asChild>
              <Button>Cancelar Agendamento</Button>
            </DialogCancelPlan>
          </div>
        )}
        <Separator />
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              id="name"
              className="col-span-3"
              value={localName}
              onChange={(e) => setLocalName(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="phone" className="text-right">
              Telefone
            </Label>
            <Input
              id="phone"
              className="col-span-3"
              value={localPhone}
              onChange={(e) => setLocalPhone(e.target.value)}
              disabled={!isEditing}
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="address" className="text-right">
              Endereço
            </Label>
            <Input
              id="address"
              className="col-span-3"
              value={localAddress}
              onChange={(e) => setLocalAddress(e.target.value)}
              disabled={!isEditing}
            />
          </div>
        </div>

        <DialogFooter>
          {!isEditing ? (
            <Button type="button" onClick={() => setIsEditing(true)}>
              Editar
            </Button>
          ) : (
            <Button type="button" onClick={handleSave}>
              Salvar
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
