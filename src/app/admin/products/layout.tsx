'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import notify from '@/utils/notify';
import { ProductType, ProductContextType } from '@/types/products';
import Link from 'next/link';

const ProductsContext = createContext<ProductContextType>({ products: [], setProducts: () => {} });

export const useProductsContext = () => useContext(ProductsContext);

const loadProducts = async () => {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('unable to fetch products');

  return (await res.json().then((res) => res.data)) as ProductType[];
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [products, setProducts] = useState<ProductType[]>([]);
  useEffect(() => {
    loadProducts()
      .then(setProducts)
      .catch(() => notify('Error', 'Unable to retrieve products'));
  }, []);

  return (
    <ProductsContext.Provider value={{ products, setProducts }}>
      <main>
        <div className='flex justify-between'>
          <h1 className='font-bold text-2xl mb-5'>Products</h1>
          {pathname === '/admin/products' && (
            <Link
              href='/admin/products/create'
              className='text-blue-500 hover:text-blue-700 disabled:hover:cursor-not-allowed disabled:text-blue-200'
            >
              Create
            </Link>
          )}
        </div>

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
