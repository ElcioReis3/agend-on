"use client";

import { Logo } from "@/components/logo";
import { ThemeToggle } from "@/components/theme-toggle";
import Link from "next/link";
import { MenuSheet } from "./menuSheet";
import useUserStore from "@/stores/userStore";
import { useUserData } from "@/hooks/useUserData";

export const Header = () => {
  const { loading } = useUserData(); // Recebe o loading
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
