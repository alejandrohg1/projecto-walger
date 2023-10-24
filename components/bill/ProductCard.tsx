
import React, { FC } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Product, ProductState } from "../../types/product";
import { products } from '../../faker/faker';

interface Props {
  product: Product;
  handleAddProduct: (product: ProductState) => void
}

function ProductCard({ product,handleAddProduct }: Props) {

  const handleAdd = () => {
    handleAddProduct({...product,currentQuantity:1})
  }

  return (
    <div className='p-3 border-b-2'>
      <div className='flex justify-between'>
        <h3 className='font-medium'>{product.name}</h3>
        <Badge variant='outline'>{product.price}</Badge>
      </div>
      <div className='flex justify-between items-center pt-3 '>
        <div>
          <p className='text-sm font-light text-gray-500'>{`Cantidad: ${product.quantity}`}</p>
          <p className='text-sm font-light text-gray-500'>{`Min: ${product.minQuantity} Max: ${product.maxQuantity}`}</p>
        </div>
        <Button variant='default' className='bg-teal-500 w-4 h-7' onClick={handleAdd}>
          +
        </Button>
      </div>
    </div>
  );
}

export default ProductCard;
