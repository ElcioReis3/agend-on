"use client";
import { useRouter } from "next/navigation";
import { ButtonLink } from "./ButtonLink";
import { useEffect } from "react";

export const Banner = () => {
  const router = useRouter();
  useEffect(() => {
    router.prefetch("/plan");
  }, []);
  return (
    <div className="w-full h-min p-3">
      <div className="w-full max-w-3xl m-auto flex flex-col items-center">
        <img src="/images/banner.png" alt="banner" />
        <ButtonLink routerIn="/plan">CONHEÇA NOSSOS SERVIÇOS</ButtonLink>
      </div>
    </div>
  );
};
