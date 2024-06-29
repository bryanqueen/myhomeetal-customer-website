'use client';

import { Logout as LogoutIcon, CloseSquare } from 'iconsax-react';
import { Close as CloseDialog } from '@radix-ui/react-dialog';

import { useLogout } from '../forms/hooks/useLogout';

import Button from '@components/Button';

const LogoutDialog = () => {
  const { handleLogout, loading } = useLogout();

  return (
    <div className='flex w-[80vw] max-w-[400px] flex-col items-center gap-4 p-5 text-center'>
      <div className='h-16 w-16 rounded-full bg-primary/30' />
      <div className='px-5'>
        <p className='mb-3 text-3xl font-medium'>
          Are you sure you want to log out?
        </p>
        <p>Ensure you&apos;ve saved all your actions before proceeding.</p>
      </div>
      <div className='w-full'>
        <CloseDialog asChild>
          <Button
            className='mb-2 w-full gap-2 p-3 font-normal'
            onClick={handleLogout}
            loading={loading}
            disabled={loading}
          >
            <LogoutIcon variant='Bulk' />
            Yes, Logout
          </Button>
        </CloseDialog>
        <CloseDialog asChild>
          <Button className='w-full gap-2 bg-primary/20 p-3 font-normal text-black'>
            <CloseSquare variant='Bold' />
            No, Cancel
          </Button>
        </CloseDialog>
      </div>
    </div>
  );
};

export default LogoutDialog;
