import { Dispatch, SetStateAction } from 'react';

export interface CategoryType {
  _id: string;
  name: string;
}

export interface CategoryContextType {
  categories: CategoryType[];
  setCategories: Dispatch<SetStateAction<CategoryType[]>>;
}
