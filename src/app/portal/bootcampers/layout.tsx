'use client';
import { createContext, useContext, useEffect, useState } from 'react';
import notify from '@/utils/notify';
import { User } from '@/types/users';
import { BootcamperContext } from '@/types/bootcampers';

const BootcamperContext = createContext<BootcamperContext>({
  bootcampers: [],
  setBootcampers: () => {},
});
export const useBootcampers = () => useContext(BootcamperContext);

const loadBootcampers = async () => {
  const res = await fetch('/api/bootcampers');
  if (!res.ok) throw new Error('unable to fetch bootcampers');

  return (await res.json().then((res) => res.data)) as User[];
};

export default function BootcampersLayout({ children }: { children: React.ReactNode }) {
  const [bootcampers, setBootcampers] = useState<User[]>([]);

  useEffect(() => {
    loadBootcampers()
      .then(setBootcampers)
      .catch(() => notify('Error', 'Unable to retrieve bootcampers'));
  }, []);

  return (
    <BootcamperContext.Provider value={{ bootcampers, setBootcampers }}>
      <main>
        <h1 className='font-bold text-2xl mb-5'>Bootcampers</h1>
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
    </BootcamperContext.Provider>
  );
}
