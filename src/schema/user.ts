import * as Yup from 'yup';

export const userValidationSchema = Yup.object({
  name: Yup.string().max(50, 'Name must not exceed 50 characters').required('Required'),
  cys: Yup.string().max(5, 'Must not exceed 5 characters'),
  title: Yup.string().max(50, 'Must not exceed 50 characters'),
  bio: Yup.string(),
  role: Yup.array().of(Yup.string())
})