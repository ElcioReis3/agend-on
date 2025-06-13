"use client";
import { Logo } from "@/components/Layout/logo";
import { useUserData } from "@/hooks/useUserData";
import useUserStore from "@/stores/userStore";
import { ThemeToggle } from "../theme-toggle";
import { MenuSheet } from "../menuSheet";
import Link from "next/link";

export const Header = () => {
  const { loading } = useUserData();
  const user = useUserStore((state) => state.user);
  return (
    <header className="w-full h-32 bg-muted bg-blend-difference">
      <div className="w-full max-w-3xl p-4 m-auto flex items-center justify-between">
        <Logo />
        <div className="flex flex-wrap justify-end gap-3 items-center font-semibold">
          <ThemeToggle />
          {loading ? (
            <span className="animate-pulse">Carregando...</span>
          ) : user ? (
            <MenuSheet />
          ) : (
            <Link href="/auth/signin">ENTRAR</Link>
          )}
        </div>
      </div>
    </header>
  );
};
