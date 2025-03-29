import { SignedOut, UserButton } from '@clerk/clerk-react';
import { LayoutDashboardIcon } from 'lucide-react';
import { Link } from 'react-router-dom';
import SignInAuthButton from './SignInAuthButton';
import { useAuthStore } from '@/stores/useAuthStore';
import { cn } from '@/lib/utils';
import { buttonVariants } from './ui/button';

function Topbar() {
  const { isAdmin } = useAuthStore();
  return (
    <div className='flex items-center justify-between p-4 sticky top-0 bg-zinc-900/75 backdrop-blur-md z-10'>
      <div className='flex gap-2 items-center'>
        <img src='/spotify.png' className='size-8' alt='Spotify logo' />
        Spotify
      </div>
      <div className='flex items-center gap-4'>
        {isAdmin && (
          <Link
            to={'/admin'}
            className={cn(buttonVariants({ variant: 'outline' }))}>
            <LayoutDashboardIcon className='size-4 mr-2' />
            Admin Dashboard
          </Link>
        )}

        <SignedOut>
          <SignInAuthButton />
        </SignedOut>

        <UserButton />
      </div>
    </div>
  );
}
export default Topbar;
