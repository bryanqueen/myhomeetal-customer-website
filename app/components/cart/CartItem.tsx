'use client';

import { Trash, Minus, Add } from 'iconsax-react';
import Image from 'next/image';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../ClientOnly';
import { useCartActions } from '@/app/utils/helpers';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { jwtVerify } from 'jose';
import { useRouter } from 'next/navigation';

const CartItem = ({ item, isLast }: { item: any; isLast: boolean }) => {
  const { region } = useRegion();
  const router = useRouter();
  const [loading2, setLoading2] = useState({ add: false, update: false, delete: false });


  // Sanitize and convert price to number
  const sanitizeAndConvertPrice = (price: any): number => {
    if (typeof price === 'string') {
      // Remove commas and parse to float
      const sanitizedPrice = price.replace(/,/g, '');
      const parsedPrice = parseFloat(sanitizedPrice);
      return isNaN(parsedPrice) ? 0 : parsedPrice;
    }
    return typeof price === 'number' ? price : 0;
  };

  const priceInNGN = sanitizeAndConvertPrice(item?.product?.price);
  // Function to verify JWT token
  const verifyToken = async (token) => {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      await jwtVerify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  };

  const { removeItemFromCart, updateCartItem, addItemToCart1 } = useCartActions();

  const handleAddToCart1 = async () => {
    setLoading2(prev => ({ ...prev, add: true })); // Set loading state to true when starting the action

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('AUTH_TOKEN='))
        ?.split('=')[1];

      if (!token || !(await verifyToken(token))) {
        toast.error('Session expired. Redirecting to login...');
        router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }
      await addItemToCart1({ id: item.product?._id, name: item.product.productTitle, price: item.product.price, quantity: 1 });
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading2(prev => ({ ...prev, add: false })); // Reset loading state after the action completes
    }
  };

  const deleteCartItem = async (item: string) => {
    setLoading2(prev => ({ ...prev, delete: true })); // Set loading state to true when starting the action

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('AUTH_TOKEN='))
        ?.split('=')[1];

      if (!token || !(await verifyToken(token))) {
        toast.error('Session expired. Redirecting to login...');
        router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }
      await removeItemFromCart(item);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading2(prev => ({ ...prev, delete: false })); // Reset loading state after the action completes
    }
  };

  const handleUpdateCartItem = async () => {
    setLoading2(prev => ({ ...prev, update: true })); // Set loading state to true when starting the action

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('AUTH_TOKEN='))
        ?.split('=')[1];

      if (!token || !(await verifyToken(token))) {
        toast.error('Session expired. Redirecting to login...');
        router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }
      await updateCartItem(item?.product?._id);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading2(prev => ({ ...prev, update: false })); // Reset loading state after the action completes
    }
  };

  return (
    <ClientOnly>
      <div
        className={`hidden gap-3 lg:grid lg:min-w-[851px] ${!isLast ? 'border-b border-gray-100' : ''} py-5 pr-2`}
      >
        <div className='flex justify-between gap-3'>
          <div className='flex items-center gap-2'>
            <div className='h-[95px] w-[95px]'>
              <Image
                src={item?.product?.images[0]}
                alt=''
                width={100}
                height={100}
                className='h-full w-full rounded-3xl object-contain'
              />
            </div>
            <div className='h-[95px]'>
              <div className='pt-1'>
                <p className='mb-3 max-w-[450px] text-base text-myGray'>
                  {item?.product?.productTitle}
                </p>
                <div className='flex items-center gap-2 text-sm text-myGray'>
                  <span>Brand: </span>
                  <span className='rounded-full bg-[#FFE0E0] px-6 py-2'>
                    {item?.product?.brand}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className='flex items-center'>
            <ProductPrice
              className='font-clashmd text-xl text-myGray'
              priceInNGN={priceInNGN}
              region={region}
            />
          </div>
        </div>
        <div className='mt-1 flex items-center justify-between'>
          <div>
            <button
              disabled={loading2.delete}
              onClick={() => deleteCartItem(item?.product?._id)}
              className='flex p-2 w-auto border-0 bg-transparent text-sm text-myGray'
            >
              <span className='flex items-center gap-1'>
                {' '}
                <Trash size={24} variant='Bold' color='#B22222' />
                {loading2.delete ? (
                  <svg
                    className='h-5 w-5 animate-spin'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                  >
                    <circle
                      className='opacity-25'
                      cx='12'
                      cy='12'
                      r='10'
                      stroke='currentColor'
                      strokeWidth='4'
                    />
                    <path
                      className='opacity-75'
                      fill='#ed2224'
                      d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                    />
                  </svg>
                ) : (
                  <span>Remove</span>
                )}
              </span>
            </button>
          </div>
          <div className='flex gap-3'>
            <button
              onClick={handleUpdateCartItem}
              className='min-w-[27px] flex items-center justify-center box-border bg-primary h-[27px] text-white rounded-lg border-0'
              disabled={loading2.update}
            >
              {loading2.update ? (
                <svg
                  className='h-5 w-5 animate-spin'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
              ) : (
                <Minus size={23} />
              )}

            </button>
            <span className='font-clashmd text-base text-myGray'>
              {item?.qty}
            </span>
            <button
              onClick={handleAddToCart1}
              disabled={loading2.add}
              className='min-w-[27px] flex items-center justify-center bg-primary text-white h-[27px] rounded-lg border-0'
            >
              {loading2.add ? (
                <svg
                  className='h-5 w-5 animate-spin'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                >
                  <circle
                    className='opacity-25'
                    cx='12'
                    cy='12'
                    r='10'
                    stroke='currentColor'
                    strokeWidth='4'
                  />
                  <path
                    className='opacity-75'
                    fill='currentColor'
                    d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                  />
                </svg>
              ) : (
                <Add size={23} />
              )}
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default CartItem;
