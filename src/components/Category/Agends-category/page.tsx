import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { RefreshCwIcon } from "lucide-react";
import { useEffect } from "react";

export const TableAgends = () => {
  /* const { agends, setAgends } = useClientsStore((state) => state);

  const handleListAgends = async () => {
    const list = await getAgends();
    setAgends(list);
  };
  useEffect(() => {
    handleListAgends();
  }, [setAgends]); */

  return (
    <div>
      <RefreshCwIcon className="cursor-pointer text-muted-foreground active:animate-spin" />
      <Table>
        <TableCaption>Lista completa de Agendamentos.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Data</TableHead>
            <TableHead>Serviço</TableHead>
            <TableHead>Pessoa</TableHead>
            <TableHead>Valor</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">11/05/2025</TableCell>
            <TableCell>Serviço 1</TableCell>
            <TableCell>Pessoa 1</TableCell>
            <TableCell>50,00</TableCell>
            <TableCell className="text-right">Concluídos</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};
