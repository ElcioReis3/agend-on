"use client";
import { DialogPersonalized } from "@/components/Dialogs/Dialog-personalized";
import { DialogAddServices } from "@/components/Dialogs/DialogAddServices";
import { DialogConfirm } from "@/components/Dialogs/DialogConfirm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { ServiceType } from "@/types/servicesType";
import { SquarePen, Trash } from "lucide-react";
import { useEffect, useState } from "react";

export const TableServices = () => {
  const { services, setServices } = useServiceStore((state) => state);
  const { toast } = useToast();
  const [editedService, setEditedService] = useState<ServiceType | null>(null);

  useEffect(() => {
    const handleList = async () => {
      const listService = await getServices();
      setServices(listService);
    };

    handleList();
  }, [setServices]);

  const handleDeleteService = async (id: string) => {
    try {
      const response = await api.delete(`delete-service/${id}`);
      toast({
        title: "OK, deletado com sucesso!",
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
  const handlePersonalized = async (id: string, data: ServiceType) => {
    console.log("id", id, "data", data);
    if (!editedService) return;
    try {
      const response = await api.put(`update-service/${id}`, data);
      toast({
        title: "OK, Modificações efetuadas com sucesso!",
        description: response.data.message,
      });
      //setServices({...services,response.data.updateService});
    } catch (error: any) {
      console.log(error);
      toast({
        title: "Erro ao modificar os dados.",
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
                  <DialogPersonalized
                    confirm={() =>
                      editedService &&
                      handlePersonalized(editedService.id, editedService)
                    }
                    contentArea={
                      editedService && (
                        <div className="flex flex-col gap-1">
                          <Label>
                            Título
                            <Input
                              className="w-full mt-1"
                              value={editedService.title}
                              onChange={(e) =>
                                setEditedService({
                                  ...editedService,
                                  title: e.target.value,
                                })
                              }
                            />
                          </Label>
                          <Label>
                            Descrição
                            <Input
                              className="w-full mt-1"
                              value={editedService.description}
                              onChange={(e) =>
                                setEditedService({
                                  ...editedService,
                                  description: e.target.value,
                                })
                              }
                            />
                          </Label>
                          <div className="w-full flex gap-3 mt-1">
                            <Label>
                              Duração{" "}
                              <Input
                                className="w-full mt-1"
                                type="number"
                                value={editedService.temp}
                                onChange={(e) =>
                                  setEditedService({
                                    ...editedService,
                                    temp: Number(e.target.value),
                                  })
                                }
                              />
                            </Label>
                            <Label>
                              Preço{" "}
                              <Input
                                className="w-full mt-1"
                                type="number"
                                value={editedService.price}
                                onChange={(e) =>
                                  setEditedService({
                                    ...editedService,
                                    price: Number(e.target.value),
                                  })
                                }
                              />
                            </Label>
                          </div>
                        </div>
                      )
                    }
                  >
                    <SquarePen
                      className="cursor-pointer"
                      onClick={() => setEditedService({ ...service })}
                    />
                  </DialogPersonalized>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};
