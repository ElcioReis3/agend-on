"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const TablePrice = () => {
  return (
    <Table className="w-full max-w-xl m-auto p-3 font-semibold my-7">
      <TableHeader>
        <TableRow className="h-20 text-base md:text-base lg:text-xl">
          <TableHead>Serviços</TableHead>
          <TableHead className="text-right">Preços</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {/* {Services.map((item, index) => (
          <TableRow key={index} className="text-sm md:text-base lg:text-xl">
            <TableCell className="flex items-center gap-1">
              {" "}
              <img src="/images/logo.png" alt="" className="h-12" />
              {item.description}
            </TableCell>
            <TableCell className="text-right">{item.price}</TableCell>
          </TableRow>
        ))} */}
      </TableBody>
    </Table>
  );
};
