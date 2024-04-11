'use client';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@/types/users';
import notify from '@/utils/notify';
import BasicInfo from './BasicInfo';
import Bio from './Bio';
import CoverPhoto from './CoverPhoto';

const fetchUserData = async (userEmail: string) => {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('unable to fetch users');

  return await res.json().then((res: { data: User[] }) =>
    res.data.find((userItem) => {
      if (userItem.email === userEmail) return true;
      return false;
    }),
  );
};

interface EditContext {
  editProgress: boolean;
  setEditProgress: React.Dispatch<React.SetStateAction<boolean>> | null;
}
const EditContext = createContext<EditContext>({ editProgress: false, setEditProgress: null });
export const useEditState = () => useContext(EditContext);

interface ProfileContainerProps {
  userEmail: string | undefined;
  userImg: string | undefined;
}
const Profile: React.FC<ProfileContainerProps> = ({ userEmail }) => {
  const [user, setUser] = useState<User | null | undefined>(undefined);
  const [editProgress, setEditProgress] = useState(false);

  useEffect(() => {
    if (userEmail)
      fetchUserData(userEmail)
        .then(setUser)
        .catch(() => {
          notify('Error', 'Unable to find user');
          setUser(null);
        });
    else {
      notify('Error', 'User email is empty');
      setUser(null);
    }
  }, [userEmail]);

  const updateUserData = async (userId: string, newData: User) => {
    const res = await fetch(`/api/users/${userId}`, {
      method: 'PUT',
      body: JSON.stringify(newData),
    });

    setEditProgress(false);
    if (!res.ok) {
      notify('Error', 'update user failed');
      throw new Error('failed to update user');
    }

    notify('Success', 'user successfully updated');
    await res.json().then((res) => setUser(res.data as User));
  };

  if (user === null) return <div>User does not exist</div>;
  else if (user === undefined) return <div>User data loading</div>;
  return (
    <EditContext.Provider value={{ editProgress, setEditProgress }}>
      <div className='absolute top-[-1.25rem] bottom-[-1.25rem] left-[-1.25rem] right-[-1.25rem]'>
        {/* Cover photo */}
        <CoverPhoto
          coverPhoto={user.coverPhoto}
          onSubmit={(coverPhoto) =>
            updateUserData(user._id, { ...user, coverPhoto: coverPhoto as string })
          }
        />

        {/* Main content */}
        <div className='relative mt-10 z-10 space-y-10 px-7 pb-10 md:px-10 lg:space-y-14'>
          <div className='flex flex-col justify-center items-center space-y-4 lg:flex-row lg:space-x-10 lg:space-y-0 lg:justify-start lg:ml-18'>
            <div className='flex flex-col items-center text-gray-400 lg:space-y-5 lg:items-start'>
              <h1 className='text-xl text-center md:text-3xl text-black lg:text-4xl'>
                {user.name}
              </h1>
              <p className='text-md md:text-xl lg:text-2xl'>{user.title}</p>
            </div>
          </div>
          <div className='space-y-10 grid grid-cols-1 xl:grid-cols-3 xl:space-y-0 gap-3'>
            <BasicInfo
              onEdit={(values) => updateUserData(user._id, { ...user, ...values })}
              email={user.email}
              dateOfBirth={user.dateOfBirth}
              cys={user.cys}
            />

            <section className='space-y-6 xl:col-span-2'>
              <Bio bio={user.bio} onEdit={(bio) => updateUserData(user._id, { ...user, bio })} />
              <section>
                <div className='flex space-x-5 items-center mb-4'>
                  <h2 className='text-gray-400 text-sm'>Roles</h2>
                </div>
                <div className='space-y-2'>
                  {user.roles.map((role) => (
                    <p key={role} className=''>
                      {role}
                    </p>
                  ))}
                  {user.roles.length === 0 && <h3 className='text-gray-300'>No roles given</h3>}
                </div>
              </section>
            </section>
          </div>
        </div>
      </div>
    </EditContext.Provider>
  );
};

export default Profile;
