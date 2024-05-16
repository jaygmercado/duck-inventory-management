'use client';

import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Inter } from 'next/font/google';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SidebarHeader from '@/components/SidebarHeader';
import MainCard from '@/components/MainCard';
import Footer from '@/components/Footer';
import { redirect } from 'next/navigation';
const inter = Inter({ subsets: ['latin'] });

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = useSession();

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('preline');
    AOS.init({ duration: 500 });
  }, []);

  // if (session.status === 'unauthenticated') redirect('/');

  return (
    <main className={`${inter.className} overflow-x-hidden overflow-y-scroll grow`}>
      <SidebarHeader />
      <div className='flex flex-col w-full py-4 px-4 sm:px-6 md:px-8 lg:pl-72 card'>
        <MainCard>{children}</MainCard>
      </div>
      <Footer />
    </main>
  );
}
