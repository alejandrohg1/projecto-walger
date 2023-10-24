export interface Product{
    codProd: number
    name:string
    price:number
    cost: number
    quantity: number,
    min: number
    max: number
    status: boolean
}


export interface  ProductState extends Product{
    currentQuantity: number
}