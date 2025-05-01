import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CustomerType } from "@/types/customerType";
import React from "react";

type Props = {
  item: CustomerType;
  children: React.ReactNode;
  index: number;
};

export const DialogTable = ({ children, item, index }: Props) => {
  return (
    <Dialog key={index}>
      <DialogTrigger asChild className="cursor-pointer">
        {children}
      </DialogTrigger>
      <DialogContent className="w-full">
        <DialogHeader>
          <DialogTitle>{item.name}</DialogTitle>
          <DialogDescription className="flex flex-col text-xs md:text-sm">
            <span>{item.email}</span>
            <span>{item.phone}</span>
            <span>{item.address}</span>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};
