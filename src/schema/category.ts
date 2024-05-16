import * as Yup from 'yup';

export const categorySchema = Yup.object({
  name: Yup.string().max(50, 'Name must not exceed 50 characters').required('Required'),
});
