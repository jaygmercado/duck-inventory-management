import { useState, useEffect, useCallback } from 'react';
import { SupplierType } from '@/types/suppliers';

const useGetSuppliers = () => {
  const [suppliers, setSuppliers] = useState<SupplierType[]>([]);

  const loadSuppliers = useCallback(async () => {
    const res = await fetch('/api/suppliers');
    if (!res.ok) throw new Error('unable to fetch suppliers');
    const fetchedSuppliers = (await res.json().then((res) => res.data)) as SupplierType[];
    setSuppliers(fetchedSuppliers);
  }, []);

  useEffect(() => {
    loadSuppliers();
  }, [loadSuppliers]);

  return {
    suppliers,
  };
};

export default useGetSuppliers;
