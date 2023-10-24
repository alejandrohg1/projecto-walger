"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { FC } from "react";
import { Product } from "../types/product";
import { DeleteProduct } from "../api/product";

interface Props {
  product?: Product | null;
  isModal: boolean;

 handleDeleteProductClose: () => void;
}

const ModalDelete: FC<Props> = ({
  
  product,
  isModal,
  handleDeleteProductClose,
}) => {
 

  const onSubmit = async () => {
    const response = await DeleteProduct(product?.id as number);
    console.log(response)
    handleDeleteProductClose();
  };

  return (
    <AlertDialog open={isModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Borrar cliente
          </AlertDialogTitle>
          <AlertDialogDescription>
            Estas seguro que deseas borrar el cliente? una vez borrado no se podra recuperar
          </AlertDialogDescription>
        </AlertDialogHeader>
        
       
        <AlertDialogFooter>
          <AlertDialogCancel onClick={handleDeleteProductClose}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className='bg-red-600'
            onClick={onSubmit}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ModalDelete;
