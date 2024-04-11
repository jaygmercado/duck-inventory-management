import * as Yup from 'yup';

export const basicProfileSchema = Yup.object({
  cys: Yup.string().max(5, 'Must not exceed 5 characters'),
  dateOfBirth: Yup.date().required()
})

export const userTitleSchema = Yup.object({
  title: Yup.string().max(30)
})