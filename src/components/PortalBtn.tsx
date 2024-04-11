import Link from 'next/link';

const PortalBtn = () => {
  return (
    <button className='transition hover:scale-105 flex justify-center items-center gap-x-2 text-center bg-gradient-to-tl from-blue-600 to-emerald-600 hover:from-emerald-600 hover:to-blue-600 shadow-lg shadow-transparent hover:shadow-sky-600/50 border border-transparent text-white text-sm font-medium rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 focus:ring-offset-white p-3 dark:focus:ring-offset-gray-800'>
      <Link href='/portal'>Portal</Link>
      <svg className='w-3 h-3' width='16' height='16' viewBox='0 0 16 16' fill='none'>
        <path
          d='M5.27921 2L10.9257 7.64645C11.1209 7.84171 11.1209 8.15829 10.9257 8.35355L5.27921 14'
          stroke='currentColor'
          strokeWidth='2'
          strokeLinecap='round'
        />
      </svg>
    </button>
  );
};

export default PortalBtn;
