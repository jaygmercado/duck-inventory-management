'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import notify from '@/utils/notify';
import { CategoryType, CategoryContextType } from '@/types/categories';

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
  const [categories, setCategories] = useState<CategoryType[]>([]);

  useEffect(() => {
    loadCategories()
      .then(setCategories)
      .catch(() => notify('Error', 'Unable to retrieve categories'));
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories }}>
      <main>
        <h1 className='font-bold text-2xl mb-5'>Categories</h1>
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
