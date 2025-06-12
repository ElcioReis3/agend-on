import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getUsers } from "@/services/getApi";
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
      <Table className="text-sm">
        <TableCaption className="mt-1">
          Lista completa de clientes.
        </TableCaption>
        <TableHeader>
          <TableRow className="h-8">
            <TableHead className="w-40 px-2 py-2">Nome</TableHead>
            <TableHead className="w-28 px-2 py-2">E-mail</TableHead>
            <TableHead className="px-2 py-2">Endereço</TableHead>
            <TableHead className="text-right px-2 py-2">Telefone</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {clients.map((client) => (
            <TableRow key={client.id} className="h-8">
              <TableCell className="font-medium px-2 py-2">
                {client.name.split(" ").slice(0, 2).join(" ")}
              </TableCell>
              <TableCell className="px-1 py-2 max-w-28 truncate">
                {client.email}
              </TableCell>
              <TableCell className="px-2 py-2">{client.address}</TableCell>
              <TableCell className="text-right px-2 py-2">
                {client.phone}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};
