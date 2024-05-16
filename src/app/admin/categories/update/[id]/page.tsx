'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useCategoriesContext } from '../../layout';
import Input from '@/components/Input';
import notify from '@/utils/notify';
import { categorySchema } from '@/schema/category';
import { CategoryType } from '@/types/categories';

const updateProduct = async (id: string, data: Partial<CategoryType>) => {
  const res = await fetch(`/api/categories/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update categories');
  return (await res.json()).data as CategoryType;
};

const getProductData = async (id: string) => {
  const res = await fetch(`/api/categories/${id}`);
  if (!res.ok) throw new Error('unable to fetch product data');
  return res.json().then((res) => res.data as CategoryType);
};

function UpdateUsers() {
  const router = useRouter();
  const { setCategories } = useCategoriesContext();
  const [submitting, setSubmitting] = useState(false);
  const [productData, setProductData] = useState<CategoryType | null>(null);
  const { id } = useParams();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    getProductData(id as string)
      .then((res) => {
        setProductData(res);
        setFetching(false);
      })
      .catch(() => notify('Error', `Cannot find product: ${id}`));
  }, [id]);

  const { touched, handleSubmit, getFieldProps, errors, isValid } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productData?.name || '',
    },
    onSubmit: (values) => {
      setSubmitting(true);
      updateProduct(id as string, values as CategoryType)
        .then((updateProduct) => {
          setCategories((currentState) =>
            currentState.map((product) => {
              if (product._id === updateProduct._id) return updateProduct;
              return product;
            }),
          );
          notify('Success', 'Product Successfuly Updated');
          router.push('/admin/categories');
        })
        .catch(() => {
          notify('Error', 'Unable to update product');
          router.push('/admin/categories');
        });
    },
    validationSchema: categorySchema,
  });

  if (submitting) return <div>Submitting</div>;

  return (
    <form onSubmit={handleSubmit} className='p-10 space-y-5'>
      <div>
        <label htmlFor='name' className='block text-sm font-medium mb-2 dark:text-white'>
          Name
        </label>
        <Input
          {...getFieldProps('name')}
          touched={touched.name}
          errors={errors.name}
          disabled={fetching}
          placeholder={fetching ? 'loading...' : ''}
        />
      </div>

      <div className='space-x-4 flex justify-end'>
        <button
          type='button'
          onClick={() => router.push('/admin/categories')}
          className='disabled:cursor-not-allowed py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-500 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all text-sm  dark:hover:bg-gray-600 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800'
        >
          Cancel
        </button>
        <button
          disabled={!isValid}
          type='submit'
          className='disabled:cursor-not-allowed py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
        >
          Create
        </button>
      </div>
    </form>
  );
}

export default UpdateUsers;
