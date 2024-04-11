import Navbar from '@/components/Home/Header';
import './globals.css';
import Footer from '@/components/Home/Footer1';
import Image from 'next/image';

export default async function Home() {
  return (
    <main className='bg-stone-950'>
      <header>
        <Navbar />
      </header>

      {/*Hero*/}
      <div className='relative overflow-hidden pt-16'>
        <div className='max-w-[85rem] mx-auto px-4 sm:px-6 lg:px-8 py-10'>
          <div className='max-w-6xl text-center mx-auto'>
            <h1
              className='tracking-tight mt-1 block font-semibold text-gray-200 text-5xl sm:text-5xl md:text-6xl lg:text-7xl mb-5'
              data-aos='fade-up'
            >
              <span className='bg-clip-text bg-gradient-to-tl from-gray-400 via-30% to-white to-90% text-transparent'>
                Welcome to {''}
              </span>
              <span className='bg-clip-text bg-gradient-to-tl from-sky-500 via-30% to-emerald-500 to-90% text-transparent'>
                CodeSpace
              </span>
            </h1>
            <p className='text-md text-gray-400 md:text-lg lg:text-xl mx-10' data-aos='fade-up'>
              Developing student developers into industry leaders carrying out the values of
              innovation, collaboration, and continuous learning.
            </p>
          </div>

          <div className='mt-10 relative max-w-5xl mx-auto'>
            <div className='w-full object-cover h-96 sm:h-[480px] hero bg-no-repeat bg-center bg-cover rounded-xl' />

            <div className='absolute bottom-12 -start-20 -z-[1] w-48 h-48 bg-gradient-to-b from-orange-500 to-white p-px rounded-lg dark:to-slate-900'>
              <div className='bg-white w-48 h-48 rounded-lg dark:bg-slate-900' />
            </div>

            <div className='absolute -top-12 -end-20 -z-[1] w-48 h-48 bg-gradient-to-t from-blue-600 to-cyan-400 p-px rounded-full'>
              <div className='bg-white w-48 h-48 rounded-full dark:bg-slate-900' />
            </div>
          </div>
        </div>
      </div>

      {/*About*/}
      <section className='about mx-auto'>
        <div data-aos='zoom-in-up' className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='py-12 my-10 md:py-20'>
            <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
              <h1 className='text-white text-5xl mb-7 mt-10 font-bold '>
                <span className='font-semibold bg-clip-text bg-gradient-to-tl from-gray-400 via-30% to-white to-90% text-transparent'>
                  About
                </span>
                <span className='font-semibold bg-clip-text bg-gradient-to-tl from-sky-500 via-30% to-emerald-500 to-90% text-transparent drop-shadow-lg'>
                  {' '}
                  Lasallian CodeSpace.
                </span>
              </h1>
              <p className='text-lg text-gray-400 drop-shadow-lg'>
                Developing student developers into industry leaders carrying out the values of
                innovation, collaboration, and continuous learning. Through these values, we strive
                to drive positive change and contribute to the advancement of technology and
                society.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/*Committees*/}
      <section className='gradientBottom overflow-hidden'>
        <div className='max-w-6xl mx-auto px-4 sm:px-6'>
          <div className='py-12 md:py-20'>
            <div className='max-w-3xl mx-auto text-center pb-12 md:pb-16'>
              <div className='inline-flex text-sm font-normal py-1 px-3 m-2 text-sky-100 bg-transparent border border-sky-600 rounded-full mb-4'>
                Available for Members
              </div>
              <h1 className='text-5xl mb-4 font-bold bg-clip-text bg-gradient-to-tl from-gray-400 via-30% to-white to-90% text-transparent'>
                Committee Teams
              </h1>
              <p className='text-md md:text-lg lg:text-xl text-gray-400'>
                Committes help run the organization by offering their skills and knowledge on the
                respective teams they are in.
              </p>
            </div>

            <div className='grid gap-20'>
              {/* 1st item */}
              <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
                <div
                  className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1 rounded-lg'
                  data-aos='fade-up'
                >
                  <Image
                    className='max-w-full mx-auto md:max-w-none h-auto rounded-lg border border-cyan-600'
                    src='/creatives.jpg'
                    width={540}
                    height={405}
                    alt='Features 01'
                  />
                </div>
                {/* Content */}
                <div
                  className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6'
                  data-aos='fade-right'
                >
                  <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                    <div className='inline-flex text-sm font-semibold py-1 px-3 text-sky-100 bg-sky-950 rounded-full mb-4'>
                      Innovate
                    </div>
                    <h3 className='text-2xl text-white mb-3 font-bold'>Creatives Committee</h3>
                    <p className='text-md md:text-lg lg:text-xl text-gray-400 mb-4'>
                      Creates and visualize engaging materials that can be used in the organizations
                      social media pages and other products that are distributed by the
                      organization.
                    </p>
                  </div>
                </div>
              </div>

              <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
                <div
                  className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1 rounded-lg '
                  data-aos='fade-up'
                >
                  <Image
                    className='max-w-full mx-auto md:max-w-none h-auto rounded-lg border border-cyan-600'
                    src='/publicRelations.jpg'
                    width={540}
                    height={405}
                    alt='Features 01'
                  />
                </div>
                {/* Content */}
                <div
                  className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6'
                  data-aos='fade-right'
                >
                  <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                    <div className='inline-flex text-sm font-semibold py-1 px-3 text-sky-100 bg-sky-950 rounded-full mb-4'>
                      Communicate
                    </div>
                    <h3 className='text-2xl text-white mb-3 font-bold'>
                      Public Relations Committee
                    </h3>
                    <p className='text-md md:text-lg lg:text-xl text-gray-400 mb-4'>
                      Manages external image, engaging stakeholders through media relations through
                      production of captions and campaigning for events.
                    </p>
                  </div>
                </div>
              </div>

              {/* 3rd item */}
              <div className='md:grid md:grid-cols-12 md:gap-6 items-center'>
                <div
                  className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1 rounded-lg'
                  data-aos='fade-up'
                >
                  <Image
                    className='max-w-full mx-auto md:max-w-none h-auto rounded-lg border border-cyan-600'
                    src='/outreach.jpg'
                    width={540}
                    height={405}
                    alt='Features 03'
                  />
                </div>

                <div
                  className='max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6'
                  data-aos='fade-right'
                >
                  <div className='md:pr-4 lg:pr-12 xl:pr-16'>
                    <div className='inline-flex text-sm font-semibold py-1 px-3 text-sky-100 bg-sky-950 rounded-full mb-4'>
                      Engage
                    </div>
                    <h3 className='text-2xl text-white mb-3 font-bold'>
                      Outreach Initiatives Committee
                    </h3>
                    <p className='text-md md:text-lg lg:text-xl text-gray-400 mb-4'>
                      Collaborate on planning outreach programs, coordinate logistics, facilitate,
                      supervise, and document outreach initiatives.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/*Icon Section*/}
      <section>
        <div className='max-w-6xl mx-auto px-4 sm:px-6 justify-center items-center'>
          <div className='py-12 md:py-20 border-t border-gray-800'>
            <div className='max-w-3xl mx-auto text-center pb-12 md:pb-20'>
              <div className='inline-flex text-sm font-normal py-1 px-3 m-2 text-sky-100 bg-transparent border border-sky-600 rounded-full mb-4'>
                Available for Members
              </div>
              <h2 className='text-5xl tracking-tight mb-7 font-bold bg-clip-text bg-gradient-to-tl from-gray-400 via-30% to-white to-90% text-transparent p-3'>
                Technology Teams
              </h2>
              <p className='text-md md:text-lg lg:text-xl text-gray-400'>
                Lasallian CodeSpace invites members to join a variety of teams within its
                collaborative space, fostering engagement and skill development.
              </p>
            </div>

            {/* Items */}
            <div
              className='mx-auto flex flex-wrap justify-center gap-8 md:justify-between md:grid md:grid-cols-2 lg:grid-cols-3 lg:gap-16 items-start md:max-w-2xl lg:max-w-none'
              data-aos-id-blocks
            >
              <div
                className='relative flex flex-col items-center justify-center'
                data-aos='fade-up'
                data-aos-anchor='[data-aos-id-blocks]'
              >
                <div className='relative flex justify-center items-center w-12 h-12 bg-gray-900 rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-slate-900 border border-sky-500 shadow-lg shadow-sky-600 '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    fill='currentColor'
                    className='bi bi-cloud text-sky-400'
                    viewBox='0 0 16 16'
                  >
                    <path d='M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383zm.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z' />
                  </svg>
                </div>
                <h4 className='text-white text-2xl font-bold my-3 text-center'>
                  Cloud & DevOps Team
                </h4>
                <p className='text-lg text-gray-400 text-center'>
                  Manages cloud infrastructure and implements efficient deployment.
                </p>
              </div>

              <div
                className='relative flex flex-col items-center'
                data-aos='fade-up'
                data-aos-anchor='[data-aos-id-blocks]'
              >
                <div className='relative flex justify-center items-center w-12 h-12 bg-gray-900  rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-slate-900 border border-sky-500 shadow-lg shadow-sky-600 '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    fill='currentColor'
                    className='bi bi-bounding-box-circles text-sky-400'
                    viewBox='0 0 16 16'
                  >
                    <path d='M2 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM0 2a2 2 0 0 1 3.937-.5h8.126A2 2 0 1 1 14.5 3.937v8.126a2 2 0 1 1-2.437 2.437H3.937A2 2 0 1 1 1.5 12.063V3.937A2 2 0 0 1 0 2zm2.5 1.937v8.126c.703.18 1.256.734 1.437 1.437h8.126a2.004 2.004 0 0 1 1.437-1.437V3.937A2.004 2.004 0 0 1 12.063 2.5H3.937A2.004 2.004 0 0 1 2.5 3.937zM14 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zM2 13a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z' />
                  </svg>
                </div>
                <h4 className='text-white text-2xl font-bold my-3 text-center'>UI/UX Team</h4>
                <p className='text-lg text-gray-400 text-center'>
                  Designs visually appealing and user-friendly interfaces.
                </p>
              </div>

              <div
                className='relative flex flex-col items-center'
                data-aos='fade-up'
                data-aos-anchor='[data-aos-id-blocks]'
              >
                <div className='relative flex justify-center items-center w-12 h-12 bg-gray-900  rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-slate-900 border border-sky-500 shadow-lg shadow-sky-600 '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    fill='currentColor'
                    className='bi bi-window-sidebar text-sky-400'
                    viewBox='0 0 16 16'
                  >
                    <path d='M2.5 4a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm1 .5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1z' />
                    <path d='M2 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v2H1V3a1 1 0 0 1 1-1h12zM1 13V6h4v8H2a1 1 0 0 1-1-1zm5 1V6h9v7a1 1 0 0 1-1 1H6z' />
                  </svg>
                </div>
                <h4 className='text-white text-2xl font-bold my-3 text-center'>
                  Web Development Team
                </h4>
                <p className='text-lg text-gray-400 text-center'>
                  Develops and maintains user-friendly websites.
                </p>
              </div>

              <div
                className='relative flex flex-col items-center'
                data-aos='fade-up'
                data-aos-anchor='[data-aos-id-blocks]'
              >
                <div className='relative flex justify-center items-center w-12 h-12 bg-gray-900  rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-slate-900 border border-sky-500 shadow-lg shadow-sky-600 '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    fill='currentColor'
                    className='bi bi-clipboard-data text-sky-400'
                    viewBox='0 0 16 16'
                  >
                    <path d='M4 11a1 1 0 1 1 2 0v1a1 1 0 1 1-2 0v-1zm6-4a1 1 0 1 1 2 0v5a1 1 0 1 1-2 0V7zM7 9a1 1 0 0 1 2 0v3a1 1 0 1 1-2 0V9z' />
                    <path d='M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z' />
                    <path d='M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z' />
                  </svg>
                </div>
                <h4 className='text-white text-2xl font-bold my-3 text-center'>
                  Data Science Team
                </h4>
                <p className='text-lg text-gray-400 text-center'>
                  Specializes in leveraging analytics and machine learning to derive valuable
                  insights.
                </p>
              </div>

              <div
                className='relative flex flex-col items-center'
                data-aos='fade-up'
                data-aos-anchor='[data-aos-id-blocks]'
              >
                <div className='relative flex justify-center items-center w-12 h-12 bg-gray-900  rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-slate-900 border border-sky-500 shadow-lg shadow-sky-600 '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    fill='currentColor'
                    className='bi bi-phone text-sky-400'
                    viewBox='0 0 16 16'
                  >
                    <path d='M11 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h6zM5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H5z' />
                    <path d='M8 14a1 1 0 1 0 0-2 1 1 0 0 0 0 2z' />
                  </svg>
                </div>
                <h4 className='text-white text-2xl font-bold my-3 text-center'>
                  Mobile Development Team
                </h4>
                <p className='text-lg text-gray-400 text-center'>
                  Excels in creating innovative cross-platform applications.
                </p>
              </div>

              <div
                className='relative flex flex-col items-center'
                data-aos='fade-up'
                data-aos-anchor='[data-aos-id-blocks]'
              >
                <div className='relative flex justify-center items-center w-12 h-12 bg-gray-900  rounded-xl before:absolute before:-inset-px before:-z-[1] before:bg-gradient-to-br before:from-blue-600 before:via-transparent before:to-violet-600 before:rounded-xl dark:bg-slate-900 border border-sky-500 shadow-lg shadow-sky-600 '>
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    width='30'
                    height='30'
                    fill='currentColor'
                    className='bi bi-code-slash text-sky-400'
                    viewBox='0 0 16 16'
                  >
                    <path d='M10.478 1.647a.5.5 0 1 0-.956-.294l-4 13a.5.5 0 0 0 .956.294l4-13zM4.854 4.146a.5.5 0 0 1 0 .708L1.707 8l3.147 3.146a.5.5 0 0 1-.708.708l-3.5-3.5a.5.5 0 0 1 0-.708l3.5-3.5a.5.5 0 0 1 .708 0zm6.292 0a.5.5 0 0 0 0 .708L14.293 8l-3.147 3.146a.5.5 0 0 0 .708.708l3.5-3.5a.5.5 0 0 0 0-.708l-3.5-3.5a.5.5 0 0 0-.708 0z' />
                  </svg>
                </div>
                <h4 className='text-white text-2xl font-bold my-3 text-center'>
                  Bootcamp Dev Team
                </h4>
                <p className='text-lg text-gray-400 text-center'>
                  Empowers aspiring developers to create and develop web applications through
                  intensive training programs.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
