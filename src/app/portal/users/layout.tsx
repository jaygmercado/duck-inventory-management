'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import notify from '@/utils/notify';
import { User, UserContextType } from '@/types/users';

const UserContext = createContext<UserContextType>({ users: [], setUsers: () => {} });
export const useUsers = () => useContext(UserContext);

const loadUsers = async () => {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('unable to fetch users');

  return (await res.json().then((res) => res.data)) as User[];
};

export default function UsersLayout({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    loadUsers()
      .then(setUsers)
      .catch(() => notify('Error', 'Unable to retrieve users'));
  }, []);

  return (
    <UserContext.Provider value={{ users, setUsers }}>
      <main>
        <h1 className='font-bold text-2xl mb-5'>Users</h1>
        <div className='flex flex-col'>
          <div className='-m-1.5 overflow-x-auto'>
            <div className='p-1.5 min-w-full inline-block align-middle'>
              <div className='border shadow rounded-lg divide-y divide-gray-200 dark:border-gray-700 dark:divide-gray-700'>
                {children}
              </div>
            </div>
          </div>
        </div>
      </main>
    </UserContext.Provider>
  );
}
