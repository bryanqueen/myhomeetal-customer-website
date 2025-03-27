'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { signIn } from "next-auth/react";

import { useSignup } from './hooks/useSignUp';

import Button from '@components/Button';
import Input from '@components/Input';
import { ROUTES } from '@utils/routes';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import ClientOnly from '../ClientOnly';
import { useSearchParams } from 'next/navigation';
import PhoneInputComponent from '../account/phoneNumber';

interface Inputs {
  firstname: string;
  lastname: string;
  email: string;
  //phone: string;
  password: string;
  referralCode: string;
}

const schema = yup
  .object({
    firstname: yup.string().required().label('First Name'),
    lastname: yup.string().required().label('Last Name'),
    email: yup.string().email().required('Enter a valid email address'),
    //phone: yup.string().required('+234').label('Phone'),
    password: yup
      .string()
      .required()
      .min(8)
      .matches(
        /^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/,
        'Password must contain one special character'
      ),
  })
  .required();

const SignupForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema) as any,
  });
  const { handleSignup, loading, error } = useSignup();
  //const [phone, setPhone] = useState<string>(''); // Add phone state
  const [showPassword, setShowPassword] = useState(false);
  const searchParams = useSearchParams();
  const code = decodeURIComponent(searchParams.get('code') || '');

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleSignup(data);
  };

  return (
    <ClientOnly>
      <div className='max-w-[100%] rounded-3xl bg-white py-2 lg:min-w-[540px] lg:max-w-[566px] lg:border lg:border-[#DCDCDC] lg:px-6'>
        <h1 className='my-5 hidden text-center text-[20px] lg:block'>
          Create a <span className='text-[#FF0003]'>Myhomeetal account</span>
        </h1>
        {error && <p className='mb-2 text-center text-red-500'>{error}</p>}
        <form className='grid gap-3 lg:py-5' onSubmit={handleSubmit(onSubmit)}>
          <Input
            labelKey='First Name'
            placeholder='Enter First Name'
            {...register('firstname')}
            errorKey={errors.firstname?.message}
            labelClassName='font-clashmd text-xs text-black pl-3 lg:pl-0'
            inputClassName='rounded-[16px] bg-[#F4F4F4] placeholder:text-xs placeholder:text-[#5E5E5E]'
          />
          <Input
            labelKey='Last Name'
            placeholder='Enter Last Name'
            {...register('lastname')}
            errorKey={errors.lastname?.message}
            labelClassName='font-clashmd text-xs text-black pl-3 lg:pl-0'
            inputClassName='rounded-[16px] bg-[#F4F4F4] placeholder:text-xs placeholder:text-[#5E5E5E]'
          />
          <Input
            type='email'
            labelKey='Email Address'
            placeholder='Enter Email Address'
            {...register('email')}
            errorKey={errors.email?.message}
            labelClassName='font-clashmd text-xs text-black pl-3 lg:pl-0'
            inputClassName='rounded-[16px] bg-[#F4F4F4] placeholder:text-xs placeholder:text-[#5E5E5E]'
          />
          {/* <div>
            <label className='font-clashmd text-xs text-black pl-3 lg:pl-0'>Phone Number</label>
            <PhoneInputComponent
              value={phone}
              onChange={(value: string) => setPhone(value || '')} // Update phone state
              className='phone-input-updated'
            />
          </div> */}
          <div className='hidden'>
            <Input
              type='text'
              labelKey='Referral Code'
              value={code}
              placeholder='Enter Referral Code'
              {...register('referralCode')}
              labelClassName='font-clashmd text-xs text-black pl-3 lg:pl-0'
              inputClassName='rounded-[16px] bg-[#F4F4F4] placeholder:text-xs placeholder:text-[#5E5E5E]'
            />
          </div>

          <div className='relative'>
            <Input
              type={showPassword ? 'text' : 'password'}
              labelKey='Password'
              placeholder='Enter Password'
              {...register('password')}
              labelClassName='font-clashmd text-xs text-black pl-3 lg:pl-0'
              inputClassName='rounded-[16px] bg-[#F4F4F4] placeholder:text-xs placeholder:text-[#5E5E5E]'
            />
            <span
              onClick={() => setShowPassword(!showPassword)}
              className='absolute bottom-[14px] right-5 cursor-pointer text-[#717171]'
            >
              {showPassword ? (
                <EyeSlashIcon width={20} />
              ) : (
                <EyeIcon width={20} />
              )}
            </span>
          </div>
          <p className='text-xs text-red-500 first-letter:capitalize'>{errors.password?.message}</p>

          <Button
            className='mt-2 w-full rounded-[10px] border-0 p-4 font-clashmd text-xs shadow-none lg:rounded-full lg:text-base'
            loading={loading}
            disabled={loading}
          >
            Get Started
          </Button>
        </form>
        <p className='mt-2 text-center lg:mt-0'>
          <span className='text-sm text-[#656565]'>
            Already have an account?
          </span>{' '}
          <Link href={ROUTES.LOGIN} className='text-sm text-[#C70E10]'>
            sign in
          </Link>
        </p>
        <div className='my-3 hidden justify-center gap-3'>
          <Button
            className='rounded-lg border-0 bg-[#FFE0E0] p-3 text-black shadow-none'
            fit
          >
            <Image src='/icons/facebook.svg' width='20' height='20' alt='' />
          </Button>
          <Button onClick={() => { signIn('google') }}
            className='rounded-lg border-0 bg-[#FFE0E0] p-3 text-black shadow-none'
            fit
          >
            <Image src='/icons/google.svg' width='20' height='20' alt='' />
          </Button>
        </div>
      </div>
    </ClientOnly>
  );
};

export default SignupForm;
