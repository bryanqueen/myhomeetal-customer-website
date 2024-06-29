'use client';

import * as RadioGroup from '@radix-ui/react-radio-group';
import { ArrowRight } from 'iconsax-react';

import OrderSummary from './OrderSummary';

import Input from '@components/Input';
import RadioItem from '@components/RadioItem';
import Button from '@components/Button';
import ClientOnly from '@components/ClientOnly';

const CheckoutForm = () => {
  return (
    <form className='grid items-start gap-5 lg:grid-cols-[2fr_1fr]'>
      <div>
        <div className='mb-8 rounded-3xl border p-3'>
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
        </div>
        <div className='mb-8 rounded-3xl border p-3'>
          <div className='mb-3 flex items-center gap-3'>
            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-primary/30 text-xs'>
              2
            </span>
            <p>Select Delivery Method</p>
          </div>
          <div className='rounded-3xl bg-gray-100 p-4 px-5'>
            <div className='flex gap-5'>
              <span>Delivery Method</span>
              <RadioGroup.Root
                className='flex gap-3'
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
            <div className='mt-2 text-sm text-gray-500'>
              Delivery between 15 Aug and 18 Aug
            </div>
            <div className='mb-3 mt-10 grid gap-3 md:grid-cols-2'>
              {[0, 0, 0, 0].map((item, i) => (
                <div key={i} className='flex items-center gap-3'>
                  <div className='h-16 w-16 shrink-0 rounded-lg bg-gray-400'></div>
                  <div>
                    <p className='text-sm'>
                      Samsung Galaxy A14 6.6 4GB RAM/64GB ROM Android 13 - Light
                      Green
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant='ghost' className='mx-auto w-full p-5'>
              Modify Cart
              <ArrowRight size={15} className='ml-3' />
            </Button>
          </div>
        </div>
        <div className='rounded-3xl border p-3'>
          <div className='mb-3 flex items-center gap-3'>
            <span className='flex h-5 w-5 items-center justify-center rounded-full bg-primary/30 text-xs'>
              3
            </span>
            <p>Select Payment Method</p>
          </div>
          <div className='rounded-3xl bg-gray-100 p-5'>
            <RadioGroup.Root
              className='grid gap-3 md:grid-cols-3'
              defaultValue='Payment on delivery'
              aria-label='Payment Method'
            >
              <div>
                <RadioItem
                  id='pm1'
                  value='Online payment'
                  labelKey='Online payment'
                />
                <p className='py-3 text-sm text-gray-800'>
                  Secure, fast, and efficient. Use your credit/debit card or
                  bank account to finalize your purchase instantly.
                </p>
              </div>
              <div>
                <RadioItem
                  id='pm3'
                  value='Pay with wallet'
                  labelKey='Pay with wallet'
                />
                <p className='py-3 text-sm text-gray-800'>
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
