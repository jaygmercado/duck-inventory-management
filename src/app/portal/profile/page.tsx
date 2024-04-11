import React from 'react';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Profile from '@/components/Profile';

async function ProfilePage() {
  const session: { user: { name: string; email: string; image: string } } | null =
    await getServerSession(authOptions);

  return (
    <div className='relative w-full h-full'>
      <Profile userEmail={session?.user.email} userImg={session?.user.image} />
    </div>
  )
}

export default ProfilePage