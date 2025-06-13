"use client";
import Link from "next/link";
import { Separator } from "../ui/separator";

export const Footer = () => {
  const sendWhatsApp = () => {
    const phone = 5599996452760;
    const message = "Olá, gostaria de saber mais sobre seus serviços!";
    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };
  return (
    <footer className="w-full bg-muted-foreground space-y-3 bg-blend-difference text-accent">
      <Separator />
      <div className="w-full max-w-xl px-3 py-7 grid sm:grid-cols-2 items-center justify-center grid-cols-1 gap-3 m-auto ">
        <div className="text-center sm:text-left">
          <div className="font-semibold">Endereço</div>
          <Link
            href={"https://maps.app.goo.gl/4bNrdzaikoGBm7rF9"}
            className="text-sm underline"
          >
            Rua do Fio, 964 - Caxias| MA
          </Link>
        </div>
        <div className="text-center sm:text-left">
          <div className="font-semibold">Funcionamento</div>
          <div className="text-sm ">
            Seg à Sex: 8:00 | 12:00 às 14:00 | 18:00
          </div>
          <div className="text-sm ">Sábado. 9:00 às 18:00</div>
        </div>
        <div className="text-center sm:text-left">
          <div className="font-semibold">Redes Sociais</div>
          <div className="flex gap-3 text-sm justify-center sm:justify-start">
            <Link
              href={"https://www.instagram.com/elcioreis_cx/?hl=pt-br"}
              target="_blank"
            >
              Instagram
            </Link>
            {"|"}
            <div className="cursor-pointer" onClick={sendWhatsApp}>
              WhatsApp
            </div>
          </div>
        </div>
        <div className="text-center sm:text-left">
          <div className="font-semibold">Saiba mais</div>
          <Link href={"/about"} className="text-sm underline">
            Sobre nosso sistema
          </Link>
        </div>
      </div>
      <Separator />
      <div className="w-full max-w-xl text-center m-auto py-7 ">
        Criado por{" "}
        <Link
          href="https://portifolio-elcio-reis.netlify.app/"
          target="_blank"
          className="font-semibold"
        >
          ElcioServiçosOn
        </Link>
      </div>
    </footer>
  );
};
