import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Api Prueba',
  description: 'Conexion de api a net core',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <div className='p-10 bg-sky-900 flex justify-between '>
        <h2 className='text-2xl font-bold text-white'>
          Conexion de prueba de api a net core
        </h2>
        <div className='flex gap-2'> 
        <Link className='text-white font-medium underline' href="/product"  >Productos</Link>
        <Link className='text-white font-medium underline' href="/bill" > Hacer Factura</Link>
        <Link  className='text-white font-medium underline'href="/bill-list" > Facturas</Link>
        </div>
       

      </div>
        {children}
        </body>
     
    </html>
  )
}
