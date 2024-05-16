'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Input from '@/components/Input';
import notify from '@/utils/notify';
import { categorySchema } from '@/schema/category';
import { CategoryType } from '@/types/categories';
import { useCategoriesContext } from '../layout';

const createCategory = async (data: Partial<CategoryType>) => {
  const res = await fetch('/api/categories', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create category');
  return (await res.json()).data as CategoryType[];
};

function CreateProduct() {
  const router = useRouter();
  const { setCategories } = useCategoriesContext();
  const [submitting, setSubmitting] = useState(false);
  const [productData] = useState<CategoryType | null>(null);

  const { touched, handleSubmit, getFieldProps, errors, isValid } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: productData?.name || '',
    },
    onSubmit: (values) => {
      setSubmitting(true);
      createCategory(values as CategoryType)
        .then((categories) => {
          setCategories(categories);
          notify('Success', 'Category Successfully Created');
          router.push('/admin/categories');
        })
        .catch((error) => {
          notify('Error', error.message);
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
          placeholder=''
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

export default CreateProduct;
