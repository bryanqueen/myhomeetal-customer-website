'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLogin } from './hooks/useLogin';

import Button from '@components/Button';
import Input from '@components/Input';
import { ROUTES } from '@utils/routes';
import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';

interface Inputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required('Enter a valid email address'),
    password: yup.string().required('Password is required'),
  })
  .required();

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema) as any, // Use `as any` to avoid type errors
  });

  const { handleLogin, loading, error } = useLogin();
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleLogin(data);
  };

  return (
    <div className='bg-white py-2 lg:min-w-[540px] lg:max-w-[566px] lg:rounded-3xl lg:border lg:border-[#DCDCDC] lg:px-6'>
      <h1 className='my-5 hidden text-center text-[20px] lg:block'>
        Sign in to <span className='text-[#FF0003]'>Myhomeetal</span>
      </h1>
      {error && <p className='mb-2 text-center text-red-500'>{error}</p>}
      <div className=' gap-3 py-5 hidden'>
        <Button className='relative h-[56px] w-full rounded-[10px] border-0 bg-[#FFE0E0] font-clashmd text-[10px] text-black shadow-none lg:rounded-[16px] lg:font-clash lg:text-sm'>
          <span className='absolute left-10'>
            <Image src='/icons/google.svg' width='20' height='20' alt='' />
          </span>
          Continue with Google
        </Button>
        <Button className='relative h-[56px] w-full rounded-[10px] border-0 bg-[#FFE0E0] font-clashmd text-[10px] text-black shadow-none lg:rounded-[16px] lg:font-clash lg:text-sm'>
          <span className='absolute left-10'>
            <Image src='/icons/facebook.svg' width='20' height='20' alt='' />
          </span>
          Continue with Facebook
        </Button>
      </div>
      <form className='grid gap-3' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='email'
          placeholder='Enter Email Address'
          {...register('email')}
          errorKey={errors.email?.message}
          labelKey='Email Address'
          labelClassName='font-clashmd text-xs text-black pl-3 lg:pl-0'
          inputClassName='rounded-[16px] bg-[#F4F4F4] placeholder:text-xs placeholder:text-[#5E5E5E]'
        />
        <div className='relative'>
          <Input
            type={showPassword ? 'text' : 'password'}
            labelKey='Password'
            placeholder='Enter Password'
            {...register('password')}
            errorKey={errors.password?.message}
            labelClassName='font-clashmd text-xs text-black pl-3 lg:pl-0'
            inputClassName='rounded-[16px] bg-[#F4F4F4] placeholder:text-xs placeholder:text-[#5E5E5E]'
          />

          <span
            onClick={() => setShowPassword(!showPassword)}
            className='absolute bottom-[18px] right-5 cursor-pointer text-[#717171]'
          >
            {showPassword ? (
              <EyeSlashIcon width={20} />
            ) : (
              <EyeIcon width={20} />
            )}
          </span>
        </div>
        <div className='flex items-center justify-between pb-5 pl-2 lg:pt-2 lg:px-5 lg:pb-4'>
          <Link href='/forgot-password' className='text-xs text-[#FF0003]'>Forgot Password?</Link>
          <div className='hidden items-center gap-2'>
            <input type='checkbox' name='' id='' />
            <p className='text-xs text-black'>Stay signed-in</p>
          </div>
        </div>
        <Button
          className='mt-2 w-full border-0 shadow-none rounded-[10px] p-4 font-clashmd text-xs lg:rounded-full lg:text-base'
          loading={loading}
          disabled={loading}
        >
          Login
        </Button>
      </form>
      <p className='py-2 text-center'>
        <span className='text-[10px] text-[#656565] lg:text-sm'>
          Don&apos;t have an account?
        </span>{' '}
        <Link
          href={ROUTES.SIGNUP}
          className='text-[10px] text-[#C70E10] lg:text-sm'
        >
          Create an account
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
