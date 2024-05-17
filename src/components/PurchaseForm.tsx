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
    <form onSubmit={handleSubmit}>
      <div className='max-w-2xl px-4 py-5 sm:px-6 lg:px-8 lg:py-14 mx-auto'>
        {/* Card */}
        <div className='bg-white rounded-xl shadow p-4 sm:p-7'>
          <div className='text-center mb-8'>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='100'
              height='100'
              fill='currentColor'
              className='bi bi-cart-check mx-auto p-5 text-sky-700'
              viewBox='0 0 16 16'
            >
              <path d='M11.354 6.354a.5.5 0 0 0-.708-.708L8 8.293 6.854 7.146a.5.5 0 1 0-.708.708l1.5 1.5a.5.5 0 0 0 .708 0z' />
              <path d='M.5 1a.5.5 0 0 0 0 1h1.11l.401 1.607 1.498 7.985A.5.5 0 0 0 4 12h1a2 2 0 1 0 0 4 2 2 0 0 0 0-4h7a2 2 0 1 0 0 4 2 2 0 0 0 0-4h1a.5.5 0 0 0 .491-.408l1.5-8A.5.5 0 0 0 14.5 3H2.89l-.405-1.621A.5.5 0 0 0 2 1zm3.915 10L3.102 4h10.796l-1.313 7zM6 14a1 1 0 1 1-2 0 1 1 0 0 1 2 0m7 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0' />
            </svg>
            <h2 className='text-2xl md:text-3xl font-bold text-gray-800'>Purchase Form</h2>
            <p className='text-sm text-gray-600'>Input the required information below</p>
          </div>

          <form>
            <div className='py-6 first:pt-0 last:pb-0 border-t first:border-transparent border-gray-200'>
              <label
                htmlFor='af-payment-billing-address'
                className='inline-block text-md font-semibold'
              >
                Billing Details
              </label>

              <div className='mt-2 space-y-3'>
                <Input
                  {...getFieldProps('barangay')}
                  touched={touched.barangay}
                  errors={errors.barangay}
                  type='text'
                  className='py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                  placeholder='Barangay'
                />
                <Input
                  {...getFieldProps('city')}
                  touched={touched.city}
                  errors={errors.city}
                  type='text'
                  className='py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                  placeholder='City'
                />
                <Input
                  {...getFieldProps('province')}
                  touched={touched.province}
                  errors={errors.province}
                  type='text'
                  className='py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                  placeholder='Province'
                />
                <Input
                  {...getFieldProps('zipCode')}
                  touched={touched.zipCode}
                  errors={errors.zipCode}
                  type='text'
                  className='py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                  placeholder='ZIP Code'
                />
                <Input
                  {...getFieldProps('phoneNumber')}
                  touched={touched.phoneNumber}
                  errors={errors.phoneNumber}
                  type='text'
                  className='py-2 px-3 pe-11 block w-full border border-gray-200 shadow-sm text-sm rounded-lg focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none'
                  placeholder='Phone Number'
                />
              </div>
            </div>
          </form>

          <p className='text-sm text-gray-700 pt-7'>Total:</p>
          <p className='font-bold' style={{ fontSize: 30 }}>
            {new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP' }).format(
              productToPurchase.price * values.quantity,
            )}
          </p>

          <div className='mt-5 flex justify-end gap-x-2'>
            <button
              onClick={() => setProductToPurchase(null)}
              type='button'
              className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none'
            >
              Cancel
            </button>
            <button
              disabled={!isValid}
              type='button'
              className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent bg-sky-600 text-white hover:bg-sky-700 disabled:opacity-50 disabled:pointer-events-none'
            >
              Purchase
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PurchaseForm;
