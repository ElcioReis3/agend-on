"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import api from "@/services/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.string().email({ message: "E-mail invalido" }),
});

const Page = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      const response = await api.post("/forgotpassword", {
        email: values.email,
      });
      toast({
        title: response.data.message,
        description: "Verifique na Caixa de Entrada E/ou SPAM do seu e-mail",
      });
      router.push("/");
    } catch (error) {
      console.error("Erro ao enviar e-mail de recuperação", error);
      alert("Ocorreu um erro. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-xl m-auto my-32 flex flex-col items-center px-3">
      <div className="text-yellowMark font-semibold md:text-xl mb-7">
        Redefinição de senha
      </div>
      <div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-3 md:w-96"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Digite seu E-mail</FormLabel>
                  <FormControl>
                    <Input placeholder="e-mail" {...field} />
                  </FormControl>
                  <FormDescription className="text-sm">
                    Vamos enviar um link para redefinicação da sua senha.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full m-auto bg-black text-white"
              disabled={isLoading}
            >
              {isLoading ? "Enviando" : "RECUPERAR"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};
export default Page;
