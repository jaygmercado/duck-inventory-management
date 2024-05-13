'use client';
import './globals.css';
import React from 'react';
import { SessionProvider } from 'next-auth/react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en'>
      <body>
        <main>
          <SessionProvider>
            <ToastContainer />
            {children}
          </SessionProvider>
        </main>
      </body>
    </html>
  );
}
