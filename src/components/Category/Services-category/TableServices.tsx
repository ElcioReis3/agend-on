"use client";
import { DialogAddServices } from "@/components/Dialogs/DialogAddServices";
import { DialogConfirm } from "@/components/Dialogs/DialogConfirm";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import { getServices } from "@/services/getApi";
import useServiceStore from "@/stores/serviceStore";
import { SquarePen, Trash } from "lucide-react";
import { useEffect } from "react";

export const TableServices = () => {
  const { services, setServices } = useServiceStore((state) => state);
  const { toast } = useToast();

  useEffect(() => {
    const handleList = async () => {
      const list = await getServices();
      setServices(list);
    };

    handleList();
  }, [setServices]);

  const handleDeleteService = async (id: string) => {
    try {
      const response = await api.delete(`delete-service/${id}`);
      toast({
        title: "OK!",
        description: response.data.message,
      });
      setServices(response.data.servicesList);
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Erro ao deletar serviço.",
        description: error.message || error.data.message,
      });
    }
  };

  return (
    <div className="min-h-96">
      <DialogAddServices>
        <Button>Adicionar Serviços</Button>
      </DialogAddServices>
      <Table className="text-sm">
        <TableCaption className="mt-1">
          Lista completa de serviços.
        </TableCaption>
        <TableHeader>
          <TableRow className="h-9">
            <TableHead className="w-40 px-2 py-1">Título</TableHead>
            <TableHead className="w-40 px-2 py-1">Descrição</TableHead>
            <TableHead className="w-40 px-2 py-1">Duração</TableHead>
            <TableHead className="w-40 px-2 py-1">Valor</TableHead>
            <TableHead className="w-40 px-2 py-1">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services &&
            services.map((service) => (
              <TableRow key={service.id} className="h-7">
                <TableCell className="font-medium px-1 py-2">
                  {service.title}
                </TableCell>
                <TableCell className="px-1 py-2">
                  {service.description}
                </TableCell>
                <TableCell className="px-1 py-2">{service.temp}min</TableCell>
                <TableCell className="px-1 py-2">
                  {service.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell className="flex gap-1 px-1 py-2">
                  <DialogConfirm
                    confirm={() => handleDeleteService(service.id)}
                  >
                    <Trash className="cursor-pointer" />
                  </DialogConfirm>
                  <SquarePen />
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
