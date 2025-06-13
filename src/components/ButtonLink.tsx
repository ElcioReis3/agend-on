"use client";
import { ReactNode } from "react";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

type Props = {
  children: ReactNode;
  routerIn: string;
};

export const ButtonLink = ({ children, routerIn }: Props) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(routerIn);
  };
  return <Button onClick={handleClick}>{children}</Button>;
};
