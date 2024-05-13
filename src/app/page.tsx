'use client';

import { signIn } from 'next-auth/react';
import React from 'react';

export default function App() {
  return (
    <main className='h-full '>
      <h1 className='font-bold text-2xl mb-5'>Welcome</h1>
      <button onClick={() => signIn()}>Sign In</button>
    </main>
  );
}
