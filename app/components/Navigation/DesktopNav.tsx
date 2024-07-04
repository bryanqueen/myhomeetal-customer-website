'use client';

import { Suspense, useEffect, useState } from 'react';
import { ShoppingCart, Profile } from 'iconsax-react';
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

interface Category {
  _id: string;
  name: string;
}

const myAccount = [
  { text: 'Create an account', link: ROUTES.SIGNUP },
  { text: 'Login now', link: ROUTES.LOGIN },
];

const DesktopNav = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const userInfo = authUtils.getUserInfo();

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

    fetchCategories();
  }, []);
  return (
    <div className='my-3 hidden h-[83px] items-center justify-between rounded-[6px] bg-white px-[3%] text-sm lg:flex'>
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
        />
        <Link href='' className='font-semibold text-myGray'>
          Shop
        </Link>
        <Link href='' className='font-semibold text-myGray'>
          Deals
        </Link>
      </div>

      <div className='w-[25rem] xl:w-[30rem]'>
        <Suspense>
          <SearchForm />
        </Suspense>
      </div>

      <div className='flex gap-5 font-medium'>
        <NavDropdown
          id='account-dropdown'
          target={
            <>
              <Profile size={20} variant='Bulk' color='#464646' />
              <ClientOnly>
                {hasCookie(constants.AUTH_TOKEN)
                  ? `Hi, ${userInfo.firstname}`
                  : 'My Account'}
              </ClientOnly>
            </>
          }
          items={myAccount}
          position='-right-1/2'
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
        <Link href='' className='flex gap-1 font-semibold text-myGray'>
          <Image
            src='/icons/help-circle.svg'
            alt='Help'
            width={20}
            height={20}
          />
          Help
        </Link>
        <NavDropdown
          id='cart-dropdown'
          target={
            <>
              <ShoppingCart size={20} variant='Bulk' color='#464646' />
              Cart
            </>
          }
          contentClassName='right-0 p-2 w-72'
          position='right-0'
        >
          <ClientOnly>
            <NavCart />
          </ClientOnly>
          <div className='my-5 flex flex-col items-center gap-2'>
            <Button
              className='w-full rounded-full py-4'
              linkType='rel'
              href={ROUTES.CHECKOUT}
            >
              Checkout now
            </Button>
            <Button
              className='w-full rounded-full border-0 bg-white py-4 text-primary hover:shadow-none'
              linkType='rel'
              href={ROUTES.CART}
            >
              Go to cart
            </Button>
          </div>
        </NavDropdown>
      </div>
    </div>
  );
};

export default DesktopNav;
