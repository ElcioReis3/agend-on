"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useToast } from "@/hooks/use-toast";
import api from "@/services/api";
import useServiceStore from "@/stores/serviceStore";
import { ServiceType } from "@/types/servicesType";
import { getServices } from "@/services/getServices";

type Props = {
  children: React.ReactNode;
};

const formSchema = z.object({
  title: z.string().min(3, { message: "Deve conter no mínimo 3 caracteres" }),
  description: z.string({ message: "Este campo é obrigatório!" }),
  temp: z.preprocess(
    (val) => Number(val),
    z.number({ message: "Adicione um tempo válido!" })
  ),
  price: z.preprocess(
    (val) => Number(val),
    z.number({ message: "Adicione um valor válido!" })
  ),
});

export const DialogAddServices = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const { setServices } = useServiceStore((state) => state);

  useEffect(() => {
    getServicesApi();
  }, [setServices]);

  const getServicesApi = async () => {
    const servicesData: ServiceType[] = await getServices();
    setServices(servicesData);
  };

  const { toast } = useToast();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      temp: 0,
      price: 0,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const response = await api.post("/add-service", values);
      if (response.status === 200) {
        toast({
          title: `OK!`,
          description: response.data.message,
        });
        getServicesApi();
        setIsOpen(false);
      }
    } catch (error: any) {
      toast({
        title: "Erro ao criar serviço.",
        description:
          error.response?.data?.message || error.message || "Erro inesperado.",
      });
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild onClick={() => setIsOpen(true)}>
        {children}
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Serviço</DialogTitle>
          <DialogDescription>{"Conteúdo"}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Título</FormLabel>
                  <FormControl>
                    <Input placeholder="Título do serviço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Descrição</FormLabel>
                  <FormControl>
                    <Input placeholder="Descrição do serviço" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="temp"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tempo</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Valor do serviço"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit">Adicionar</Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
