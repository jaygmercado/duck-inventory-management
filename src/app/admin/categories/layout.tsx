'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import notify from '@/utils/notify';
import { CategoryType, CategoryContextType } from '@/types/categories';
import Link from 'next/link';

const CategoriesContext = createContext<CategoryContextType>({
  categories: [],
  setCategories: () => {},
});

export const useCategoriesContext = () => useContext(CategoriesContext);

const loadCategories = async () => {
  const res = await fetch('/api/categories');
  if (!res.ok) throw new Error('unable to fetch categories');

  return (await res.json().then((res) => res.data)) as CategoryType[];
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    loadCategories()
      .then(setCategories)
      .catch(() => notify('Error', 'Unable to retrieve categories'));
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      <main>
        <div className='flex justify-between'>
          <h1 className='font-bold text-2xl mb-5'>Categories</h1>
          {pathname === '/admin/categories' && (
            <Link
              href='/admin/categories/create'
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
    </CategoriesContext.Provider>
  );
}
