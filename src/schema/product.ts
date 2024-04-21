import * as Yup from 'yup';

export const productSchema = Yup.object({
  name: Yup.string().max(50, 'Name must not exceed 50 characters').required('Required'),
  description: Yup.string()
    .max(50, 'Description must not exceed 500 characters')
    .required('Required'),
  price: Yup.number().min(0).required(),
  quantity: Yup.string().min(0).required(),
  category: Yup.string().required(),
  supplier: Yup.string().required(),
});
