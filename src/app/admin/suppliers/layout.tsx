'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import notify from '@/utils/notify';
import { SupplierType, SupplierContextType } from '@/types/suppliers';

const SuppliersContext = createContext<SupplierContextType>({
  suppliers: [],
  setSuppliers: () => {},
});

export const useSuppliersContext = () => useContext(SuppliersContext);

const loadSuppliers = async () => {
  const res = await fetch('/api/suppliers');
  if (!res.ok) throw new Error('unable to fetch suppliers');

  return (await res.json().then((res) => res.data)) as SupplierType[];
};

export default function SupplierLayout({ children }: { children: React.ReactNode }) {
  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);

  useEffect(() => {
    loadSuppliers()
      .then(setSuppliers)
      .catch(() => notify('Error', 'Unable to retrieve suppliers'));
  }, []);

  return (
    <SuppliersContext.Provider value={{ suppliers, setSuppliers }}>
      <main>
        <h1 className='font-bold text-2xl mb-5'>Suppliers</h1>
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
    </SuppliersContext.Provider>
  );
}
