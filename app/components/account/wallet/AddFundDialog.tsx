'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@components/Button';
import Input from '@components/Input';
import SelectInput from '@components/SelectInput';
import { ArrowRight2 } from 'iconsax-react';
import { useState } from 'react';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import ClientOnly from '../../ClientOnly';
import Image from 'next/image';
import toast from 'react-hot-toast';

const schema = yup
  .object({
    amount: yup.string().required(),
    payment_method: yup.string().required().label('Payment Method'),
  })
  .required();

interface Inputs {
  amount: string;
  payment_method: string;
}

const AddFundDialog = () => {
  const referralLink = 'Paystack titan | 9840582103';
  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink).then(
      () => {
        toast.success('Account Number copied');
      },
      (err) => {
        toast.error('Failed to copy the account. Please try again.');
      }
    );
  };

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema) as any,
  });

  const [isPayMethod, setIsPayMethod] = useState(false);
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div>
      {isPayMethod ? (
        <div className='flex w-[80vw] max-w-xl flex-col gap-4 p-5 px-2'>
          <div className='flex items-center justify-between'>
            <button
              onClick={() => setIsPayMethod(false)}
              className='flex items-center font-clashmd text-xs text-myGray'
            >
              <ArrowLeftIcon width={16} className='mr-[2px lg:mr-1' />
              Back
            </button>
            <div className='font-clashmd text-base'>Payment Method</div>
            <div></div>
          </div>
          <div className='mt-5 flex h-[70px] cursor-pointer items-center justify-between rounded-[10px] border border-[#D9D9D9] px-5'>
            <p className='w-fit font-clashmd text-xs text-myGray'>
              Fund wallet (Virtual Account)
            </p>
            <div
              onClick={copyToClipboard}
              className='flex w-fit items-center gap-5 text-[10px] text-myGray'
            >
              <span id='referralLink'>{referralLink}</span>
              <Image
                src='/images/clip.svg'
                width={10}
                height={14}
                alt='clipboard icon'
              />
            </div>
          </div>
          <div className='mt-1 flex h-[70px] cursor-pointer items-center justify-between rounded-[10px] border border-[#D9D9D9] px-5'>
            <p className='w-fit font-clashmd text-xs text-myGray'>
              Fund wallet (Online Transfer)
            </p>
          </div>
          <Button className='mt-9 h-[55px] w-full rounded-[10px] border-0 font-clashmd text-base shadow-none'>
            Confirm
          </Button>
        </div>
      ) : (
        <div className='flex w-[80vw] max-w-xl flex-col gap-4 p-5 px-2'>
          <div className='py-5'>
            <p className='text-center font-clashmd text-base'>Fund Account</p>
          </div>
          <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
            <div>
              <div className='relative'>
                <Input
                  labelKey='Enter Amount'
                  placeholder='₦150,000.00'
                  variant='outline'
                  inputClassName='py-5 border-[#D9D9D9] text-sm rounded-[10px] placeholder:text-xs placeholder:text-black'
                  labelClassName='text-myGray text-xs font-clashmd pl-4'
                  {...register('amount')}
                  errorKey={errors.amount?.message}
                />
                <p className='absolute right-5 top-14 text-[10px]'>Plus Vat</p>
              </div>
              <p className='pl-4 pt-1 text-[10px] text-myGray'>
                0.6 % Fee on all transaction:{' '}
                <span className='text-[#F68182]'>150,000</span> &times; 0.006 =
                900
              </p>
            </div>
            <div className='mt-5'>
              <label className='pl-4 font-clashmd text-xs text-myGray'>
                Select Payment Method
              </label>
              <button
                onClick={() => setIsPayMethod(true)}
                className='flex w-full items-center justify-between rounded-[10px] border border-[#D9D9D9] px-5 py-5 text-xs text-black'
              >
                Payment Method{' '}
                <span>
                  <ArrowRight2 variant='Bold' size={10} />
                </span>
              </button>
            </div>

            <Button className='mb-2 mt-5 w-full gap-2 rounded-lg p-4 font-clashmd text-base'>
              Fund Account
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default AddFundDialog;
