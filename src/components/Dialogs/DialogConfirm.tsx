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
  confirm: () => void;
};

export const DialogConfirm = ({ children, confirm }: Props) => {
  return (
    <Dialog>
      <DialogTrigger>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que deseja isso?</DialogTitle>
          <DialogDescription>Essa ação não tem mais volta.</DialogDescription>
        </DialogHeader>
        <div>
          <Button onClick={confirm}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
