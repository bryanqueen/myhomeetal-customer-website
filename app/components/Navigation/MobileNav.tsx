'use client';

import Link from 'next/link';
import { HambergerMenu, ShoppingCart, Profile } from 'iconsax-react';
import cn from 'classnames';
import { Suspense } from 'react';

import { useNav } from '../../providers';
import { accountNav } from '../../utils/navdata';

import MobileNavCart from './MobileNavCart';

import Button from '@components/Button';
import Logo from '@components/Logo';
import SearchForm from '@components/forms/SearchForm';
import ClientOnly from '@components/ClientOnly';
import { ROUTES } from '@utils/routes';

const MobileNav = () => {
  const { state, setActiveNav } = useNav();

  const isNavActive = (key: 'myAccount' | 'main' | 'cart') =>
    state.activeNav === key;

  const navClassName = cn('h-0 overflow-y-auto transition-[height] lg:hidden', {
    'h-screen': state.activeNav,
    'fixed inset-0 h-auto': isNavActive('myAccount'),
  });

  return (
    <>
      <div className='block px-3 pb-1 lg:hidden'>
        <div className='flex items-center justify-between pb-3'>
          <Link href='/' onClick={() => setActiveNav(null)}>
            <Logo variant={3} />
          </Link>
          <div className='flex gap-3'>
            <Button
              noPadding
              variant='ghost'
              onClick={() => setActiveNav('myAccount')}
              ariaLabel='My Account'
            >
              <Profile
                size={30}
                variant='Bulk'
                className={isNavActive('myAccount') ? 'text-primary' : ''}
              />
            </Button>
            <Button
              noPadding
              variant='ghost'
              onClick={() => setActiveNav('cart')}
              ariaLabel='Cart'
            >
              <ShoppingCart
                size={30}
                variant='Bulk'
                className={isNavActive('cart') ? 'text-primary' : ''}
              />
            </Button>
            <Button
              noPadding
              variant='ghost'
              onClick={() => setActiveNav('main')}
              ariaLabel='Menu'
            >
              <HambergerMenu
                size={30}
                className={isNavActive('main') ? 'text-primary' : ''}
              />
            </Button>
          </div>
        </div>
        <Suspense>
          <SearchForm />
        </Suspense>
      </div>

      <div className={navClassName}>
        {isNavActive('main') && (
          <ul className='grid h-[calc(100vh-8rem)] gap-3 overflow-auto p-5 py-10'>
            {accountNav.map((item, i) => (
              <li key={i}>
                <Link
                  href={item.link}
                  className='flex gap-3 rounded-full bg-gray-100 p-6'
                  onClick={() => setActiveNav(null)}
                >
                  {item.icon}
                  {item.text}
                </Link>
              </li>
            ))}
          </ul>
        )}
        {isNavActive('myAccount') && (
          <div className='relative h-[100dvh]'>
            <div
              className='absolute inset-0 bg-black/30'
              onClick={() => setActiveNav('myAccount')}
            />
            <div className='absolute bottom-0 left-0 right-0 rounded-t-[2rem] bg-white p-5 font-medium shadow'>
              <p className='pb-5 pt-3'>My Account</p>
              <ul className='grid gap-3'>
                <li>
                  <Button
                    linkType='rel'
                    href={ROUTES.SIGNUP}
                    className='w-full rounded-full p-5'
                  >
                    Create Account
                  </Button>
                </li>
                <li className='text-center'>
                  <Link href={ROUTES.LOGIN}>Login</Link>
                </li>
              </ul>
            </div>
          </div>
        )}
        {isNavActive('cart') && (
          <ClientOnly>
            <MobileNavCart />
          </ClientOnly>
        )}
      </div>
    </>
  );
};

export default MobileNav;
