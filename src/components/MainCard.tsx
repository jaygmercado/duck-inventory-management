'use client';
import React from 'react';

const MainCard = ({ children }: { children: React.ReactNode }) => {
  return (
    <div
      id='main-card'
      className='grow overflow-y-auto p-5 rounded-lg shadow-lg border border-gray-200 bg-white border-b dark:bg-gray-800 dark:border-gray-700'
    >
      {children}
    </div>
  );
};

export default MainCard;
