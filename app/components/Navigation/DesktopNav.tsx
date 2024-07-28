'use client';

import { Suspense, useEffect, useState } from 'react';
import { ShoppingCart, Profile, ArrowDown2 } from 'iconsax-react';
import Link from 'next/link';
import Image from 'next/image';
import { getCookie, hasCookie } from 'cookies-next';

import NavDropdown from './NavDropdown';
import NavCart from './NavCart';
import Button from '@components/Button';
import Dialog from '@components/Dialog';
import { ROUTES } from '@utils/routes';
import SearchForm from '@components/forms/SearchForm';
import Logo from '@components/Logo';
import ClientOnly from '@components/ClientOnly';
import authUtils from '@utils/authUtils';
import { accountNav2 } from '@utils/navdata';
import productService from '@/app/services/productService';
import { constants } from '@utils/constants';
import { useRegion } from '@/app/RegionProvider';
import { useCart } from 'react-use-cart';

interface Category {
  _id: string;
  name: string;
}

interface User {
  id: string;
  firstname: string;
  lastname: string;
  email: string;
}

const myAccount = [
  { text: 'Create an account', link: ROUTES.SIGNUP },
  { text: 'Login now', link: ROUTES.LOGIN },
];
const help = [
  { text: 'Help & Support', link: ROUTES.HELP },
  { text: 'Privacy Policy', link: ROUTES.HOME },
  { text: 'Term of Use', link: ROUTES.HOME },
];

