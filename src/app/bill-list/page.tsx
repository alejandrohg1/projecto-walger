'use client'
import React, { useEffect, useState } from 'react'
import BasicTable from '../../../components/ui/BasicTable'
import { ColumnDef } from '@tanstack/react-table'
import { Bill } from '../../../types/Bill';
import axios from 'axios';

function BillList() {


  const [data, setData] = useState<Bill[]>();


  useEffect(() => { 
      const fetchData = async () => {
        const response = await axios  ('http://localhost:7129/bills')
        console.log(response.data)
        setData(response.data)
      }
      fetchData()
  }, [])



  const columns: ColumnDef<Bill>[] = [

  ]

  return (
    <div>
      <BasicTable columns={columns} data={data}/>
    </div>
  )
}

export default BillList