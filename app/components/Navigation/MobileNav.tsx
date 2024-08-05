'use client';

import Link from 'next/link';
import {
  HambergerMenu,
  ShoppingCart,
  Profile,
  ArrowRight,
} from 'iconsax-react';
import cn from 'classnames';

import { useNav } from '../../providers';
import { accountNav3, hamburgerNav } from '../../utils/navdata';
import Button from '@components/Button';
import Logo from '@components/Logo';
import ClientOnly from '@components/ClientOnly';
import { ROUTES } from '@utils/routes';
import { hasCookie } from 'cookies-next';
import { constants } from '@/app/utils/constants';
import Dialog from '@components/Dialog';
import { XMarkIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { useCart } from 'react-use-cart';
import CustomDropdown from '../SelectOption';
import NavCart from './NavCart';

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
                    ? 'icon-mobile text-white'
                    : 'icon-mobile text-white'
                }
              />
            </Button>
            <ClientOnly>
              <Button
                noPadding
                variant='ghost'
                ariaLabel='Cart'
                linkType='rel'
                href='/cart'
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
                    color='white'
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
                    ? 'icon-mobile text-white'
                    : 'icon-mobile text-white'
                }
              />
            </Button>
          </div>
        </div>
      </div>

      <div className={navClassName}>
        {isNavActive('main') && (
          <div className='fixed bottom-0 left-0 h-screen right-0 top-0 bg-white transition-all duration-300 ease-out'>
            <div className='mt-12 flex items-center justify-end px-[3%] pb-3'>
              <button onClick={() => setActiveNav(null)}>
                <XMarkIcon width={30} />
              </button>
            </div>
            <ul className='grid gap-10 overflow-auto bg-white px-[3%] py-5'>
              {hamburgerNav.map((item, i) => {
                const itemClassName =
                  'h-[50px] flex px-5 justify-between items-center gap-5 font-clashmd rounded-lg text-sm leading-none text-[#656565] no-underline outline-none transition-colors hover:bg-gray-50 bg-white w-full';
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

                      <ArrowRight size='15px' />
                    </button>
                  );
                }
              })}
            </ul>
            <CustomDropdown />
          </div>
        )}

        {isNavActive('myAccount') && (
          <>
            {hasCookie(constants.AUTH_TOKEN) ? (
              <div className='fixed h-screen bottom-0 left-0 right-0 top-0 bg-white'>
                <div className='mt-12 flex items-center justify-between px-[3%] pb-3'>
                  <h2 className='font-clashmd text-base text-myGray'>
                    My Account
                  </h2>
                  <button onClick={() => setActiveNav(null)}>
                    <XMarkIcon width={30} />
                  </button>
                </div>
                <ul className='no-scrollbar grid h-[90%] gap-10 overflow-y-scroll bg-white px-[3%] py-5 pb-14'>
                  {accountNav3.map((item, i) => {
                    const itemClassName =
                      'h-[50px] flex px-5 justify-between items-center gap-5 font-clashmd rounded-lg text-sm leading-none text-[#656565] no-underline outline-none transition-colors hover:bg-gray-50 bg-white w-full';
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

                          <ArrowRight size='15px' />
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

                              <ArrowRight size='15px' />
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
                  <p className='pb-5 pt-3 text-center'>My Account</p>
                  <ul className='grid gap-3'>
                    <li>
                      <Button
                        linkType='rel'
                        href={ROUTES.SIGNUP}
                        className='w-full rounded-full border-0 p-5 shadow-none'
                      >
                        Create Account
                      </Button>
                    </li>
                    <button
                      onClick={() => setActiveNav(null)}
                      className='p-3 text-center'
                    >
                      <Link href={ROUTES.LOGIN}>Login</Link>
                    </button>
                  </ul>
                </div>
              </div>
            )}
          </>
        )}

        {isNavActive('cart') && (
          <ClientOnly>
            <div
              onClick={() => setActiveNav(null)}
              className='fixed bottom-0 left-0 right-0 top-0 z-[2000] bg-black/50 lg:hidden'
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className='relative mx-auto mt-[140px] h-fit w-[90%] rounded-2xl bg-white pt-[18px] '
              >
                <NavCart />

                {items.length > 0 && (
                  <div className='my-5 flex items-center justify-center'>
                    <Link
                      onClick={() => setActiveNav(null)}
                      href='/cart'
                      className='text-center text-xs text-[#656565] hover:text-[#8B1A1A]'
                    >
                      View all
                    </Link>
                  </div>
                )}
                <div className='flex flex-col items-center px-[3%] pb-2'>
                  {items?.length > 0 && (
                    <div className='w-full' onClick={() => setActiveNav(null)}>
                      <Button
                        className='flex h-[49px] w-full items-center justify-center rounded-full border-0 font-clashmd text-base text-white shadow-none lg:w-[159px] lg:text-sm'
                        linkType='rel'
                        href={ROUTES.CHECKOUT}
                        disabled={items?.length < 1}
                      >
                        Checkout now
                      </Button>
                    </div>
                  )}

                  <div onClick={() => setActiveNav(null)}>
                    <Button
                      className='w-full rounded-full border-0 bg-white py-4 text-sm text-[#C70E10] hover:shadow-none'
                      linkType='rel'
                      href={ROUTES.CART}
                    >
                      Go to cart
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </ClientOnly>
        )}
      </div>
    </>
  );
};

export default MobileNav;
