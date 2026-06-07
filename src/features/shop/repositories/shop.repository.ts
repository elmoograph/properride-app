import { productsData } from "../data/products.data";
import { productCategories } from "../data/categories.data";

export function getProducts() {
  return productsData;
}

export function getProductCategories() {
  return productCategories;
}

export function getProductById(id: string) {
  return productsData.find((product) => product.id === id);
}
