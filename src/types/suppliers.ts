import { Dispatch, SetStateAction } from 'react';

export interface SupplierType {
  _id: string;
  name: string;
  contactNumber: string;
  email: string;
  website: string;
}

export interface SupplierContextType {
  suppliers: SupplierType[];
  setSuppliers: Dispatch<SetStateAction<SupplierType[]>>;
}
