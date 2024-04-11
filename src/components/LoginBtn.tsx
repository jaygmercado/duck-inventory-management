'use client';
import React from 'react';
import { signIn } from 'next-auth/react';

const LoginBtn = () => {
  return (
    <button
      className='transition hover:scale-105 inline-flex justify-center items-center gap-x-3 text-center bg-gradient-to-tl from-blue-600 to-emerald-600 hover:from-emerald-600 hover:to-blue-600 shadow-lg shadow-transparent hover:shadow-sky-600/50 border border-transparent text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white py-3 px-5 dark:focus:ring-offset-gray-800'
      onClick={() => {
        signIn('azure-ad', { callbackUrl: '/portal' }, { prompt: 'login' });
      }}
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='16'
        height='16'
        fill='currentColor'
        className='bi bi-person'
        viewBox='0 0 16 16'
      >
        <path d='M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4Zm-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10Z' />
      </svg>
      Log in
    </button>
  );
};

export default LoginBtn;
