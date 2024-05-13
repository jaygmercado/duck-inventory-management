'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import notify from '@/utils/notify';
import { ProductType, ProductContextType } from '@/types/products';

const ProductsContext = createContext<ProductContextType>({ products: [], setProducts: () => {} });

export const useProductsContext = () => useContext(ProductsContext);

const loadProducts = async () => {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('unable to fetch products');

  return (await res.json().then((res) => res.data)) as ProductType[];
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<ProductType[]>([]);

  useEffect(() => {
    loadProducts()
      .then(setProducts)
      .catch(() => notify('Error', 'Unable to retrieve products'));
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <main>
        <h1 className='font-bold text-2xl mb-5'>Products</h1>
        <div className='flex flex-col'>
          <div className='-m-1.5 overflow-x-auto'>
            <div className='p-1.5 min-w-full inline-block align-middle'>
              <div className='border shadow rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </ProductsContext.Provider>
  );
}
