"use client";
import { TableRow, TableCell } from "@/components/ui/table";
import React, { useState } from "react";
import BillRow from "./BillRow";
import { Product, ProductState } from "../../types/product";
import { products } from "../../faker/faker";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Props {
  product: ProductState;
  handleDeleteProduct: (product: ProductState) => void;
  handleEditProduct?: (product: ProductState) => void;
}

function BillRowBody({
  product,
  handleDeleteProduct,
  handleEditProduct,
}: Props) {

  const onDelete = () => {
    handleDeleteProduct(product);
  };

  const [quantity, setQuantity] = useState(product.currentQuantity || 1);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(parseInt(e.target.value) > product.quantity) return setQuantity(product.quantity);
    if(parseInt(e.target.value) < 1) return setQuantity(1);
    if(e.target.value === "") return setQuantity(1);
    
   
    setQuantity(parseInt(e.target.value)); 
    handleEditProduct?.({ ...product, currentQuantity: parseInt(e.target.value) });
  };

  return (
    <TableRow key={product.id}>
      <TableCell key={product.id}>{product.name}</TableCell>
      <TableCell>{product.price}</TableCell>
      <TableCell>
        <Input
          type='number'
          max={product.quantity}
          min={1}
          name='quantity'
          value={quantity}
          contentEditable={false}
          onChange={(e) => onChange(e)}
        />
      </TableCell>
      <TableCell>
        {" "}
        {(product.price * product.currentQuantity).toLocaleString("es-AR", {
          style: "currency",
          currency: "ARS",
        })}
      </TableCell>
      <TableCell className='flex gap-3 text-right justify-end'>
        <Button variant={"destructive"} onClick={onDelete}>
          Eliminar
        </Button>
      </TableCell>
    </TableRow>
  );
}

export default BillRowBody;
