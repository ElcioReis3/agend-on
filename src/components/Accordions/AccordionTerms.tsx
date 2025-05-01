import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export const AccordionTerms = () => {
  const logoName: string = "Nome da sua empresa";
  const localName: string = "Caxias/MA";

  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Leia os termos</AccordionTrigger>
        <AccordionContent className="">
          <div className="h-96 overflow-y-scroll">
            <h1>
              <strong className="text-colorMark">
                TERMO DE SERVIÇO E POLÍTICA DE AGENDAMENTO
              </strong>
            </h1>
            <p>
              <strong className="text-colorMark">OBJETIVO DO TERMO</strong>
            </p>
            <p>
              Este termo tem como objetivo regular a relação entre "{logoName}"
              e o cliente dos agendamentos oferecidos, estabelecendo direitos,
              deveres e condições para a prestação dos serviços.
            </p>
            <br />
            <h2>
              <strong className="text-colorMark">
                DOS SERVIÇOS DE AGENDAMENTO
              </strong>
            </h2>
            <p>
              A empresa oferece um sistema de agendamento online para a
              prestação de serviços, permitindo que os clientes reservem
              horários conforme a disponibilidade do prestador.
            </p>
            <br />
            <h3>
              <strong className="text-colorMark">
                DIREITO DE ARREPENDIMENTO
              </strong>
            </h3>
            <p>
              Conforme o Artigo 49 do Código de Defesa do Consumidor, para
              contratações realizadas fora do estabelecimento comercial (site ou
              aplicativo), o cliente tem o direito de arrependimento no prazo de
              até 7 (sete) dias corridos, contados a partir da data da
              contratação ou do primeiro uso do serviço. Neste caso, o reembolso
              será integral e deverá ser solicitado pelo cliente através dos
              canais oficiais de atendimento.
            </p>
            <br />
            <h3>
              <strong className="text-colorMark">
                POLÍTICA DE CANCELAMENTO E REEMBOLSO
              </strong>
            </h3>
            <h4>
              <strong>4.1. Cancelamento com antecedência mínima</strong>
            </h4>
            <p>
              Caso o cliente decida cancelar o agendamento com até 1 (uma) hora
              de antecedência, será reembolsado 100% (cem por cento) do valor
              pago pelo agendamento. O pedido de cancelamento deve ser
              formalizado através dos canais oficiais de atendimento.
            </p>
            <br />
            <h4>
              <strong>4.2. Cancelamento tardio</strong>
            </h4>
            <p>
              Caso o cancelamento ocorra após 1 hora de antecedência, não haverá
              reembolso do valor pago, exceto em casos de falha do prestador.
            </p>
            <br />
            <h4>
              <strong>4.3. Forma de Reembolso</strong>
            </h4>
            <p>
              Em casos de cancelamento com direito a reembolso, a devolução será
              realizada exclusivamente de forma digital pelo sistema e/ou
              presencial na sede da empresa, mediante apresentação de documento
              de identidade e comprovação de pagamento.
            </p>
            <br />
            <h3>
              <strong className="text-colorMark">
                POLÍTICA DE REAGENDAMENTO
              </strong>
            </h3>
            <p>
              O cliente poderá reagendar o serviço sem custo adicional desde que
              a solicitação seja feita com até 1 hora de antecedência.
              Reagendamentos solicitados com menos de 1 hora de antecedência
              estarão sujeitos a cobrança adicional ou perda do valor pago.
            </p>
            <br />
            <h3>
              <strong className="text-colorMark">
                CANCELAMENTO PELO PRESTADOR
              </strong>
            </h3>
            <p>
              Caso a empresa precise cancelar o agendamento por qualquer motivo,
              o cliente terá as seguintes opções:
            </p>
            <ul>
              <li>✔️ Reembolso total do valor pago.</li>
              <li>✔️ Reagendamento sem custo adicional.</li>
            </ul>
            <br />
            <h3>
              <strong className="text-colorMark">
                POLÍTICA DE NÃO COMPARECIMENTO (NO-SHOW)
              </strong>
            </h3>
            <p>
              Caso o cliente não compareça ao agendamento sem aviso prévio, o
              valor pago não será reembolsado. Para evitar a perda do
              agendamento, o cliente deve solicitar o reagendamento com
              antecedência mínima de 1 hora.
            </p>
            <br />
            <h2>
              <strong className="text-colorMark">DISPOSIÇÕES GERAIS</strong>
            </h2>
            <p>
              6.1. Ao contratar um agendamento, o cliente declara estar ciente e
              de acordo com todas as condições estabelecidas neste termo.
            </p>
            <br />
            <p>
              6.2. Nossa empresa se reserva o direito de alterar as condições
              dos serviços e deste termo, mediante aviso prévio aos clientes.
            </p>
            <br />
            <p>
              6.3. Para dirimir eventuais dúvidas ou controvérsias oriundas
              deste termo, fica eleito o foro da comarca de {localName}, com
              renúncia expressa a qualquer outro, por mais privilegiado que
              seja.
            </p>
            <br />
            <p>
              <strong className="text-colorMark">
                {logoName} | Data de atualização 28/02/2025.
              </strong>
            </p>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
