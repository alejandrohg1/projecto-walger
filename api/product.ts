import axios from "axios";
import { BASE_URL2 } from "../constants/constants";
import { ProductFormValues } from "../components/ModalProduct";


export const GetProduct = async () =>{
    const response = await axios.get(`${BASE_URL2}/products`);
    return response.data;
}

export const GetProductById = async (productId: number) =>{
    const response = await axios.get(`${BASE_URL2}/products/${productId}`);
    return response.data;
}

export const CreateProduct = async (data: ProductFormValues) =>{
    const response = await axios.post(`${BASE_URL2}/products/`, data);
    return response.data;
}


export const UpdateProduct = async (productId: number, data: ProductFormValues) =>{
    const response = await axios.put(`${BASE_URL2}/products/${productId}`, data);
    return response.data;
}

export const DeleteProduct = async (productId: number) =>{
    const response = await axios.delete(`${BASE_URL2}/products/${productId}`);
    return response.data;
}