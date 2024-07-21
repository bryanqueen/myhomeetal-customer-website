import { Logout as LogoutIcon } from 'iconsax-react';

import { accountNav } from '@utils/navdata';
import Dialog from '@components/Dialog';
import Button from '@components/Button';
import NavLink from '@components/account/NavLink';
import Logout from '@components/account/Logout';

const AccountSidebar = () => {
  return (
    <div className='relative hidden lg:block'>
      <div className='no-scrollbar sticky top-40 max-h-[70vh] overflow-scroll'>
        <p className='mb-5 font-clashmd text-base'>My Account</p>
        {accountNav.map((item, i) => (
          <NavLink href={item.link} key={i}>
            {item.icon}
            <span className='font-clashmd text-sm'>{item.text}</span>
          </NavLink>
        ))}
        <Dialog
          trigger={
            <Button className='mb-3 flex w-full items-center justify-start gap-3 rounded-xl border-0 bg-white p-3 py-4 font-normal transition hover:bg-primary/30 hover:text-black focus:outline-primary'>
              <span className='flex items-center gap-3 font-clashmd text-sm text-[#989898]'>
                <LogoutIcon variant='Bulk' />
                Logout
              </span>
            </Button>
          }
          content={<Logout />}
        />
      </div>
    </div>
  );
};

export default AccountSidebar;
