import React from 'react';

const Navbar = () => {
  return (
    <header className='flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full py-5'>
      <nav className='container w-full flex flex-wrap mx-auto'>
        <div className='md:col-span-3'>
          <a
            className='flex-none rounded-xl text-xl inline-block font-semibold focus:outline-none focus:opacity-80'
            href='/'
            aria-label='Adidas'
          >
            <img
              src='https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png'
              alt='adidas logo'
              height={80}
              width={80}
            />
          </a>
        </div>

        <div className='flex items-center gap-x-2 ms-auto py-1 md:ps-6 md:order-3 md:col-span-3'>
          <button
            type='button'
            className='py-2 px-3 inline-flex items-center gap-x-2 text-sm font-medium rounded-xl border border-gray-200 text-black hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none'
          >
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              fill='current'
              className='bi bi-person-fill-gear'
              viewBox='0 0 16 16'
            >
              <path d='M11 5a3 3 0 1 1-6 0 3 3 0 0 1 6 0m-9 8c0 1 1 1 1 1h5.256A4.5 4.5 0 0 1 8 12.5a4.5 4.5 0 0 1 1.544-3.393Q8.844 9.002 8 9c-5 0-6 3-6 4m9.886-3.54c.18-.613 1.048-.613 1.229 0l.043.148a.64.64 0 0 0 .921.382l.136-.074c.561-.306 1.175.308.87.869l-.075.136a.64.64 0 0 0 .382.92l.149.045c.612.18.612 1.048 0 1.229l-.15.043a.64.64 0 0 0-.38.921l.074.136c.305.561-.309 1.175-.87.87l-.136-.075a.64.64 0 0 0-.92.382l-.045.149c-.18.612-1.048.612-1.229 0l-.043-.15a.64.64 0 0 0-.921-.38l-.136.074c-.561.305-1.175-.309-.87-.87l.075-.136a.64.64 0 0 0-.382-.92l-.148-.045c-.613-.18-.613-1.048 0-1.229l.148-.043a.64.64 0 0 0 .382-.921l-.074-.136c-.306-.561.308-1.175.869-.87l.136.075a.64.64 0 0 0 .92-.382zM14 12.5a1.5 1.5 0 1 0-3 0 1.5 1.5 0 0 0 3 0' />
            </svg>
            Sign In as Admin
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
