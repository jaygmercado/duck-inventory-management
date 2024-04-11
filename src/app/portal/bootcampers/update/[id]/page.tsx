'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { useBootcampers } from '../../layout';
import Input from '@/components/Input';
import TextArea from '@/components/TextArea';
import MultipleSelect from '@/components/MultipleSelect';
import notify from '@/utils/notify';
import { userValidationSchema } from '@/schema/user';
import { UserRoles } from '@/utils/enums';
import { User } from '@/types/users';

const updateUser = async (id: string, data: Partial<User>) => {
  const res = await fetch(`/api/users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update user');
  return (await res.json()) as User;
};

const fetchRequest = async (id: string) => {
  const res = await fetch(`/api/users/${id}`);
  if (!res.ok) throw new Error('unable to fetch user data');
  return res.json().then((res) => res.data as User);
};

function UpdateUsers() {
  const router = useRouter();
  const { setBootcampers } = useBootcampers();
  const [submitting, setSubmitting] = useState(false);
  const [userData, setUserData] = useState<User | null>(null);
  const { id } = useParams();
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchRequest(id as string)
      .then((res) => {
        setUserData(res);
        setFetching(false);
      })
      .catch(() => notify('Error', `Cannot find User: ${id}`));
  }, [id]);

  const { setFieldValue, touched, handleSubmit, getFieldProps, errors, values, isValid } =
    useFormik({
      enableReinitialize: true,
      initialValues: {
        name: userData?.name || '',
        cys: userData?.cys || '',
        title: userData?.title || '',
        bio: userData?.bio || '',
        roles: userData?.roles || [],
      },
      onSubmit: (values) => {
        setSubmitting(true);
        updateUser(id as string, values)
          .then((newUser) => {
            setBootcampers((currentState) =>
              currentState.map((user) => {
                if (user._id === newUser._id) return newUser;
                return user;
              }),
            );
            notify('Success', 'User Successfuly Updated');
            router.push('/portal/users');
          })
          .catch(() => {
            notify('Error', 'Unable to update User');
            router.push('/portal/users');
          });
      },
      validationSchema: userValidationSchema,
    });

  const onMultipleSelect = useCallback(
    (items: string[]) => {
      setFieldValue('roles', items);
    },
    [setFieldValue],
  );

  if (submitting) return <div>Submitting</div>;

  return (
    <form onSubmit={handleSubmit} className='p-10 space-y-5'>
      {/* Name */}
      <div>
        <label htmlFor='name' className='block text-sm font-medium mb-2 dark:text-white'>
          Name
        </label>
        <Input
          {...getFieldProps('name')}
          disabled={fetching}
          touched={touched.name}
          errors={errors.name}
          placeholder={fetching ? 'loading...' : ''}
        />
      </div>

      {/* CYS */}
      <div>
        <label htmlFor='cys' className='block text-sm font-medium mb-2 dark:text-white'>
          CYS
        </label>
        <Input
          {...getFieldProps('cys')}
          disabled={fetching}
          touched={touched.title}
          errors={errors.title}
          placeholder={fetching ? 'loading...' : ''}
        />
      </div>

      <div className='flex justify-between'>
        {/* Title */}
        <div>
          <label htmlFor='title' className='block text-sm font-medium mb-2 dark:text-white'>
            Title
          </label>
          <Input
            {...getFieldProps('title')}
            disabled={fetching}
            touched={touched.title}
            errors={errors.title}
            placeholder={fetching ? 'loading...' : ''}
          />
        </div>

        {/* Role */}
        <div>
          <label htmlFor='roles'>Roles:</label>
          <MultipleSelect value={values.roles} items={Object.values(UserRoles)} onSelected={onMultipleSelect} />
        </div>
      </div>

      {/* Bio */}
      <div>
        <label htmlFor='bio' className='block text-sm font-medium mb-2 dark:text-white'>
          Bio
        </label>
        <TextArea
          {...getFieldProps('bio')}
          disabled={fetching}
          touched={touched.bio}
          errors={errors.bio}
          placeholder={fetching ? 'loading...' : ''}
        />
      </div>

      <div className='space-x-4 flex justify-end'>
        <button
          disabled={!isValid}
          type='button'
          onClick={() => router.push('/portal/users')}
          className='disabled:cursor-not-allowed py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-gray-200 font-semibold text-gray-500 hover:text-white hover:bg-gray-500 hover:border-gray-500 focus:outline-none focus:ring-2 focus:ring-gray-200 focus:ring-offset-2 transition-all text-sm  dark:hover:bg-gray-600 dark:border-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-600 dark:focus:ring-offset-gray-800'
        >
          Cancel
        </button>
        <button
          disabled={!isValid}
          type='submit'
          className='disabled:cursor-not-allowed py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border-2 border-green-200 font-semibold text-green-500 hover:text-white hover:bg-green-500 hover:border-green-500 focus:outline-none focus:ring-2 focus:ring-green-200 focus:ring-offset-2 transition-all text-sm dark:focus:ring-offset-gray-800'
        >
          Update
        </button>
      </div>
    </form>
  );
}

export default UpdateUsers;
