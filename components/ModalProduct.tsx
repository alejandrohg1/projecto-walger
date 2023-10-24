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
import { Product } from "../types/product";

interface Props {
  client?: Product | null;
  isModal: boolean;
  setIsModal: (isModal: boolean) => void;
  isEdit: boolean;
  clientList: Product[];
  setClientList: (clientList: Product[]) => void;
}

export interface FormValues {
  cost: number | string; 
  max: number | string;
  min: number | string;
  name: string | string;
  price: number | string;
  quantity : number  | string;
  
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
  } = useForm<FormValues>(
    {
      values: {
        name: isEdit ? client?.name ?? '' : '',
        price: isEdit ? client?.price ?? '' : '',
        cost: isEdit ? client?.cost  ?? '' : '',
        quantity: isEdit ? client?.quantity ??  '' : '',
        min: isEdit ? client?.minQuantity ?? '' : '',
        max: isEdit ? client?.maxQuantity ?? '' : '',
      }
    }
  );

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    
    if (isEdit) {
      /*
      const response = await updateClient({
        ...data,
        idCliente: client?.idCliente,
      });
      
      console.log(response)
*/
      setClientList(
        clientList.map((cliente) => {
          if (cliente.codProd === client?.codProd) {
            return {
              ...client,
              cost : data.cost as number,
              max: data.max as number,
              min: data.min as number,
              name : data.name as string,
              price: data.price as number,
              quantity: data.quantity as number,
              
              

            };
          }
          return cliente;
        })
      );
    } else {
      //await addClient(data);
      const newClient = {
        codProd: clientList.length +1,
        cost : data.cost as number,
        maxQuantity: data.max as number,
        minQuantity: data.min as number,
        name : data.name as string,
        price: data.price as number,
        quantity: data.quantity as number,
        status: true
      } as Product;
      setClientList([newClient, ...clientList]);
    }

    setIsModal(false);
    
  };

  return (
    <AlertDialog open={isModal}  >
      <AlertDialogContent className="max-h-[70%] overflow-y-auto">
        <AlertDialogHeader>
          <AlertDialogTitle>
            {isEdit ? "Editar Producto" : "Crear Producto"}
          </AlertDialogTitle>
          <AlertDialogDescription>
            Añade un nuevo Producto a la lista
          </AlertDialogDescription>
        </AlertDialogHeader>
        <div className='flex flex-col gap-4'>
          <Input
            type="text"
            placeholder='Nombre del producto'
            {...register("name", { required: true })}
            
          />
          {errors.name && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}
          <Input
            type='text'
            placeholder='Precio'
            {...register("price", { required: true,})}
          />
          {errors.price && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}
          <Input
            type='text'
            placeholder='Costo'
            {...register("cost", { required: true })}
          />
          {errors.cost && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}
            <Input
            type='text'
            placeholder='Cantida Actual'
            {...register("quantity", { required: true })}
          />
          {errors.min && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}
          <Input
            type='text'
            placeholder='Cantida minima'
            {...register("min", { required: true })}
          />
          {errors.min && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}
           <Input
            type='text'
            placeholder='Cantida maxima'
            {...register("max", { required: true })}
          />
          {errors.max && (
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
