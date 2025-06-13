import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { LucideLink } from "lucide-react";
import "@flaticon/flaticon-uicons/css/all/all.css";
import Link from "next/link";
import { Footer } from "@/components/Layout/footer";
import { Location } from "@/components/Layout/location";
import { Header } from "@/components/Layout/header";

export default function Page() {
  return (
    <>
      <Header />
      <div className="w-full h-32 flex justify-center items-center text-xl">
        <div className="font-semibold">Sobre nós</div>
      </div>
      <div className="w-full max-w-3xl m-auto px-3 mb-32">
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger>Sobre nossa Sistema</AccordionTrigger>
            <AccordionContent>
              Oferecemos um atendimento de qualidade, cortes modernos e
              clássicos, barba bem feita e um ambiente descontraído para você
              relaxar.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger>
              <i className="fi fi-rr-globe"> Sobre o site</i>
            </AccordionTrigger>
            <AccordionContent>
              <ul>
                <li>
                  1. Para agendar um horário,{" "}
                  <span className="text-destructive dark:text-ring">
                    é necessário realizar o cadastro na plataforma.
                  </span>
                </li>
                <li>
                  2. Após o cadastro,{" "}
                  <span className="text-destructive dark:text-ring">
                    escolha os serviços, data e horário.
                  </span>
                </li>
                <li>
                  3. O agendamento só efetuado,{" "}
                  <span className="text-destructive dark:text-ring">
                    mediante pagamento parcial do serviço escolhido.
                  </span>
                </li>
                <li>
                  4. No menu lateral,
                  <span className="text-destructive dark:text-ring">
                    {" "}
                    acessado ao clicar no seu nome na parte superior, você
                    encontrará suas informações pessoais
                  </span>
                  .
                </li>
                <li>
                  5. Suas informações de agendamento, data, prazo de
                  cancelamento estarão disponíveis no menu lateral.
                </li>
              </ul>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-3">
            <AccordionTrigger>
              <i className="fi fi-sr-comment-alt"> Relatar um problema</i>
            </AccordionTrigger>
            <AccordionContent>
              <Link
                href={"https://forms.gle/RMUGXP2V6ttp6QVn8"}
                className="text-ring flex underline"
              >
                <LucideLink />
                Formulário
              </Link>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
      <div>
        <Location />
      </div>
      <Footer />
    </>
  );
}
