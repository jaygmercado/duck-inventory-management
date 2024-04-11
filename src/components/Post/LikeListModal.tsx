import { User } from '@/types/users';
import Image from 'next/image';
import React from 'react';

interface LikeListModalProps {
  postId: string;
  users: User[]
}
const LikeListModal: React.FC<LikeListModalProps> = ({ postId, users }) => {
  return (
    <div id={`post-like-list-${postId}`} className="hs-overlay hidden fixed top-0 left-0 bottom-0 right-0 z-[60] overflow-x-hidden overflow-y-auto">
      <div className="hs-overlay-open:mt-7 hs-overlay-open:opacity-100 hs-overlay-open:duration-500 mt-0 opacity-0 ease-out transition-all sm:max-w-lg sm:w-full m-3 sm:mx-auto min-h-[calc(100%-3.5rem)] flex items-center">
        <div className="w-full flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-slate-700/[.7]">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-gray-700">
            <h3 className="font-bold text-gray-800 dark:text-white">
              People Who Liked This
            </h3>
            <button data-hs-overlay={`#post-like-list-${postId}`} type="button" className="flex justify-center items-center w-7 h-7 text-sm font-semibold rounded-full border border-transparent text-gray-800 hover:bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-white dark:hover:bg-gray-700 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600 hover:cursor-pointer">
              <span className="sr-only">Close</span>
              <svg className="flex-shrink-0 w-4 h-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
            </button>
          </div>
          <div className="p-4 overflow-y-auto">
            {users.map(user => (
              <div className='pl-8 py-2 flex items-center gap-5 overflow-auto hover:bg-slate-200/50' key={user._id}>
                <Image
                  src={user.image}
                  alt="User's Profile"
                  width={35}
                  height={35}
                  className='rounded-full inline my-1'
                />
                {user.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LikeListModal;