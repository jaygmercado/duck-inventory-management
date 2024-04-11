import '../globals.css';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import SidebarHeader from '@/components/SidebarHeader';
import MainCard from '@/components/MainCard';
import Footer from '@/components/Footer';
import { User } from '@/types/users';

export default async function PortalLayout({ children }: { children: React.ReactNode }) {
  const session: {
    user: { name: string; email: string; image: string; _doc: User };
  } | null = await getServerSession(authOptions);

  if (!session) redirect('/');

  return (
    <div>
      <SidebarHeader
        email={session.user.email}
        image={session.user.image}
        userRoles={session?.user._doc.roles}
      />
      <div className='flex flex-col w-full py-4 px-4 sm:px-6 md:px-8 lg:pl-72 card'>
        <MainCard>{children}</MainCard>
      </div>
      <Footer />
    </div>
  );
}
