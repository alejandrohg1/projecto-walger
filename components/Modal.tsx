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
import { addClient, updateClient } from "../api/clientApi";

interface Props {
  client?: Client | null;
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  isEdit: boolean;
  clientList: Client[];
  setClientList: (clientList: Client[]) => void;
}

export interface ClientFormValues {
  nombreCliente: string | undefined;
  apellidoCliente: string | undefined;
  categoria: string | undefined;
}

const Modal: FC<Props> = ({
  isEdit,
  client,
  isModal,
  setIsModal,
  clientList,
  setClientList,
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ClientFormValues>({
    values: {
      nombreCliente: isEdit ? client?.nombreCliente : "",
      apellidoCliente: isEdit ? client?.apellidoCliente : "",
      categoria: isEdit ? client?.categoria : "",
    },
  });

  const onSubmit: SubmitHandler<ClientFormValues> = async (data) => {
    if (isEdit) {
      const response = await updateClient({
        ...data,
        idCliente: client?.idCliente,
      });
      
      console.log(response)

      setClientList(
        clientList.map((cliente) => {
          if (cliente.idCliente === client?.idCliente) {
            return {
              ...cliente,
              nombreCliente: data.nombreCliente as string,
              apellidoCliente: data.apellidoCliente as string,
              categoria: data.categoria as string,
            };
          }
          return cliente;
        })
      );
    } else {
      await addClient(data);
      const newClient = {
        idCliente: clientList.length + 1,
        nombreCliente: data.nombreCliente,
        apellidoCliente: data.apellidoCliente,
        categoria: data.categoria,
      } as Client;
      setClientList([newClient, ...clientList]);
    }

    setIsModal(false);
  };

  return (
    <AlertDialog open={isModal}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isEdit ? "Editar Cliente" : "Crear Cliente"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Añade un nuevo cliente a la lista
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex flex-col gap-4'>
          <Input
            type='email'
            placeholder='Nombre'
            {...register("nombreCliente", { required: true })}
          />
          {errors.nombreCliente && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}
          <Input
            type='email'
            placeholder='Apellido'
            {...register("apellidoCliente", { required: true })}
          />
          {errors.apellidoCliente && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}
          <Input
            type='email'
            placeholder='Categoria'
            {...register("categoria", { required: true })}
          />
          {errors.categoria && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setIsModal(false)}>
            Cancelar
          </AlertDialogCancel>
          <AlertDialogAction
            className='bg-sky-900'
            onClick={handleSubmit(onSubmit)}
          >
            Guardar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default Modal;
