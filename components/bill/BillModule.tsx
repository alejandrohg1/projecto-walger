"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

import { Button } from "@/components/ui/button";

import BillRowBody from "./BillRowBody";
import { ProductState } from "../../types/product";


interface Props {
  products: ProductState[];
  handleDeleteProduct: (product: ProductState) => void;
  handleEditProduct?: (product: ProductState) => void;
  
}

function BillModule({ products, handleDeleteProduct,handleEditProduct }: Props) {
  const date = new Date().toLocaleDateString();
  const [isAlert, setIsAlert] = useState(false);

  const handleBuy = () => {
    setIsAlert(true);
  };

  return (
    <div className='p-10 w-full  '>
      <h2 className='text-2xl font-medium'> Factura </h2>
      <h3 suppressHydrationWarning>{date}</h3>
      {isAlert && (
        <Alert className='mt-5'>
          <AlertTitle className='flex justify-between'>
            Compra Realizada
            <button onClick={() => setIsAlert(!isAlert)}>X</button>
          </AlertTitle>
          <AlertDescription>
            La compra se realizo con exito, puede ver el detalle en la seccion
            de ventas
          </AlertDescription>
        </Alert>
      )}

      <div className='mt-10 pb-5 max-h-[20rem] rounded-md overflow-y-auto border-2 border-gray-400'>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className='w-[200px]'>Nombre</TableHead>
              <TableHead>Precio</TableHead>
              <TableHead>Cantidad</TableHead>
              <TableHead>Subtotal</TableHead>
              <TableHead className='text-right'>Acciones</TableHead>
            </TableRow>
          </TableHeader>
          {products.length === 0 && (
            <TableCaption> No hay productos agregados</TableCaption>
          )}
          <TableBody>
            {products.map((product) => (
              <BillRowBody
                key={product.codProd}
                product={product}
                handleDeleteProduct={handleDeleteProduct}
                handleEditProduct = {handleEditProduct}
              />
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <h3 className='text-right mt-5'>
          Total:{" "}
          {products
            .reduce(
              (total, product) => total + product.price * product.quantity,
              0
            )
            .toLocaleString("es-AR", {
              style: "currency",
              currency: "ARS",
            })}
        </h3>
      </div>
      <div>
        <Button
          onClick={handleBuy}
          className='mt-10 bg-teal-600'
          variant={"default"}
          disabled={products.length === 0}
        >
          Finalizar compra
        </Button>
      </div>
    </div>
  );
}

export default BillModule;
