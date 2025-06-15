import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React from "react";
import { Button } from "../ui/button";

type Props = {
  children: React.ReactNode;
  contentArea?: React.ReactNode;
  confirm: () => void;
};

export const DialogPersonalized = ({
  children,
  confirm,
  contentArea,
}: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent className="">
        <DialogHeader>
          <DialogTitle>Edite as informações como desejar.</DialogTitle>
          <DialogDescription>
            Permite que você edite as informações.
          </DialogDescription>
        </DialogHeader>
        <div className="flex flex-col gap-1">{contentArea}</div>
        <Button className="w-full" onClick={confirm}>
          Confirmar mudanças
        </Button>
      </DialogContent>
    </Dialog>
  );
};
