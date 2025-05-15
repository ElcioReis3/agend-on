import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/services/getUser";
import useClientsStore from "@/stores/useClientsStore";
import { RefreshCwIcon } from "lucide-react";
import { useEffect } from "react";

export const TableClients = () => {
  const { clients, setClients } = useClientsStore((state) => state);

  const handleListClients = async () => {
    const list = await getUsers();
    setClients(list);
  };
  useEffect(() => {
    handleListClients();
  }, [setClients]);

  return (
    <div className="min-h-96">
      <RefreshCwIcon
        className="cursor-pointer text-muted-foreground active:animate-spin"
        onClick={handleListClients}
      />
      <Table>
        <TableCaption>Lista completa de clientes.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Nome</TableHead>
            <TableHead>E-mail</TableHead>
            <TableHead>Endereço</TableHead>
            <TableHead className="text-right">Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id}>
              <TableCell className="font-medium">
                {client.name.split(" ").slice(0, 2).join(" ")}
              </TableCell>
              <TableCell>{client.email}</TableCell>
              <TableCell>{client.address}</TableCell>
              <TableCell className="text-right">{client.phone}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
