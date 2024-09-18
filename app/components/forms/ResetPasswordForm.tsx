'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState } from 'react';
import OtpInput from 'react-otp-input';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import { authService } from '@/app/services/authService';
import axios from 'axios';
import toast from 'react-hot-toast';

interface Inputs {
  password: string;
  otp: string;
}

const schema = yup
  .object({
    password: yup
      .string()
      .required('Password is required')
      .min(8, 'Password must be at least 8 characters')
      .matches(
        /^.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?].*$/,
        'Password must contain one special character'
      ),
  })
  .required();

const ResetPasswordForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = decodeURIComponent(searchParams.get('email') || '');
  const [otp, setOtp] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const resendOtp = async () => {
    const data: any = { email: email };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}user/resend-otp`,
        data
      );

      if (res.status === 200) {
        toast.success('Code resent!');
      }
    } catch (error) {
      console.log(error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const { password } = data;
    const payload = { email, otp, password };
    // Handle the password reset logic here

    try {
      const res = await authService.resetPassword(payload);
      // Handle the response as needed
      if (res.status === 200) {
        router.push('/login');
      }
      console.log('Password reset successful:', res);
    } catch (error) {
      // Handle error as needed
      console.error('Password reset failed:', error);
      setError('Password reset failed');
    }
  };

  return (
    <div className='bg-white py-2 lg:min-w-[540px] lg:max-w-[566px] lg:rounded-3xl lg:border lg:border-[#DCDCDC] lg:px-6'>
      <h2 className='hidden py-5 pb-8 text-center text-xl text-black lg:block'>
        Change Password
      </h2>
      {error && <p className='mb-2 text-center text-primary'>{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className='mb-3 hidden pl-5 lg:block'>
          <p className='font-clashmd text-xs'>Enter Verification Code</p>
        </div>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={5}
          renderInput={(props) => <input {...props} />}
          inputStyle='w-[60px] bg-[#F4F4F4] lg:bg-white h-[60px] lg:max-w-[71px] lg:h-[71px] rounded-[10px] mx-1 lg:mx-auto lg:border lg:border-[#E4E7EC] focus:bg-white focus:outline-[#FF0003] text-sm lg:text-base text-black flex-1'
          containerStyle='justify-start'
        />
        {errors.otp && (
          <p className='text-xs text-red-500'>{errors.otp.message}</p>
        )}
        <p className='pl-5 pt-3 text-[10px] lg:text-xs'>
          <span>Didn&apos;t receive the code?</span>{' '}
          <button onClick={resendOtp} className='text-primary'>Request a new code</button>
        </p>
        <div className='my-4'>
          <label htmlFor='password' className='pl-5 font-clashmd text-xs'>
            New Password
          </label>
          <div className='relative mt-1 lg:px-2'>
            <input
              id='password'
              type={showPassword ? 'text' : 'password'}
              {...register('password')}
              className='block h-[60px] w-full appearance-none rounded-[10px] border-[#F4F4F4] bg-[#F4F4F4] px-3 placeholder-[#5E5E5E] placeholder:text-xs focus:border-primary focus:outline-none lg:border lg:bg-white'
            />
            <span
              className='absolute inset-y-0 right-2 flex cursor-pointer items-center pr-3 text-sm leading-5'
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeSlashIcon width={20} />
              ) : (
                <EyeIcon width={20} />
              )}
            </span>
          </div>
          {errors.password && (
            <p className='pl-5 pt-1 text-xs text-red-500'>
              {errors.password.message}
            </p>
          )}
        </div>
        <div>
          <button
            type='submit'
            className='mb-10 mt-5 flex h-[50px] w-full items-center justify-center rounded-[10px] bg-primary font-clashmd text-base text-white lg:h-[56px] lg:rounded-full'
          >
            Reset Password
          </button>
        </div>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
