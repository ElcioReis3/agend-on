import { Footer } from "@/components/Layout/footer";
import { Logo } from "@/components/Layout/logo";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Autentificação",
};

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div>
      <div className="bg-gray-400 w-full h-32 p-4 m-auto flex justify-center">
        <Logo />
      </div>
      <div>{children}</div>
      <Footer />
    </div>
  );
}
