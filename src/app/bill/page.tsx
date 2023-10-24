'use client'

import React, { useState } from "react";
import SideMenu from '../../../components/bill/SideMenu';
import BillModule from '../../../components/bill/BillModule';
import {  ProductState } from "../../../types/product";

function Page() {

  const [bill,setBill] = useState({})
  const [billDetails,setBillDetails] = useState<ProductState[]>([])

  const handleAddProduct = (product: ProductState) => {
    setBillDetails([...billDetails,product])
  }

  const handleDeleteProduct = (product: ProductState) => {
    setBillDetails(billDetails.filter((item) => item.codProd !== product.codProd))
  }

  const handleEditProduct = (product: ProductState) => {
    setBillDetails(billDetails.map((item) => item.codProd === product.codProd ? product : item))
  }

  return (
    <main className='flex min-h-screen flex-col'>
      <div className='p-10 bg-sky-900 '>
        <h2 className='text-2xl font-bold text-white'>
          Conexion de prueba de api a net core
        </h2>
      </div>
      <div className="flex" >
      
        <SideMenu setDetails={setBillDetails} billDetails={billDetails} handleAddProduct={handleAddProduct} />
        <BillModule products={billDetails} handleDeleteProduct ={handleDeleteProduct} handleEditProduct={handleEditProduct}/>
        
      </div>


    </main>
  );
}

export default Page;
