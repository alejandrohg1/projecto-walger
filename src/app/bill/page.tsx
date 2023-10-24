"use client";

import React, { useState } from "react";
import SideMenu from "../../../components/bill/SideMenu";
import BillModule from "../../../components/bill/BillModule";
import { ProductState } from "../../../types/product";

function Page() {
  const [bill, setBill] = useState({});
  const [billDetails, setBillDetails] = useState<ProductState[]>([]);

  const handleAddProduct = (product: ProductState) => {
    if (billDetails.find((item) => item.id === product.id))
      return alert("El producto ya se encuentra en la lista");
    setBillDetails([...billDetails, product]);
  };

  const handleDeleteProduct = (product: ProductState) => {
    setBillDetails(billDetails.filter((item) => item.id !== product.id));
  };

  const handleEditProduct = (product: ProductState) => {
    setBillDetails(
      billDetails.map((item) => (item.id === product.id ? product : item))
    );
  };

  const clearProducts = () => {
    setBillDetails([]);
  };

  return (
    <main className='flex min-h-screen flex-col'>
     
      <div className='flex'>
        <SideMenu
          setDetails={setBillDetails}
          billDetails={billDetails}
          handleAddProduct={handleAddProduct}
        />
        <BillModule
          products={billDetails}
          handleDeleteProduct={handleDeleteProduct}
          handleEditProduct={handleEditProduct}
          clearProducts={clearProducts}
        />
      </div>
    </main>
  );
}

export default Page;
