const MainFooter = () => {
  return (
    <footer className='w-full py-5 px-4 sm:px-6 lg:px-8 mx-auto border border-t-2'>
      <div className='text-center'>
        <div>
          <a className='flex-none text-xl font-semibold text-black' href='#' aria-label='Brand'>
            <img
              className='mx-auto'
              src='https://upload.wikimedia.org/wikipedia/commons/2/24/Adidas_logo.png'
              alt='adidas logo'
              height={50}
              width={50}
            />
          </a>
        </div>
        <div className='mt-3'>
          <p className='text-gray-600'>Impossible is Nothing</p>
          <p className='text-sm text-gray-500'>© Adidas. 2024. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default MainFooter;
