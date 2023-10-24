'use client'
import { Input } from "@/components/ui/input";
import React, { SetStateAction, useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import { Product, ProductState } from "../../types/product";
import { products } from '../../faker/productFaker';
import axios from "axios";

interface Props {
  setDetails: SetStateAction<any>
  billDetails : ProductState[]
  handleAddProduct : (product: ProductState) => void
}

function SideMenu({setDetails,billDetails,handleAddProduct}: Props) {

  const [productsList, setProducts] = useState<Product[]>([])


  useEffect(() => {
    const populateProducts = async () => {
      const response = await axios.get('https://localhost:7219/api/products')
      setProducts(response.data)
    }

    populateProducts()
  }, [])







  return (
    <div className='flex-grow max-w-sm pt-5 border-2 bg-gray-100 '>
      <div className='flex flex-col gap-3 p-5 border-b-2'>
        <h2 className='text-2xl'>Productos</h2>
        <div className='flex '>
          <Input type='text' placeholder='Buscar...' />
        </div>
      </div>

      <div className='pt-5 max-h-[25rem] overflow-y-auto'>
        {
          productsList.map((product) => (
            <ProductCard key={product.id} product={product} handleAddProduct={handleAddProduct} />
          ))
        }
      </div>
    </div>
  );
}

export default SideMenu;
