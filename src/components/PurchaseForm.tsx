import React, { useState } from 'react';
import { useFormik } from 'formik';
import notify from '@/utils/notify';
import Input from '@/components/Input';
import { purchaseSchema } from '@/schema/purchase';
import { ProductType } from '@/types/products';

const updateProduct = async (
  id: string,
  data: {
    quantity: number;
  },
) => {
  const res = await fetch(`/api/products/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to make purchase');
  return res.json().then((res) => res.data as ProductType);
};

const PurchaseForm: React.FC<{
  productToPurchase: ProductType;
  setProducts: React.Dispatch<React.SetStateAction<ProductType[]>>;
  setProductToPurchase: React.Dispatch<React.SetStateAction<ProductType | null>>;
}> = ({ productToPurchase, setProducts, setProductToPurchase }) => {
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { values, touched, handleSubmit, getFieldProps, errors, isValid, resetForm } = useFormik({
    enableReinitialize: true,
    initialValues: {
      quantity: 1,
      barangay: '',
      city: '',
      province: '',
      zipCode: '',
      phoneNumber: '',
    },
    onSubmit: () => {
      setSubmitting(true);
      updateProduct(productToPurchase?._id as string, {
        quantity: (productToPurchase?.quantity ?? 0) - values.quantity,
      })
        .then((upToDateProduct) => {
          setProducts((currentState) =>
            currentState.map((product) => {
              if (product._id === upToDateProduct._id) return upToDateProduct;
              return product;
            }),
          );
          notify('Success', 'Product Successfuly Updated');
          resetForm();
          setProductToPurchase(null);
          setSubmitting(false);
        })
        .catch(() => {
          notify('Error', 'Unable to update product');
          resetForm();
          setProductToPurchase(null);
          setSubmitting(false);
        });
    },
    validationSchema: purchaseSchema(productToPurchase?.quantity || 0),
  });

  if (submitting) return <div>Submitting</div>;

  return (
    <form onSubmit={handleSubmit} className='p-10 space-y-5'>
      <h2>Purchase</h2>
      <h2>Product: {productToPurchase.name}</h2>
      <p>
        Price:
        {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(
          productToPurchase.price,
        )}
      </p>

      <div className='flex justify-between'>
        <div>
          <label htmlFor='quantity' className='block text-sm font-medium mb-2 dark:text-white'>
            Quantity
          </label>
          <Input
            {...getFieldProps('quantity')}
            touched={touched.quantity}
            errors={errors.quantity}
            type='number'
            placeholder=''
          />
        </div>
      </div>

      <div>
        <label htmlFor='barangay' className='block text-sm font-medium mb-2 dark:text-white'>
          Barangay
        </label>
        <Input
          {...getFieldProps('barangay')}
          touched={touched.barangay}
          errors={errors.barangay}
          type='text'
          placeholder=''
        />
      </div>

      <div>
        <label htmlFor='city' className='block text-sm font-medium mb-2 dark:text-white'>
          City
        </label>
        <Input
          {...getFieldProps('city')}
          touched={touched.city}
          errors={errors.city}
          type='text'
          placeholder=''
        />
      </div>

      <div>
        <label htmlFor='province' className='block text-sm font-medium mb-2 dark:text-white'>
          Province
        </label>
        <Input
          {...getFieldProps('province')}
          touched={touched.province}
          errors={errors.province}
          type='text'
          placeholder=''
        />
      </div>

      <div>
        <label htmlFor='zipCode' className='block text-sm font-medium mb-2 dark:text-white'>
          ZIP Code
        </label>
        <Input
          {...getFieldProps('zipCode')}
          touched={touched.zipCode}
          errors={errors.zipCode}
          type='text'
          placeholder=''
        />
      </div>

      <div>
        <label htmlFor='phoneNumber' className='block text-sm font-medium mb-2 dark:text-white'>
          Phone Number
        </label>
        <Input
          {...getFieldProps('phoneNumber')}
          touched={touched.phoneNumber}
          errors={errors.phoneNumber}
          type='text'
          placeholder=''
        />
      </div>

      <p>
        Total:
        {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(
          productToPurchase.price * values.quantity,
        )}
      </p>

      <div className='space-x-4 flex justify-end'>
        <button
          type='button'
          onClick={() => setProductToPurchase(null)}
          className='disabled:cursor-not-allowed py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-500 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all text-sm  dark:hover:bg-gray-600 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800'
        >
          Cancel
        </button>
        <button
          disabled={!isValid}
          type='submit'
          className='disabled:cursor-not-allowed py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
        >
          Purchase
        </button>
      </div>
    </form>
  );
};

export default PurchaseForm;
