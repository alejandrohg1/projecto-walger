"use client"
import React from 'react'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  isModal: boolean
  setIsModal: (isModal: boolean) => void
  title: string
  description : string
  children?: React.ReactNode
 
}

function ModalGeneric({ isModal, setIsModal,title,description,children} : Props) {
  return (
    
    <AlertDialog open={isModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {title}
          </AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
          <div>
            {children}
          </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsModal(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className='bg-sky-900'
            onClick={() => setIsModal(false)}
          >
            Ok
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default ModalGeneric