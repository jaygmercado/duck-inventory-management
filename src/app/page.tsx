'use client';

import React, { useEffect, useState } from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';
import notify from '@/utils/notify';
import { ProductType } from '@/types/products';
import Products from '@/components/Products';
import PurchaseForm from '@/components/PurchaseForm';
import MainFooter from '@/components/MainFooter';

const loadProducts = async () => {
  const res = await fetch('/api/products');
  if (!res.ok) throw new Error('unable to fetch products');

  return (await res.json().then((res) => res.data)) as ProductType[];
};

export default function App() {
  const session = useSession();
  const [products, setProducts] = useState<ProductType[]>([]);
  const [productToPurchase, setProductToPurchase] = useState<ProductType | null>(null);

  useEffect(() => {
    loadProducts()
      .then(setProducts)
      .catch(() => notify('Error', 'Unable to retrieve products'));
  }, []);

  return (
    <main className='h-full'>
      <div className='mx-auto'>
        <header className='flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-5 border-b-2'>
          <nav className='container w-full flex flex-wrap mx-auto'>
            <div className='md:col-span-3'>
              <a
                className='flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80'
                href='/'
                aria-label='Adidas'
              >
                <img
                  src='https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png'
                  alt='adidas logo'
                  height={80}
                  width={80}
                />
              </a>
            </div>

            <div className='flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3'>
              {session.status === 'authenticated' ? (
                <Link href='/admin'>
                  <button
                    type='button'
                    className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none'
                  >
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='16'
                      height='16'
                      fill='currentColor'
                      className='bi bi-arrow-up-right-square-fill'
                      viewBox='0 0 16 16'
                    >
                      <path d='M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707' />
                    </svg>
                    Continue to Admin Page
                  </button>
                </Link>
              ) : (
                <button
                  onClick={() => signIn()}
                  type='button'
                  className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none'
                >
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='20'
                    height='20'
                    fill='current'
                    className='bi bi-person-fill-gear'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0' />
                  </svg>
                  Sign In as Admin
                </button>
              )}
            </div>
          </nav>
        </header>

        <div className='container mx-auto mb-5'>
          {productToPurchase !== null ? (
            <PurchaseForm
              productToPurchase={productToPurchase}
              setProducts={setProducts}
              setProductToPurchase={setProductToPurchase}
            />
          ) : (
            <div>
              <div className='flex justify-between my-5'>
                <h1 className='font-bold' style={{ fontSize: 30 }}>
                  Browse Products
                </h1>
                <form className=''>
                  <label
                    htmlFor='default-search'
                    className='mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white'
                  >
                    Search
                  </label>
                  <div className='relative'>
                    <div className='absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none'>
                      <svg
                        className='w-4 h-4 text-gray-500 dark:text-gray-400'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 20 20'
                      >
                        <path
                          stroke='currentColor'
                          stroke-linecap='round'
                          stroke-linejoin='round'
                          stroke-width='2'
                          d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'
                        />
                      </svg>
                    </div>
                    <input
                      type='search'
                      id='default-search'
                      className='block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
                      placeholder='Type a product name'
                      required
                    />
                  </div>
                </form>
              </div>
              <div className='mt-3 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
                <Products products={products} setProductToPurchase={setProductToPurchase} />
              </div>
            </div>
          )}
        </div>
      </div>
      <MainFooter />
    </main>
  );
}
