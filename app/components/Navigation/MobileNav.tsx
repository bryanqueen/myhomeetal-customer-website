'use client';

import Link from 'next/link';
import { HambergerMenu, ShoppingCart, Profile } from 'iconsax-react';
import cn from 'classnames';
import { Suspense } from 'react';

import { useNav } from '../../providers';
import { accountNav, accountNav3, hamburgerNav } from '../../utils/navdata';

import MobileNavCart from './MobileNavCart';

import Button from '@components/Button';
import Logo from '@components/Logo';
import SearchForm from '@components/forms/SearchForm';
import ClientOnly from '@components/ClientOnly';
import { ROUTES } from '@utils/routes';
import { hasCookie } from 'cookies-next';
import { constants } from '@/app/utils/constants';
import Dialog from '@components/Dialog';
import { ArrowRightIcon, XMarkIcon } from '@heroicons/react/16/solid';
import SelectOption from '../SelectOption';
import { useRouter } from 'next/navigation';
import { useCart } from 'react-use-cart';

const MobileNav = () => {
  const router = useRouter();
  const { state, setActiveNav } = useNav();
  const { items } = useCart();

  const handleNavigation = (url: string) => {
    setActiveNav(null);
    router.push(url);
  };

  const isNavActive = (key: 'myAccount' | 'main' | 'cart') =>
    state.activeNav === key;

  const navClassName = cn('h-0 overflow-y-auto transition-[height] lg:hidden', {
    'h-screen': state.activeNav,
    'fixed inset-0 h-auto': isNavActive('myAccount'),
  });

  return (
    <>
      <div className='block pb-1 lg:hidden'>
        <div className='flex h-[83px] items-center justify-between bg-black px-[3%]'>
          <Link href='/' onClick={() => setActiveNav(null)}>
            <Logo variant={3} />
          </Link>
          <div className='flex items-center gap-4'>
            <Button
              noPadding
              variant='ghost'
              onClick={() => setActiveNav('myAccount')}
              ariaLabel='My Account'
            >
              <Profile
                size={24}
                variant='Bulk'
                className={
                  isNavActive('myAccount')
                    ? 'icon-mobile text-primary'
                    : 'icon-mobile'
                }
              />
            </Button>
            <ClientOnly>
              <Button
                noPadding
                variant='ghost'
                onClick={() => setActiveNav('cart')}
                ariaLabel='Cart'
              >
                <div className='relative'>
                  {items?.length > 0 && (
                    <div className='absolute right-[-6px] top-[-12px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary font-clashmd text-[10px] text-white'>
                      {items?.length}
                    </div>
                  )}
                  <ShoppingCart
                    size={24}
                    variant='Bulk'
                    className={
                      isNavActive('cart')
                        ? 'icon-mobile text-primary'
                        : 'icon-mobile'
                    }
                  />
                </div>
              </Button>
            </ClientOnly>
            <Button
              noPadding
              variant='ghost'
              onClick={() => setActiveNav('main')}
              ariaLabel='Menu'
            >
              <HambergerMenu
                size={24}
                className={
                  isNavActive('main')
                    ? 'icon-mobile text-primary'
                    : 'icon-mobile'
                }
              />
            </Button>
          </div>
        </div>
        <Suspense>
          <div className='bg-white px-[3%] py-4'>
            <SearchForm />
          </div>
        </Suspense>
      </div>

      <div className={navClassName}>
        {isNavActive('main') && (
          <div className='fixed bottom-0 left-0 right-0 top-0 bg-white transition-all duration-300 ease-out'>
            <div className='mt-12 flex items-center justify-end px-[3%] pb-3'>
              <button onClick={() => setActiveNav(null)}>
                <XMarkIcon width={30} />
              </button>
            </div>
            <ul className='grid h-[calc(100vh-8rem)] gap-3 overflow-auto bg-white p-5 pb-10'>
              {hamburgerNav.map((item, i) => {
                const itemClassName =
                  'flex select-none justify-between items-center gap-5 text-sm font-medium rounded-lg p-5 text-[15px] leading-none text-[#656565] no-underline outline-none transition-colors hover:bg-gray-50 focus-visible:shadow-[0_0_0_2px] bg-white shadow-none w-full';
                if (item.link) {
                  return (
                    <button
                      key={i}
                      onClick={() => handleNavigation(item.link)}
                      className={itemClassName}
                    >
                      <div className='flex items-center gap-3'>
                        {item.icon}
                        {item.text}
                      </div>

                      <ArrowRightIcon width={8} />
                    </button>
                  );
                } else if (item.select) {
                  return (
                    <SelectOption
                      options={item.select.options}
                      onChange={item.select.onChange}
                    />
                  );
                }
              })}
            </ul>
          </div>
        )}

        {isNavActive('myAccount') && (
          <>
            {hasCookie(constants.AUTH_TOKEN) ? (
              <div className='fixed bottom-0 left-0 right-0 top-0 bg-white'>
                <div className='mt-12 flex items-center justify-between px-[3%] pb-3'>
                  <h2 className='font-medium'>My Account</h2>
                  <button onClick={() => setActiveNav(null)}>
                    <XMarkIcon width={30} />
                  </button>
                </div>
                <ul className='grid h-[calc(100vh-8rem)] gap-3 overflow-auto bg-white p-5 pb-10'>
                  {accountNav3.map((item, i) => {
                    const itemClassName =
                      'flex select-none justify-between items-center gap-5 text-sm font-medium rounded-lg p-5 text-[15px] leading-none text-[#656565] no-underline outline-none transition-colors hover:bg-gray-50 focus-visible:shadow-[0_0_0_2px] bg-white shadow-none w-full';
                    if (item.link) {
                      return (
                        <button
                          key={i}
                          onClick={() => handleNavigation(item.link)}
                          className={itemClassName}
                        >
                          <div className='flex items-center gap-3'>
                            {item.icon}
                            {item.text}
                          </div>

                          <ArrowRightIcon width={8} />
                        </button>
                      );
                    } else if (item.dialog) {
                      return (
                        <Dialog
                          key={i}
                          trigger={
                            <button className={itemClassName}>
                              <div className='flex items-center gap-3'>
                                {item.icon}
                                {item.text}
                              </div>

                              <ArrowRightIcon width={8} />
                            </button>
                          }
                          content={item.dialog.content}
                        />
                      );
                    }
                  })}
                </ul>
              </div>
            ) : (
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
          </>
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
