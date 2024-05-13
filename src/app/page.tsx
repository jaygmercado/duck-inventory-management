'use client';

import React from 'react';
import { signIn, useSession } from 'next-auth/react';
import Link from 'next/link';

export default function App() {
  const session = useSession();
  return (
    <main className='h-full'>
      <h1 className='font-bold text-2xl mb-5'>Welcome</h1>
      {session.status === 'authenticated' ? (
        <Link href='/admin'>Admin</Link>
      ) : (
        <button onClick={() => signIn()}>Sign In</button>
      )}
    </main>
  );
}
