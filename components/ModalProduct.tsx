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
import { FC } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Product } from "../types/product";
import { CreateProduct, UpdateProduct } from "../api/product";
import { Label } from "@/components/ui/label"

interface Props {
  product?: Product | null;
  isModal: boolean;
  handleEditProductClose: () => void;
  isEdit: boolean;
}

export interface ProductFormValues {
  cost: number | string; 
  max: number | string;
  min: number | string;
  name: string | string;
  price: number | string;
  quantity : number  | string;
}

const Modal: FC<Props> = ({
  isEdit,
  product,
  isModal,
  handleEditProductClose
}) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ProductFormValues>(
    {
      values: {
        name: isEdit ? product?.name ?? '' : '',
        price: isEdit ? product?.price ?? '' : '',
        cost: isEdit ? product?.cost  ?? '' : '',
        quantity: isEdit ? product?.quantity ??  '' : '',
        min: isEdit ? product?.minQuantity ?? '' : '',
        max: isEdit ? product?.maxQuantity ?? '' : '',
      }
    }
  );

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    
    if (isEdit) {

      const response = await UpdateProduct(product?.id as number, data);
      
      console.log(response)
    } else {

      await CreateProduct(data);
    }

    handleEditProductClose();
    
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
        <Label htmlFor="name">Nombre Producto</Label>
          <Input
            type="text"
            placeholder='Nombre del producto'
            {...register("name", { required: true })}
            
          />
          {errors.name && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}

          <Label htmlFor="price">Precio</Label>
          <Input
            type='text'
            placeholder='Precio'
            {...register("price", { required: true,})}
          />
          {errors.price && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}

          <Label htmlFor="cost">Costo</Label>
          <Input
            type='text'
            placeholder='Costo'
            {...register("cost", { required: true })}
          />
          {errors.cost && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}

          <Label htmlFor="quantity">Cantidad</Label>
          <Input
            type='text'
            placeholder='Cantida Actual'
            {...register("quantity", { required: true })}
          />
          {errors.min && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}

          <Label htmlFor="min">Cantidad Minima</Label>
          <Input
            type='text'
            placeholder='Cantida minima'
            {...register("min", { required: true })}
          />
          {errors.min && (
            <span className='text-red-500'>Este campo es requerido</span>
          )}

          <Label htmlFor="max">Cantidad Maxima</Label>
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
          <AlertDialogCancel onClick={handleEditProductClose}>
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
