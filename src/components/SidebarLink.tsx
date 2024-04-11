import React from 'react';
import Link from 'next/link';

const SidebarLink = ({
  name,
  icon,
  path,
  dropdown,
  subItems = [],
}: {
  name: string;
  icon: React.ReactNode;
  path: string;
  dropdown?: boolean;
  subItems?: { subName: string; subPath: string }[];
}) => {
  return (
    <div>
      {!dropdown ? (
        <li key={name} className='font-medium'>
          <Link
            className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-900 dark:text-white active:bg-gray-100'
            href={path}
          >
            {icon}
            {name}
          </Link>
        </li>
      ) : (
        <li className='hs-accordion font-medium'>
          <Link
            className='hs-accordion-toggle flex items-center gap-x-3.5 py-2 px-2.5 hs-accordion-active:text-teal-700 hs-accordion-active:hover:bg-transparent text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-900 dark:text-slate-400 dark:hover:text-slate-300 dark:hs-accordion-active:text-white'
            href={path}
          >
            {icon}
            {name}
            <svg
              className='hs-accordion-active:block ml-auto hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
            <svg
              className='hs-accordion-active:hidden ml-auto block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400'
              width='16'
              height='16'
              viewBox='0 0 16 16'
              fill='none'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                d='M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
              />
            </svg>
          </Link>

          <div className='hs-accordion-content w-full overflow-hidden transition-[height] duration-300 hidden'>
            <ul className='pt-2 pl-2 font-normal'>
              {subItems.map((item) => {
                return (
                  <li key={item.subName}>
                    <Link
                      className='flex items-center gap-x-3.5 py-2 px-2.5 text-sm text-slate-700 rounded-md hover:bg-gray-100 dark:bg-gray-800 dark:text-slate-400 dark:hover:text-slate-300'
                      href={item.subPath}
                    >
                      {item.subName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </li>
      )}
    </div>
  );
};

export default SidebarLink;
