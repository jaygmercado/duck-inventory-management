import * as Yup from 'yup';

export const supplierSchema = Yup.object({
  name: Yup.string().max(50, 'Name must not exceed 50 characters').required('Required'),
  contactNumber: Yup.string()
    .matches(/^\d{11}$/, 'Number must be 11 digits')
    .required('Required'),
  email: Yup.string().email('Invalid email address').required('Required'),
  website: Yup.string()
    .matches(
      /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/,
      'Invalid website URL',
    )
    .required('Required'),
});
