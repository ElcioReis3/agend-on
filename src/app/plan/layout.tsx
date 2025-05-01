import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "Agendamentos",
};

type Props = {
  children: ReactNode;
};
export default function Layout({ children }: Props) {
  return (
    <div>
      <Header />
      <div>{children}</div>
      <Footer />
    </div>
  );
}
