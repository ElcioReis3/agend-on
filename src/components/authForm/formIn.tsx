"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "E-mail invalido" }),
  password: z
    .string()
    .min(6, { message: "A senha deve conter no minímo 6 caracteres" }),
});

export function FormIn() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setErrorMessage(null);
    setIsLoading(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: values.email,
      password: values.password,
    });

    if (result?.ok) {
      router.push("/");
      toast({
        title: "Obrigado por acessar!",
      });
    } else {
      setErrorMessage("Email ou senha incorretos!");
      toast({
        title: "Email ou senha incorretos!",
      });
    }
    setIsLoading(false);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-3">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input placeholder="Digite seu e-mail" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  {...field}
                />
              </FormControl>
              <FormMessage />
              <FormDescription>
                <span className="w-full flex gap-1 justify-start text-xs">
                  <Link
                    className="text-card-foreground"
                    href={"/auth/forgot-password"}
                  >
                    Esqueceu a senha?
                  </Link>
                </span>
                <span className="w-full flex gap-1 justify-end text-xs">
                  Não tem login?{" "}
                  <Link className="text-yellowMark" href={"/auth/signup"}>
                    CADASTRAR
                  </Link>
                </span>
              </FormDescription>
            </FormItem>
          )}
        />
        <Button
          type="submit"
          className="w-full m-auto bg-black text-white"
          disabled={isLoading}
        >
          {isLoading ? "Entrando" : "ENTRAR"}
        </Button>
      </form>
    </Form>
  );
}
