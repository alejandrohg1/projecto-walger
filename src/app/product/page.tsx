"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { getClient } from "../../../api/clientApi";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Client } from "../../../types/client";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import ModalProduct from "../../../components/ModalProduct";
import ModalDelete from "../../../components/ModalDeleteProduct";
import { products } from "../../../faker/faker";
import { Product } from "../../../types/product";

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>(products);
  const [selectedClient, setSelectedClient] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  const columns: ColumnDef<Product>[] = [
    {
      accessorKey: "id",
      header: "Codigo Producto",
    },
    {
      accessorKey: "name",
      header: "Nombre del producto",
    },
    {
      accessorKey: "price",
      header: "Precio",
    },
    {
      accessorKey: "cost",
      header: "Costo",
    },
    {
      accessorKey: "quantity",
      header: "Cantidad",
    },
    {
      accessorKey: "minQuantity",
      header: "Cantidad Minima",
    },
    {
      accessorKey: "maxQuantity",
      header: "Cantidad Maxima",
    },
    {
      accessorKey: "status",
      header: "Estado",
      cell: (info) => (
        <div className='flex justify-center items-center'>
          <h2
            className={
              info.row.original.status ? "text-green-500" : "text-red-500"
            }
          >
            {info.row.original.status ? "Activo" : "Inactivo"}
          </h2>
        </div>
      ),
    },
    {
      accessorKey: "acciones",
      header: "Acciones",
      cell: (info) => (
        <div className='flex justify-center items-center gap-2'>
          <button
            className='bg-blue-500 text-white p-2 rounded-md'
            onClick={() => {
              handleEdit(info.row.original);
            }}
          >
            Editar
          </button>
          <button
            className='bg-red-500 text-white p-2 rounded-md'
            onClick={() => handleDelete(info.row.original)}
          >
            Eliminar
          </button>
        </div>
      ),
    },
  ];

  const table = useReactTable({
    columns: columns,
    data: data,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      globalFilter: filtering,
    },

    onSortingChange: setSorting,
    onGlobalFilterChange: setFiltering,
  });

  useEffect(() => {
    const populateData = async () => {
      const response = await getClient();
      if (!response) return console.log("error");
      setData(response.response);
    };

    populateData();
  }, []);

  const handleEdit = (client: Product) => {
    setSelectedClient(client);
    setIsModalOpen(true);
    setIsEdit(true);
  };

  const handleDelete = (client: Product) => {
    setSelectedClient(client);

    setIsDelete(true);
  };

  return (
    <main className='flex min-h-screen flex-col'>
    
      <div className='p-16'>
        <div className='pb-10 flex gap-5'>
          <Input
            className='max-w-[30rem]'
            type='text'
            placeholder='Buscar Producto'
            value={filtering}
            onChange={(e) => {
              setFiltering(e.target.value);
            }}
          />
          <Button
            variant='default'
            className='bg-sky-900'
            onClick={() => {
              setIsModalOpen(true);
              setIsEdit(false);
            }}
          >
            Añadir Producto
          </Button>
        </div>

        <div>
          <Table>
            <TableCaption>Lista de clientes.</TableCaption>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        className='font-medium text-center'
                        key={header.id}
                      >
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length > 0 ? (
                table.getRowModel().rows?.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className='text-center'>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length}>
                    <div className='flex justify-center'>
                      <p className='text-2xl font-bold'>No hay datos</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
      <ModalProduct
        setClientList={setData}
        clientList={data}
        isEdit={isEdit}
        isModal={isModalOpen}
        client={selectedClient}
        setIsModal={setIsModalOpen}
      />
      <ModalDelete
        setClientList={setData}
        clientList={data}
        client={selectedClient}
        setIsModal={setIsDelete}
        isModal={isDelete}
      />
    </main>
  );
}
