'use client';
import React from 'react';
import Image from 'next/image';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import SidebarItems from './SidebarItems';
import SidebarLink from './SidebarLink';

const SidebarHeader = () => {
  return (
    <div>
      <header className='sticky top-0 inset-x-0 flex flex-wrap sm:justify-start sm:flex-nowrap z-[48] w-full bg-white border-b text-sm py-2.5 sm:py-4 lg:pl-64 dark:bg-gray-800 dark:border-gray-700'>
        <nav
          className='flex basis-full items-center w-full mx-auto px-4 sm:px-6 md:px-4'
          aria-label='Global'
        >
          <button
            type='button'
            className='text-gray-500 hover:text-gray-600 sticky top-0 inset-x-0 z-20  px-4 mr-232 sm:px-6 md:px-4 md:mr-2 lg:hidden'
            data-hs-overlay='#application-sidebar'
            aria-controls='application-sidebar'
            aria-label='Toggle navigation'
          >
            <span className='sr-only'>Toggle Navigation</span>
            <svg className='w-5 h-5' width='20' height='20' fill='currentColor' viewBox='0 0 16 16'>
              <path
                fillRule='evenodd'
                d='M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z'
              />
            </svg>
          </button>
          <div className='mr-5 lg:mr-0 lg:hidden mt-2'>
            <Link
              className='flex-none text-xl font-semibold dark:text-white'
              href='#'
              aria-label='Brand'
            >
              <Image src='/adidas.png' width={185} height={185} alt='LCS' priority />
            </Link>
          </div>

          <div className='w-full flex items-center justify-end ml-auto sm:justify-between sm:gap-x-3 sm:order-3'>
            <div className='sm:hidden'>
              <button
                type='button'
                className='inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800'
              >
                <svg
                  className='w-3.5 h-3.5'
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                </svg>
              </button>
            </div>

            <div className='hidden sm:block'>
              <label htmlFor='icon' className='sr-only'>
                Search
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 flex items-center pointer-events-none z-20 pl-4'>
                  <svg
                    className='h-4 w-4 text-gray-400'
                    xmlns='http://www.w3.org/2000/svg'
                    width='16'
                    height='16'
                    fill='currentColor'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z' />
                  </svg>
                </div>
                <input
                  type='text'
                  id='icon'
                  name='icon'
                  className='py-2 px-4 pl-11 block w-full border-gray-200 shadow-sm rounded-md text-sm focus:z-10 focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400'
                  placeholder='Search'
                />
              </div>
            </div>

            <div className='flex flex-row items-center justify-end gap-2'>
              <button
                type='button'
                className='hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800'
                data-hs-offcanvas='#hs-offcanvas-right'
              >
                <svg
                  className='w-3.5 h-3.5'
                  xmlns='http://www.w3.org/2000/svg'
                  width='16'
                  height='16'
                  fill='currentColor'
                  viewBox='0 0 16 16'
                >
                  <path d='M5.5 2A3.5 3.5 0 0 0 2 5.5v5A3.5 3.5 0 0 0 5.5 14h5a3.5 3.5 0 0 0 3.5-3.5V8a.5.5 0 0 1 1 0v2.5a4.5 4.5 0 0 1-4.5 4.5h-5A4.5 4.5 0 0 1 1 10.5v-5A4.5 4.5 0 0 1 5.5 1H8a.5.5 0 0 1 0 1H5.5z' />
                  <path d='M16 3a3 3 0 1 1-6 0 3 3 0 0 1 6 0z' />
                </svg>
              </button>

              <div className='hs-dropdown relative inline-flex [--placement:bottom-right]'>
                <button
                  id='hs-dropdown-with-header'
                  type='button'
                  className='hs-dropdown-toggle inline-flex flex-shrink-0 justify-center items-center gap-2 h-[2.375rem] w-[2.375rem] rounded-full font-medium bg-white text-gray-700 align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 focus:ring-offset-white transition-all text-xs dark:bg-gray-800 dark:hover:bg-slate-800 dark:text-gray-400 dark:hover:text-white dark:focus:ring-gray-700 dark:focus:ring-offset-gray-800'
                >
                  <Image
                    className='inline-block rounded-full ring-2 ring-white dark:ring-gray-800'
                    src='/admin.png'
                    alt='Image Description'
                    width={32}
                    height={32}
                  />
                </button>

                <div
                  className='hs-dropdown-menu transition-[opacity,margin] duration hs-dropdown-open:opacity-100 opacity-0 hidden min-w-[15rem] bg-white shadow-md rounded-lg p-2 dark:bg-gray-800 dark:border dark:border-gray-700'
                  aria-labelledby='hs-dropdown-with-header'
                >
                  <div className='py-3 px-5 -m-2 bg-gray-100 rounded-t-lg dark:bg-gray-700'>
                    <p className='text-sm text-gray-500 dark:text-gray-400'>
                      Signed in as <strong>Admin</strong>
                    </p>
                  </div>
                  <div className='mt-2 py-2 first:pt-0 last:pb-0'>
                    <span
                      className='flex items-center gap-x-3.5 py-2 px-3 rounded-md text-sm text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-blue-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300'
                      onClick={() => signOut()}
                    >
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        width='16'
                        height='16'
                        fill='currentColor'
                        className='bi bi-box-arrow-left'
                        viewBox='0 0 16 16'
                      >
                        <path
                          fillRule='evenodd'
                          d='M6 12.5a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v2a.5.5 0 0 1-1 0v-2A1.5 1.5 0 0 1 6.5 2h8A1.5 1.5 0 0 1 16 3.5v9a1.5 1.5 0 0 1-1.5 1.5h-8A1.5 1.5 0 0 1 5 12.5v-2a.5.5 0 0 1 1 0v2z'
                        />
                        <path
                          fillRule='evenodd'
                          d='M.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L1.707 7.5H10.5a.5.5 0 0 1 0 1H1.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z'
                        />
                      </svg>
                      Sign Out
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div
        id='application-sidebar'
        className='hs-overlay hs-overlay-open:translate-x-0 -translate-x-full transition-all duration-300 transform hidden fixed top-0 left-0 bottom-0 z-[49] w-64 bg-white border-r border-gray-200 pt-6 pb-10 overflow-y-auto scrollbar-y lg:block lg:translate-x-0 lg:right-auto lg:bottom-0 dark:scrollbar-y dark:bg-gray-800 dark:border-gray-700'
      >
        <div className='flex justify-between px-8'>
          <Link
            className='flex-none text-xl font-semibold dark:text-white'
            href='#'
            aria-label='Brand'
          >
            <Image src='/adidas.png' width={60} height={60} alt='Adidas' priority />
          </Link>

          <button
            type='button'
            className='w-8 h-8 inline-flex justify-center items-center gap-2 rounded-md text-gray-600 hover:text-gray-400 transition dark:border-gray-700 sm:block lg:hidden'
            data-hs-overlay='#application-sidebar'
            aria-controls='application-sidebar'
            aria-label='Toggle navigation'
          >
            <span className='sr-only'>Close Sidebar</span>
            <svg className='w-4 h-4' width='16' height='16' fill='currentColor' viewBox='0 0 16 16'>
              <path d='M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z' />
            </svg>
          </button>
        </div>

        <nav
          className='hs-accordion-group p-6 w-full flex flex-col flex-wrap'
          data-hs-accordion-always-open
        >
          <ul className='space-y-1.5'>
            {SidebarItems.map((item) => {
              return (
                <SidebarLink key={item.name} name={item.name} path={item.path} icon={item.icon} />
              );
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SidebarHeader;
