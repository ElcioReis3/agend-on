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
import { getServices } from "@/services/getServices";
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
    <div>
      <DialogAddServices>
        <Button>Adicionar Serviços</Button>
      </DialogAddServices>
      <Table>
        <TableCaption>Lista completa de serviços.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Título</TableHead>
            <TableHead>Descrição</TableHead>
            <TableHead>Duração</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead>Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {services &&
            services.map((service) => (
              <TableRow key={service.id}>
                <TableCell className="font-medium">{service.title}</TableCell>
                <TableCell>{service.description}</TableCell>
                <TableCell>{service.temp}min</TableCell>
                <TableCell>
                  {service.price.toLocaleString("pt-BR", {
                    style: "currency",
                    currency: "BRL",
                  })}
                </TableCell>
                <TableCell className="flex gap-1">
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
