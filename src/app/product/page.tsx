"use client";

import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
import ModalDelete from '../../../components/ModalDeleteProduct';
import { Product } from "../../../types/product";
import { GetProduct } from "../../../api/product";

export default function ProductsPage() {
  const [data, setData] = useState<Product[]>([]);
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
      accessorKey: "deleted",
      header: "Estado",
      cell: (info) => (
        <div className='flex justify-center items-center'>
          <h2
            className={
              info.row.original.status ? "text-red-500" : "text-green-500"
            }
          >
            {info.row.original.status ? "Inactivo" : "Activo" }
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
      const response = await GetProduct();
      if (!response) return console.log("error");
      console.log(response);
      setData(response);
    };

    populateData();
  }, []);

  const populateData = async () => {
    const response = await GetProduct();
    if (!response) return console.log("error");
    console.log(response);
    setData(response);
  };

  const handleAddProduct = () => {
    setIsModalOpen(true);
    setIsEdit(false);
  };

  const handleEdit = (client: Product) => {
    setSelectedClient(client);
    setIsModalOpen(true);
    setIsEdit(true);
  };

  const handleEditClose = () => {
    setIsModalOpen(false);
    setIsEdit(false);
    populateData();
  }

  const handleDelete = (client: Product) => {
    setSelectedClient(client);

    setIsDelete(true);
  };

  const handleDeleteClose = () => {
    setIsDelete(false);
  }

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
            onClick={handleAddProduct}
          >
            Añadir Producto
          </Button>
        </div>

        <div>
          <Table>
            <TableCaption>Lista de Productos.</TableCaption>
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
        isEdit={isEdit}
        isModal={isModalOpen}
        product={selectedClient}
        handleEditProductClose={handleEditClose}
      />
      <ModalDelete
        product={selectedClient}
        isModal={isDelete}
        handleDeleteProductClose={handleDeleteClose}
      />
    </main>
  );
}
