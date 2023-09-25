import axios from "axios";
import { BASE_URL } from "../constants/constants";
import { Client } from "../types/client";
import { FormValues } from "../components/Modal";


export const getClient = async () =>{
    const response = await axios.get(`${BASE_URL}/Cliente/Lista`);
    return response.data;
}


export const addClient = async (data: FormValues) =>{
    const response = await axios.post(`${BASE_URL}/Cliente/Guardar`, data);
    return response.data;
}


export const deleteClient = async (id: number) =>{
    const response = await axios.delete(`${BASE_URL}/Cliente/Eliminar/${id}`);
    return response.data;
}

export const updateClient = async (data: any) =>{
    const response = await axios.put(`${BASE_URL}/Cliente/Editar`, data);
    return response.data;
}