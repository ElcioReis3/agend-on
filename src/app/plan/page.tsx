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
import { getServices } from "@/services/getApi";
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
    <div className="w-full max-w-7xl min-h-96 mx-auto grid gap-4 p-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      {services.length === 0 && (
        <div className="col-span-full h-96 flex justify-center items-center">
          <div className="animate-pulse text-center text-muted-foreground">
            Nenhum serviço disponível no momento.
          </div>
        </div>
      )}

      {services.map((item) => (
        <fieldset
          key={item.id}
          className="w-full h-min max-w-80 border-2 rounded-xl p-4 flex flex-col justify-between m-auto"
        >
          <legend className="px-3 font-bold text-greenMark text-lg sm:text-xl">
            {item.title}
          </legend>

          <Table className="w-full font-semibold border-separate border-spacing-0">
            <TableBody>
              <TableRow className="p-1">
                <TableCell className="p-1 text-sm">
                  {item.description.toLocaleUpperCase()}
                </TableCell>
                <TableCell className="p-1 text-right text-muted-foreground text-sm">
                  {item.temp} min
                </TableCell>
              </TableRow>
              <TableRow className="p-1">
                <TableCell className="p-1 text-sm">Valor</TableCell>
                <TableCell className="p-1 text-right text-colorMark text-sm">
                  R$ {item.price.toFixed(2)}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <DialogTerms item={item}>
            <Button className="w-full mt-2 text-sm sm:text-base">
              Agendar por R${(item.price / 2).toFixed(2)}
            </Button>
          </DialogTerms>
        </fieldset>
      ))}
    </div>
  );
};

export default Page;
