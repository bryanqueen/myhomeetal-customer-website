'use client';

import { Logout as LogoutIcon, CloseSquare } from 'iconsax-react';
import { Close as CloseDialog } from '@radix-ui/react-dialog';

import { useLogout } from '../forms/hooks/useLogout';

import Button from '@components/Button';

const LogoutDialog = () => {
  const { handleLogout, loading } = useLogout();

  return (
    <div className='flex w-full px-[3%] lg:w-[70vw] max-w-[400px] flex-col items-center gap-4 py-5 lg:px-3 text-center'>
      <div className='h-16 w-16 rounded-full bg-[#FFC5C6]' />
      <div className=''>
        <p className='mb-3 font-clashmd text-center text-xl lg:text-2xl text-myGray'>
          Are you sure you want <br /> to log out?
        </p>
        <p className='text-sm text-myGray'>
          Ensure you&apos;ve saved all your actions <br /> before proceeding.
        </p>
      </div>
      <div className='w-full'>
        <CloseDialog asChild>
          <Button
            className='mb-2 w-full gap-2 p-3 h-[44px] border-0 shadow-none'
            onClick={handleLogout}
            loading={loading}
            disabled={loading}
          >
            <span className='flex items-center gap-3 text-base'>
              <LogoutIcon variant='Bulk' />
              Yes, Logout
            </span>
          </Button>
        </CloseDialog>
        <CloseDialog asChild>
          <Button className='font-base border-0 shadow-none h-[44px] w-full gap-2 bg-[#FFF1F1] text-myGray'>
            <span className='flex items-center gap-3'>
              <CloseSquare variant='Bold' />
              No, Cancel
            </span>
          </Button>
        </CloseDialog>
      </div>
    </div>
  );
};

export default LogoutDialog;
