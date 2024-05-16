'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import Input from '@/components/Input';
import notify from '@/utils/notify';
import { supplierSchema } from '@/schema/supplier';
import { SupplierType } from '@/types/suppliers';
import { useSuppliersContext } from '../layout';

const createSupplier = async (data: Partial<SupplierType>) => {
  const res = await fetch('/api/suppliers', {
    method: 'POST',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to create supplier');
  const resJSON = await res.json();
  return resJSON.data as SupplierType[];
};

function CreateProduct() {
  const router = useRouter();
  const { setSuppliers } = useSuppliersContext();
  const [submitting, setSubmitting] = useState(false);
  const [supplierData] = useState<SupplierType | null>(null);

  const { touched, handleSubmit, getFieldProps, errors, isValid } = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: supplierData?.name || '',
      contactNumber: supplierData?.contactNumber || '',
      email: supplierData?.email || '',
      website: supplierData?.website || '',
    },
    onSubmit: (values) => {
      setSubmitting(true);
      createSupplier(values as SupplierType)
        .then((suppliers) => {
          setSuppliers(suppliers || []);
          notify('Success', 'Supplier Successfully Created');
          router.push('/admin/suppliers');
        })
        .catch((error) => {
          notify('Error', error.message);
        });
    },
    validationSchema: supplierSchema,
  });

  if (submitting) return <div>Submitting</div>;

  return (
    <form onSubmit={handleSubmit} className='p-10 space-y-5'>
      <div className='flex justify-between'>
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
        <div>
          <label htmlFor='contactNumber' className='block text-sm font-medium mb-2 dark:text-white'>
            Contact Number
          </label>
          <Input
            {...getFieldProps('contactNumber')}
            touched={touched.contactNumber}
            errors={errors.contactNumber}
            placeholder=''
          />
        </div>
      </div>

      <div className='flex justify-between'>
        <div>
          <label htmlFor='email' className='block text-sm font-medium mb-2 dark:text-white'>
            Email
          </label>
          <Input
            {...getFieldProps('email')}
            touched={touched.email}
            errors={errors.email}
            type='email'
            placeholder=''
          />
        </div>
        <div>
          <label htmlFor='website' className='block text-sm font-medium mb-2 dark:text-white'>
            Website
          </label>
          <Input
            {...getFieldProps('website')}
            touched={touched.website}
            errors={errors.website}
            placeholder=''
          />
        </div>
      </div>

      <div className='space-x-4 flex justify-end'>
        <button
          type='button'
          onClick={() => router.push('/admin/suppliers')}
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
