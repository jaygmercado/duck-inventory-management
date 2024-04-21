import { Dispatch, SetStateAction } from 'react';

export interface ProductType {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  category: string;
  supplier: string;
}

export interface ProductContextType {
  products: ProductType[];
  setProducts: Dispatch<SetStateAction<ProductType[]>>;
}
