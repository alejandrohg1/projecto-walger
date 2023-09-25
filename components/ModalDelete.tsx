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
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";

import { Client } from "../types/client";
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { addClient, deleteClient, updateClient } from "../api/clientApi";

interface Props {
  client?: Client | null;
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
 
  clientList: Client[];
  setClientList: (clientList: Client[]) => void;
}

export interface FormValues {
  nombreCliente: string | undefined;
  apellidoCliente: string | undefined;
  categoria: string | undefined;
}

const ModalDelete: FC<Props> = ({
  
  client,
  isModal,
  setIsModal,
  clientList,
  setClientList,
}) => {
 

  const onSubmit = async () => {
    
    


    const response = await deleteClient(client?.idCliente as number);
    
    console.log(response)
    setClientList(clientList.filter((item) => item.idCliente !== client?.idCliente));
    setIsModal(false);
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
          <AlertDialogCancel onClick={() => setIsModal(false)}>
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
