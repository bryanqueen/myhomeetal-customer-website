'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import { ArrowRight } from 'iconsax-react';
import OrderSummary from './OrderSummary';
import Input from '@components/Input';
import RadioItem from '@components/RadioItem';
import Button from '@components/Button';
import ClientOnly from '@components/ClientOnly';
import { useCart } from 'react-use-cart';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const CheckoutForm = () => {
  const { items, isEmpty } = useCart();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    // While waiting for hydration, render nothing or a loading indicator
    return <div>Loading...</div>;
  }
  return (
    <form className='grid items-start gap-5 lg:grid-cols-[2fr_1fr]'>
      <div>
        {/*<div className='mb-8 rounded-3xl border p-3'>
          <div className='mb-3 flex items-center gap-3'>
            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-primary/30 text-xs'>
              1
            </span>
            <p>Personal Information</p>
          </div>
          <div className='rounded-3xl bg-gray-100 p-4 px-5'>
            <div className='mb-5 grid gap-5 md:grid-cols-2'>
              <Input
                name='firstName'
                labelKey='First Name'
                type='text'
                variant='outline'
                inputClassName='border-0'
                placeholder='Oluwafemi'
              />
              <Input
                name='lastName'
                labelKey='Last Name'
                type='text'
                variant='outline'
                inputClassName='border-0'
                placeholder='Odunayo'
              />
            </div>
            <Input
              name='deliveryAddress'
              labelKey='Delivery adress'
              type='text'
              variant='outline'
              inputClassName='border-0'
              placeholder='No 3 Kayode Arikawe Street, ikosi, Ketu, Lagos.'
            />
          </div>
        </div>*/}
        <div className='mb-8 rounded-2xl border border-[#F4F4F4] px-5 pb-5'>
          <div className='flex items-center gap-3 py-4'>
            <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE0E0] text-sm text-myGray'>
              1
            </span>
            <p className='font-semibold text-myGray'>Select Delivery Method</p>
          </div>
          <div className='rounded-2xl bg-[#F4F4F4] p-7'>
            <div className='flex gap-5'>
              <span className='mr-4 font-semibold text-myGray'>
                Delivery Method
              </span>
              <RadioGroup.Root
                className='flex gap-3 font-semibold text-myGray'
                defaultValue='Door Delivery'
                aria-label='Delivery Method'
              >
                <RadioItem
                  id='r1'
                  value='Door Delivery'
                  labelKey='Door Delivery'
                />
                <RadioItem
                  id='r2'
                  value='Pickup Delivery'
                  labelKey='Pickup Delivery'
                />
              </RadioGroup.Root>
            </div>
            <div className='mt-2 text-xs font-semibold text-[#989898]'>
              Delivery between 15 Aug and 18 Aug
            </div>
            <div className='mb-3 mt-10 grid gap-5 md:grid-cols-2'>
              {items.map((item) => (
                <div key={item._id} className='flex items-center gap-3'>
                  <Image
                    src={item?.images[0]}
                    width={57}
                    height={61}
                    alt='product image'
                    className='rounded-xl object-contain'
                  />
                  <div>
                    <p className='font-medium text-myGray'>
                      {item.productTitle}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button
              variant='ghost'
              className='mx-auto mt-5 w-full font-semibold text-myGray'
            >
              Modify Cart
              <ArrowRight size={15} className='ml-1' />
            </Button>
          </div>
        </div>
        <div className='mb-8 rounded-2xl border border-[#F4F4F4] px-5 pb-5'>
          <div className='flex items-center gap-3 py-4'>
            <span className='flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE0E0] text-sm text-myGray'>2</span>
            <p className='font-semibold text-myGray'>Select Payment Method</p>
          </div>
          <div className='rounded-2xl bg-[#F4F4F4] p-7'>
            <RadioGroup.Root
              className='flex items-center justify-between font-semibold text-myGray'
              defaultValue='Payment on delivery'
              aria-label='Payment Method'
            >
              <div className='basis-[45%]'>
                <RadioItem
                  id='pm1'
                  value='Online payment'
                  labelKey='Online payment'
                />
                <p className='py-4 text-sm text-[#7C7C7C]'>
                  Secure, fast, and efficient. Use your credit/debit card or
                  bank account to finalize your purchase instantly.
                </p>
              </div>
              <div className='basis-[45%]'>
                <RadioItem
                  id='pm3'
                  value='Pay with wallet'
                  labelKey='Pay with wallet'
                />
                <p className='py-4 text-sm text-[#7C7C7C]'>
                  Convenient and swift! Use your digital wallet balance to
                  complete your purchase seamlessly.
                </p>
              </div>
            </RadioGroup.Root>
          </div>
        </div>
      </div>
      <ClientOnly>
        <OrderSummary />
      </ClientOnly>
    </form>
  );
};

export default CheckoutForm;
