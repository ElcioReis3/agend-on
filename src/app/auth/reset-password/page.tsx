"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import api from "@/services/api";
import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "@/hooks/use-toast";

const formSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "A confirmação de senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

interface ResetPasswordForm {
  password: string;
  confirmPassword: string;
}

const Page = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);

  const form = useForm<ResetPasswordForm>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const handleResetPassword = async (values: ResetPasswordForm) => {
    setIsLoading(true);

    try {
      const response = await api.post("reset-password", {
        token,
        password: values.password,
      });
      toast({
        title: "Recuperação da sua senha",
        description: response.data.message,
      });
      router.push("/auth/signin");
    } catch (error: any) {
      console.error("Erro ao redefinir a senha:", error);
      alert(error.response?.data?.message || "Erro ao redefinir a senha.");
    } finally {
      setIsLoading(false);
    }
  };

  const SearchParamsWrapper = () => {
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    if (token) {
      setToken(token);
    }
    return null;
  };

  return (
    <div className="w-full max-w-xl m-auto my-32 flex flex-col items-center px-3">
      <div className="text-yellowMark font-semibold md:text-xl mb-7">
        Redefinir senha
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <SearchParamsWrapper />
      </Suspense>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleResetPassword)}
          className="space-y-3 md:w-96"
        >
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nova Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Digite sua nova senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirme sua Senha</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Confirme sua nova senha"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full bg-black text-white"
            disabled={isLoading}
          >
            {isLoading ? "Redefinindo..." : "Redefinir Senha"}
          </Button>
        </form>
      </Form>
    </div>
  );
};
export default Page;
