import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

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
      <div className='p-10 bg-sky-900 '>
        <h2 className='text-2xl font-bold text-white'>
          Conexion de prueba de api a net core
        </h2>
      </div>
        {children}
        </body>
     
    </html>
  )
}
