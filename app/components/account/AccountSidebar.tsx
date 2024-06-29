import { Logout as LogoutIcon } from 'iconsax-react';

import { accountNav } from '@utils/navdata';
import Dialog from '@components/Dialog';
import Button from '@components/Button';
import NavLink from '@components/account/NavLink';
import Logout from '@components/account/Logout';

const AccountSidebar = () => {
  return (
    <div className='relative hidden lg:block'>
      <div className='sticky top-20'>
        <p className='mb-5 font-bold'>My Account</p>
        {accountNav.map((item, i) => (
          <NavLink href={item.link} key={i}>
            {item.icon}
            <span className='text-sm'>{item.text}</span>
          </NavLink>
        ))}
        <Dialog
          trigger={
            <Button className='mb-3 flex w-full items-center justify-start gap-3 rounded-xl border-0 bg-white p-3 py-4 font-normal text-gray-500 transition hover:bg-primary/30 hover:text-black focus:outline-primary'>
              <LogoutIcon variant='Bulk' />
              Logout
            </Button>
          }
          content={<Logout />}
        />
      </div>
    </div>
  );
};

export default AccountSidebar;