const DesktopNav = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isDropdownvisible, setIsDropdownVisible] = useState(false);
  const [userInfo, setUserInfo] = useState<User | null>(null);
  const { region, setRegion } = useRegion();
  const { items } = useCart();

  const getFlagSrc = (region: string) => {
    switch (region) {
      case 'NG':
        return '/images/flags/NG.png';
      case 'US':
        return '/images/flags/US.png';
      case 'UK':
        return '/images/flags/GB.png';
      default:
        return '/images/flags/default.png'; // Default flag if no match found
    }
  };

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productService.getTopProductCategories();
        const data: Category[] = response.data;
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    const getUser = () => {
      const userInfo = authUtils.getUserInfo();
      if (userInfo) {
        setUserInfo(userInfo);
      }
    };
    getUser();
    fetchCategories();
  }, []);

  return (
    <div className='relative mb-3 hidden h-[90px] items-center justify-between gap-5 rounded-[6px] bg-white px-[3%] pt-3 text-sm lg:flex'>
      <div className='flex items-center gap-5'>
        <Link href='/'>
          <Logo variant={3} />
        </Link>
        <NavDropdown
          id='categories-dropdown'
          target='Categories'
          items={categories.map((category) => ({
            text: category.name,
            link: `/category/${category.name}?categoryId=${category._id}`,
          }))}
          contentClassName='grid list-none gap-x-3 sm:grid-cols-[1fr_1fr_1fr] w-[50vw]'
          position='left-20'
        />
        <Link
          href='/deals'
          className='font-clashmd text-base text-myGray hover:text-[#8B1A1A]'
        >
          Deals
        </Link>
        <Link
          href='/referral-page'
          className='font-clashmd text-base text-myGray hover:text-[#8B1A1A]'
        >
          Referrals
        </Link>
      </div>

      <div className='w-[25rem] xl:w-[30rem]'>
        <Suspense>
          <SearchForm />
        </Suspense>
      </div>

      <div className='flex items-center gap-5'>
        <ClientOnly>
          {hasCookie(constants.AUTH_TOKEN) ? (
            <Link
              href='/account'
              className='flex items-center gap-1 whitespace-nowrap font-clashmd text-base text-myGray hover:text-[#8B1A1A]'
            >
              <Profile size={20} variant='Bulk' color='#464646' />

              {`Hi, ${userInfo?.firstname}`}
            </Link>
          ) : (
            <NavDropdown
              id='account-dropdown'
              target={
                <>
                  <Profile size={20} variant='Bulk' color='#464646' />
                  <p className='font-clashmd text-base text-myGray'>
                    My Account
                  </p>
                </>
              }
              items={myAccount}
              position=''
            >
              {hasCookie(constants.AUTH_TOKEN) && (
                <>
                  {accountNav2.map((item, i) => {
                    const itemClassName =
                      'flex select-none items-center gap-5 rounded-lg p-5 text-[15px] leading-none text-gray-500 no-underline outline-none transition-colors hover:bg-gray-50 focus-visible:shadow-[0_0_0_2px] bg-white shadow-none w-full';
                    if (item.dialog)
                      return (
                        <Dialog
                          key={i}
                          trigger={
                            <button className={itemClassName}>
                              {item.icon}
                              {item.text}
                            </button>
                          }
                          content={item.dialog.content}
                        />
                      );
                    return (
                      <Link key={i} href={item.link} className={itemClassName}>
                        {item.icon}
                        {item.text}
                      </Link>
                    );
                  })}
                </>
              )}
            </NavDropdown>
          )}
        </ClientOnly>
        <NavDropdown
          id='help-dropdown'
          target={
            <>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                fill='none'
                viewBox='0 0 24 24'
                strokeWidth={2}
                stroke='#464646'
                className='size-5'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  d='M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z'
                />
              </svg>
              <p className='font-clashmd text-base text-myGray hover:text-[#8B1A1A]'>
                Help
              </p>
            </>
          }
          items={help}
          contentClassName='w-[243px]'
          position='right-[30px]'
        ></NavDropdown>
        <ClientOnly>
          <NavDropdown
            id='cart-dropdown'
            target={
              <>
                <div className='relative'>
                  {items?.length > 0 && (
                    <div className='absolute right-[-6px] top-[-12px] flex h-[18px] w-[18px] items-center justify-center rounded-full bg-primary font-clashmd text-[10px] text-white'>
                      {items?.length}
                    </div>
                  )}
                  <ShoppingCart size={20} variant='Bulk' color='#464646' />
                </div>
                Cart
              </>
            }
            contentClassName='right-0 p-2 w-[257px]'
            position='right-[30px]'
          >
            <NavCart />

            {items?.length > 0 && (
              <div className='mt-1 flex items-center justify-center'>
                <Link
                  href='/cart'
                  className='text-center text-sm text-[#656565] hover:text-[#8B1A1A]'
                >
                  View all
                </Link>
              </div>
            )}
            <div className='mt-5 flex flex-col items-center gap-2'>
              {items?.length > 0 && (
                <Button
                  className='flex h-[49px] border-0 shadow-none w-[159px] items-center justify-center rounded-full font-clashmd text-sm text-white'
                  linkType='rel'
                  href={ROUTES.CHECKOUT}
                  disabled={items?.length < 1}
                >
                  Checkout now
                </Button>
              )}

              <Button
                className='w-full rounded-full border-0 bg-white py-4 text-sm text-[#C70E10] hover:shadow-none'
                linkType='rel'
                href={ROUTES.CART}
              >
                Go to cart
              </Button>
            </div>
          </NavDropdown>
        </ClientOnly>
        <div
          onClick={() => setIsDropdownVisible(!isDropdownvisible)}
          className='flex cursor-pointer items-center gap-1'
        >
          <Image
            src={getFlagSrc(region)}
            alt='flag'
            width={20}
            height={15}
            className='h-[15px]'
          />
          <ArrowDown2 size='18' color='#000000' variant='Bold' />
        </div>
        {isDropdownvisible && (
          <div
            onMouseLeave={() => setIsDropdownVisible(false)}
            className='absolute bottom-0 left-0 right-0 top-[83px] z-50 min-h-screen bg-myGray/30'
          >
            <div className='relative'>
              <div className='absolute right-[29px] top-[19px] flex h-[183px] w-[177px] flex-col justify-between overflow-hidden rounded-2xl bg-white p-5 transition-opacity duration-300 ease-out'>
                <button
                  onClick={() => {
                    setRegion('UK');
                    setIsDropdownVisible(false);
                  }}
                  className='flex h-[37px] items-center gap-2 pl-2 text-sm text-[#656565] hover:text-[#8B1A1A]'
                >
                  <Image
                    src='/images/flags/GB.png'
                    alt='flag'
                    width={20}
                    height={15}
                    className='h-[15px]'
                  />
                  Global
                </button>
                <button
                  onClick={() => {
                    setRegion('US');
                    setIsDropdownVisible(false);
                  }}
                  className='flex h-[37px] items-center gap-2 pl-2 text-sm text-[#656565] hover:text-[#8B1A1A]'
                >
                  <Image
                    src='/images/flags/US.png'
                    alt='flag'
                    width={20}
                    height={15}
                    className='h-[15px]'
                  />
                  United States
                </button>
                <button
                  onClick={() => {
                    setRegion('NG');
                    setIsDropdownVisible(false);
                  }}
                  className='flex h-[37px] items-center gap-2 pl-2 text-sm text-[#656565] hover:text-[#8B1A1A]'
                >
                  <Image
                    src='/images/flags/NG.png'
                    alt='flag'
                    width={20}
                    height={15}
                    className='h-[15px]'
                  />
                  Nigeria
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
