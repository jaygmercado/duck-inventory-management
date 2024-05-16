import { useState, useEffect, useCallback } from 'react';
import { CategoryType } from '@/types/categories';

const useGetCategories = () => {
  const [categories, setCategories] = useState<CategoryType[]>([]);

  const loadCategories = useCallback(async () => {
    const res = await fetch('/api/categories');
    if (!res.ok) throw new Error('unable to fetch categories');
    const fetchedCategories = (await res.json().then((res) => res.data)) as CategoryType[];
    setCategories(fetchedCategories);
  }, []);

  useEffect(() => {
    loadCategories();
  }, [loadCategories]);

  return {
    categories,
  };
};

export default useGetCategories;
