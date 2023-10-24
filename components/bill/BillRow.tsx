'use client'
import { TableCell } from '@/components/ui/table'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input';
import { ProductState } from '../../types/product';
import { set } from 'react-hook-form';

interface Props {
  product: ProductState
  isEditing : boolean
}

function BillRow({ product ,isEditing}: Props) {

  const [quantity, setQuantity] = useState(product.currentQuantity)

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuantity(parseInt(e.target.value))

    
  

  }

  return (
    <TableCell>
      
        <Input type='number' max={product.quantity} min={1} name='quantity' value={quantity}  onChange={(e)=>onChange(e)}/>

      
      
    </TableCell>
  )
}

export default BillRow