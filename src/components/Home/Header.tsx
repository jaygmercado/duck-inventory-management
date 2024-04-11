import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import Link from 'next/link';
import LoginBtn from '@/components/LoginBtn';
import Image from 'next/image';
import PortalBtn from '../PortalBtn';

export default async function Header() {
  const session: { user: { name: string; email: string; image: string } } | null =
    await getServerSession(authOptions);

  return (
    <header className='absolute w-full z-30'>
      <div className='max-w-6xl mx-auto px-4 sm:px-6'>
        <div className='flex items-center justify-between h-20'>
          <div className='shrink-0'>
            <Link href='/' className='block'>
              <Image src='/LCS_logo_light.svg' width={150} height={150} alt='lcsLogo' />
            </Link>
          </div>

          <div className='flex justify-end items-end'>{session ? <PortalBtn /> : <LoginBtn />}</div>
        </div>
      </div>
    </header>
  );
}
