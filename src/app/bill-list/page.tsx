"use client";
import React, { useEffect, useState } from "react";
import BasicTable from "../../../components/ui/BasicTable";
import { ColumnDef } from "@tanstack/react-table";
import { Bill } from "../../../types/Bill";
import axios from "axios";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import ModalGeneric from "../../../components/ui/ModalGeneric";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function BillList() {
  const [data, setData] = useState<Bill[]>([]);
  const [isModal, setIsModal] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("https://localhost:7219/api/bills");

      setData(response.data.sort((a: Bill, b: Bill) => a.id - b.id));
    };
    fetchData();
  }, []);

 

  const columns: ColumnDef<Bill>[] = [
    {
      accessorKey: "id",
      header: "Id Factura",
    },
    {
      accessorKey: "details",
      header: "Detalles de la factura",
      cell: (info) => (
        <Button
          variant={"default"}
          className='gap-2'
          onClick={() => {
            setIsModal(true);
            setSelectedBill(info.row.original);
          }}
        >
          <Eye />
          Ver detalles
        </Button>
      ),
    },
    {
      accessorKey: "total",
      header: "Total de la factura",
    },
  ];

  return (
    <div>
      <BasicTable data={data} columns={columns} />
      <ModalGeneric
        title='Datos de la factura'
        description='Productos vendidos'
        isModal={isModal}
        setIsModal={setIsModal}
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>Nombre del producto</TableHead>
              <TableHead>Precio Vendido</TableHead>
              <TableHead>Cantidad Vendida</TableHead>
              <TableHead className='text-right'>Subtotal</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {selectedBill?.details.map((item) => (
              <TableRow key={item?.product.productId}>
                <TableCell className='font-medium '>
                  {item?.product.name}
                </TableCell>
                <TableCell>{item?.product?.price}</TableCell>
                <TableCell>{item?.quantity}</TableCell>
                <TableCell className='text-center'>{item?.subtotal}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ModalGeneric>
    </div>
  );
}

export default BillList;
