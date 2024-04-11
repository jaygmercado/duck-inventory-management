'use client';
import './globals.css';
import React, { useEffect } from 'react';
import { Inter } from 'next/font/google';
import { NextAuthProvider } from './providers';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import AOS from 'aos';
import 'aos/dist/aos.css';
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
          <NextAuthProvider>{children}</NextAuthProvider>
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
