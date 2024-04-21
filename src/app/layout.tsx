'use client';
import './globals.css';
import React, { useEffect } from 'react';
import { Inter } from 'next/font/google';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
import SidebarHeader from '@/components/SidebarHeader';
import MainCard from '@/components/MainCard';
import Footer from '@/components/Footer';
const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    import('preline');
    AOS.init({ duration: 500 });
  }, []);

  return (
    <html lang='en'>
      <body className={`${inter.className} overflow-x-hidden overflow-y-scroll grow`}>
        <main>
          <ToastContainer />
          <SidebarHeader />
          <div className='flex flex-col w-full py-4 px-4 sm:px-6 md:px-8 lg:pl-72 card'>
            <MainCard>{children}</MainCard>
          </div>
          <Footer />
        </main>
      </body>
    </html>
  );
}
