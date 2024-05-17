import * as Yup from 'yup';

export const purchaseSchema = (maxQuantity: number) =>
  Yup.object({
    quantity: Yup.number()
      .min(1)
      .max(maxQuantity, `Sorry, we don't have enough stock. Max quantity is ${maxQuantity}.`)
      .required('Required'),
    barangay: Yup.string().required('Required'),
    city: Yup.string().required('Required'),
    province: Yup.string().required('Required'),
    zipCode: Yup.string()
      .matches(/^[0-9]+$/, 'Must be only digits')
      .required('Required'),
    phoneNumber: Yup.string()
      .matches(/^\d{11}$/, 'Number must be 11 digits')
      .required('Required'),
  });
