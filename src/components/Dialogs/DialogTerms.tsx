"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Checkbox } from "../ui/checkbox";
import { useState } from "react";
import api from "@/services/api";
import useUserStore from "@/stores/userStore";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { AccordionTerms } from "../Accordions/AccordionTerms";
import { CalendarClient } from "../Category/Calendar-category/CalendarClient";
import { ServiceType } from "@/types/servicesType";
type Props = {
  children: React.ReactNode;
  item: ServiceType;
};
export const DialogTerms = ({ children, item }: Props) => {
  const { toast } = useToast();
  const { user, setUser } = useUserStore((state) => state);
  const router = useRouter();
  const [isChecked, setIsChecked] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (checked: boolean) => {
    setIsChecked(checked);
  };

  const handlePayment = async (title: string, price: number, desc: string) => {
    if (user?.role !== "ADMIN") {
      toast({
        variant: "destructive",
        autoFocus: true,
        title: "Você é um administrador!!!",
        description: "As assinaturas só são válidas para usuários comuns.",
      });
      return;
    }
    if (!user) {
      toast({
        variant: "destructive",
        autoFocus: true,
        title: "Faça o login!!!",
        description: "É necessário que acesse com email e senha.",
      });
      router.replace("/auth/signin");
      return;
    }
  };
  const handleCalendar = () => {
    setIsOpen(true);
  };

  return (
    <>
      <Dialog
        onOpenChange={(open) => {
          if (!open) setIsOpen(false);
        }}
      >
        <DialogTrigger className="w-full">{children}</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {`${
                isOpen === true
                  ? "Escolha a Data & Horário!"
                  : "Você deseja realmente continuar?"
              }`}
            </DialogTitle>
            <DialogDescription>
              {`${
                isOpen === true
                  ? "Escolha o dia e horário para agendamento de sua preferência."
                  : "Continue para selecionar a data e horário."
              }`}
            </DialogDescription>
            {!isOpen && (
              <>
                <div className="items-top flex space-x-2 text-left">
                  <Checkbox
                    id="terms1"
                    checked={isChecked}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <div className="grid gap-1.5 leading-none">
                    <label
                      htmlFor="terms1"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Aceite os termos e condições
                    </label>
                    <AccordionTerms />
                    <p className="text-sm text-muted-foreground">
                      Você concorda com nossos Termos de Serviço e Política de
                      Privacidade.
                    </p>
                  </div>
                </div>
                <Button
                  className="w-full"
                  onClick={handleCalendar}
                  disabled={!isChecked}
                >
                  Continuar
                </Button>
              </>
            )}
            {isOpen && (
              <div className="w-min m-auto my-7">
                <CalendarClient item={item} />
              </div>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};
