export interface Product{
    id: number
    name:string
    price:number
    cost: number
    quantity: number,
    minQuantity: number
    maxQuantity: number
    status: boolean
}


export interface  ProductState extends Product{
    currentQuantity: number
}