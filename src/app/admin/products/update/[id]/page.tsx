'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useProductsContext } from '../../layout';
import Input from '@/components/Input';
import notify from '@/utils/notify';
import { productSchema } from '@/schema/product';
import { ProductType } from '@/types/products';
import useGetCategories from '../../hooks/useGetCategories';
import useGetSuppliers from '../../hooks/useGetSuppliers';

const updateProduct = async (id: string, data: Partial<ProductType>) => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update products');
  return res.json().then((res) => res.data as ProductType);
};

const getProductData = async (id: string) => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error('unable to fetch product data');
  return res.json().then((res) => res.data as ProductType);
};

function UpdateUsers() {
  const router = useRouter();
  const { setProducts } = useProductsContext();
  const { categories } = useGetCategories();
  const { suppliers } = useGetSuppliers();
  const [submitting, setSubmitting] = useState(false);
  const [productData, setProductData] = useState<ProductType | null>(null);
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
      description: productData?.description || '',
      price: productData?.price || '',
      quantity: productData?.quantity || '',
      category: productData?.category || [],
      supplier: productData?.supplier || [],
    },
    onSubmit: (values) => {
      setSubmitting(true);
      updateProduct(id as string, values as ProductType)
        .then((upToDateProduct) => {
          setProducts((currentState) =>
            currentState.map((product) => {
              if (product._id === upToDateProduct._id) return upToDateProduct;
              return product;
            }),
          );
          notify('Success', 'Product Successfuly Updated');
          router.push('/admin/products');
        })
        .catch(() => {
          notify('Error', 'Unable to update product');
          router.push('/admin/products');
        });
    },
    validationSchema: productSchema,
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
      {/* CYS */}
      <div>
        <label htmlFor='description' className='block text-sm font-medium mb-2 dark:text-white'>
          Description
        </label>
        <Input
          {...getFieldProps('description')}
          touched={touched.description}
          errors={errors.description}
          disabled={fetching}
          placeholder={fetching ? 'loading...' : ''}
        />
      </div>
      <div className='flex justify-between'>
        <div>
          <label htmlFor='price' className='block text-sm font-medium mb-2 dark:text-white'>
            Price
          </label>
          <Input
            {...getFieldProps('price')}
            touched={touched.price}
            errors={errors.price}
            disabled={fetching}
            placeholder={fetching ? 'loading...' : ''}
          />
        </div>

        <div>
          <label htmlFor='quantity' className='block text-sm font-medium mb-2 dark:text-white'>
            Quantity
          </label>
          <Input
            {...getFieldProps('quantity')}
            touched={touched.quantity}
            errors={errors.quantity}
            disabled={fetching}
            placeholder={fetching ? 'loading...' : ''}
          />
        </div>
      </div>

      <div className='flex justify-between'>
        <div>
          <label
            htmlFor='category'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Category
          </label>
          <select
            id='category'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            {...getFieldProps('category')}
            disabled={fetching}
          >
            <option selected value=''>
              -- Select Category --
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {touched.category && errors.category && (
            <p className='text-sm text-red-600 mt-2' id='hs-validation-name-error-helper'>
              {errors.category}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor='supplier'
            className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'
          >
            Supplier
          </label>
          <select
            id='supplier'
            className='bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500'
            {...getFieldProps('supplier')}
            disabled={fetching}
          >
            <option selected value=''>
              -- Select Supplier --
            </option>
            {suppliers.map((suppliers) => (
              <option key={suppliers._id} value={suppliers.name}>
                {suppliers.name}
              </option>
            ))}
          </select>
          {touched.supplier && errors.supplier && (
            <p className='text-sm text-red-600 mt-2' id='hs-validation-name-error-helper'>
              {errors.supplier}
            </p>
          )}
        </div>
      </div>

      <div className='space-x-4 flex justify-end'>
        <button
          type='button'
          onClick={() => router.push('/admin/products')}
          className='disabled:cursor-not-allowed py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-500 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all text-sm  dark:hover:bg-gray-600 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800'
        >
          Cancel
        </button>
        <button
          disabled={!isValid}
          type='submit'
          className='disabled:cursor-not-allowed py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
        >
          Update
        </button>
      </div>
    </form>
  );
}

export default UpdateUsers;
