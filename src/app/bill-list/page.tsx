"use client";
import React, { useEffect, useState } from "react";
import BasicTable from "../../../components/ui/BasicTable";
import { ColumnDef } from "@tanstack/react-table";
import { Bill } from "../../../types/Bill";
import axios from "axios";
import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";

function BillList() {
  const [data, setData] = useState<Bill[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios("https://localhost:7219/api/bills");
      console.log(response.data);
      setData(response.data);
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
        <Button variant={"default"} className='gap-2'>
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
    </div>
  );
}

export default BillList;
