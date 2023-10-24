export interface Bill {
  total:   number;
  id:      number;
  details: Detail[];
}

export interface Detail {
  quantity: number;
  subtotal: number;
  product:  Product;
}

export interface Product {
  productId: number;
  name:      string;
  price:     number;
}
