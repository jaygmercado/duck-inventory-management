'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useProductsContext } from '../../layout';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import notify from '@/utils/notify';
import { productSchema } from '@/schema/product';
import { ProductType } from '@/types/products';

const updateProduct = async (id: string, data: Partial<ProductType>) => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update products');
  return (await res.json()) as ProductType;
};

const getProductData = async (id: string) => {
  const res = await fetch(`/api/products/${id}`);
  if (!res.ok) throw new Error('unable to fetch product data');
  return res.json().then((res) => res.data as ProductType);
};

function UpdateUsers() {
  const router = useRouter();
  const { setProducts } = useProductsContext();
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
        .then((updateProduct) => {
          setProducts((currentState) =>
            currentState.map((product) => {
              if (product._id === updateProduct._id) return updateProduct;
              return product;
            }),
          );
          notify('Success', 'Product Successfuly Updated');
          router.push('/portal/products');
        })
        .catch(() => {
          notify('Error', 'Unable to update product');
          router.push('/portal/products');
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

      <div>
        <label htmlFor='category' className='block text-sm font-medium mb-2 dark:text-white'>
          Category
        </label>
        <TextArea
          {...getFieldProps('category')}
          touched={touched.category}
          errors={errors.category}
          disabled={fetching}
          placeholder={fetching ? 'loading...' : ''}
        />
      </div>

      <div>
        <label htmlFor='supplier' className='block text-sm font-medium mb-2 dark:text-white'>
          Supplier
        </label>
        <TextArea
          {...getFieldProps('supplier')}
          touched={touched.supplier}
          errors={errors.supplier}
          disabled={fetching}
          placeholder={fetching ? 'loading...' : ''}
        />
      </div>

      <div className='space-x-4 flex justify-end'>
        <button
          disabled={!isValid}
          type='button'
          onClick={() => router.push('/portal/products')}
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
