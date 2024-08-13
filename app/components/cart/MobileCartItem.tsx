'use client';
import { TrashIcon } from '@heroicons/react/16/solid';
import Image from 'next/image';
import React, { useState } from 'react';
import { Add, Minus } from 'iconsax-react';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../ClientOnly';
import { useCartActions } from '@/app/utils/helpers';
import { jwtVerify } from 'jose';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function MobileCartItem({ item }: any) {
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

  const { removeItemFromCart, addItemToCart1, updateCartItem } = useCartActions();

  const handleAddToCart = async () => {
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
      <div className='relative flex h-[120px] w-full min-w-[300px] items-center rounded-[10px] bg-[#F4F4F4] px-2 py-5 lg:hidden'>
        <div className='flex h-[54px] max-w-[85%] items-center gap-4'>
          <Image
            src={item?.product?.images[0]}
            width={54}
            height={54}
            alt='product image'
            className='h-[54px] w-[54px] rounded-[12.63px] object-contain'
          />
          <div className='flex h-full flex-col justify-between'>
            <h2 className='three-line-clamp text-xs text-myGray'>
              {item?.product?.productTitle}
            </h2>
            <ProductPrice
              priceInNGN={priceInNGN}
              region={region}
              className='font-clashmd text-xs text-myGray'
            />
          </div>
        </div>
        <div className=' absolute bottom-[20px] right-[20px] top-[20px] flex w-[74px] flex-col justify-between'>
          <div className='flex justify-end'>
            <button
              disabled={loading2.delete}
              onClick={() => deleteCartItem(item?.product?._id)}
              className='flex h-[25px] relative w-[25px] items-center justify-center rounded-full bg-[#FF0003] text-white'
            >
              <TrashIcon width={13} />
              {loading2.delete && (
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF0003]/70'></span>
              )}
            </button>
          </div>
          <div className='flex w-full justify-between'>
            <button
              onClick={handleUpdateCartItem}
              className='flex h-[17px] relative w-[17px] items-center text-white justify-center rounded-full bg-[#E1E1E1]'
              disabled={loading2.update}
            >
              <Minus size={15} />
              {loading2.update && (
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#707070]'></span>
              )}
            </button>
            <span className='font-clashmd text-xs text-[#656565]'>
              {item?.qty}
            </span>
            <button
              onClick={handleAddToCart}
              disabled={loading2.add}
              className='flex relative h-[17px] text-white w-[17px] items-center justify-center rounded-full bg-[#F8BCBC]'
            >
              <Add size={15} />
              {loading2.add && (
                <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-[#ff7474]'></span>
              )}
            </button>
          </div>
        </div>
      </div>
    </ClientOnly>
  );
}
