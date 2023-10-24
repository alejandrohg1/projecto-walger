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

  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";



interface Props {
  data: any;
  columns: any;
}


export default function BasicTable({ data, columns}: Props) {

  
 

  const [filtering, setFiltering] = useState("");
  const [sorting, setSorting] = useState<SortingState>([]);

  
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
  
    </main>
  );
}
