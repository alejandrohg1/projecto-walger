import { Product } from "../types/product";
import { faker } from '@faker-js/faker';


const products: Product[] = [];

for (let i = 1; i <= 20; i++) {
  const product: Product = {
    codProd: i,
    name: faker.commerce.productName(),
    price: parseFloat(faker.commerce.price()),
    cost: parseFloat(faker.commerce.price()),
    quantity: faker.number.int({ min: 1, max: 1000 }),
    min: faker.number.int({ min: 1, max: 50 }),
    max: faker.number.int({ min: 100, max: 1000 }),
    status: faker.datatype.boolean(),
  };

  products.push(product);
}

export { products };