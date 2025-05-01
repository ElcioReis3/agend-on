"use client";
import { SessionProvider } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const LayoutClient = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();

  useEffect(() => {
    router.prefetch("/plan");
    router.prefetch("/about");
  }, []);

  return <SessionProvider>{children}</SessionProvider>;
};

export default LayoutClient;
