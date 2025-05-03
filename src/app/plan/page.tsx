"use client";
import { DialogTerms } from "@/components/Dialogs/DialogTerms";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableRow,
} from "@/components/ui/table";
import { getServices } from "@/services/getServices";
import useServiceStore from "@/stores/serviceStore";
import { useEffect } from "react";

const Page = () => {
  const { services, setServices } = useServiceStore((state) => state);

  useEffect(() => {
    const handleList = async () => {
      const list = await getServices();
      setServices(list);
    };
    handleList();
  }, [setServices]);

  return (
    <div className="w-full max-w-5xl grid grid-cols-3 gap-2 justify-center items-center my-7 m-auto p-3">
      {services.length === 0 && (
        <div className="h-96 flex justify-center items-center">
          <div className="animate-pulse">
            Nenhum serviço disponível no momento.
          </div>
        </div>
      )}
      {services.map((item) => (
        <fieldset
          key={item.id}
          className="w-full h-min max-w-xl border-2 rounded-xl p-3"
        >
          <legend className="px-3 font-bold text-greenMark text-xl">
            {item.title}
          </legend>
          <Table className="max-w-xl m-auto font-semibold">
            <TableBody>
              <TableRow>
                <TableCell>{item.description}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {item.temp}
                  {" min"}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Valor</TableCell>
                <TableCell className="text-right text-colorMark">
                  R$ {item.price.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <DialogTerms item={item}>
            <Button className="w-full">
              Agendar por R${(item.price / 2).toFixed(2)}
            </Button>
          </DialogTerms>
        </fieldset>
      ))}
    </div>
  );
};

export default Page;
