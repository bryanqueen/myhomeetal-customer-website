'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import OtpInput from 'react-otp-input';

import Button from '@components/Button';
import Input from '@components/Input';
import { ROUTES } from '@utils/routes';

const OTPForm = () => {
  const [otp, setOtp] = useState('');

  const onSubmit = (e: any) => {
    e.preventDefault();
    const data = { email: '', otp: otp };

    console.log(data);
  };

  return (
    <div className='border-grey-500 mx-5 w-full max-w-lg rounded-2xl border bg-white p-6'>
      <h1 className='my-5 text-center text-lg'>Enter verification code</h1>
      <p className='text-center'>
        We have sent a verification code to oyefesoafolabiteniola@gmail.com
      </p>
      {/* {error && <p className='mb-2 text-center text-red-500'>{error}</p>} */}

      <form className='grid gap-3' onSubmit={onSubmit}>
        <div className='my-10'>
          <p className='text-center text-xs'>5 digit code</p>
        </div>
        <OtpInput
          value={otp}
          onChange={setOtp}
          numInputs={5}
          renderInput={(props) => <input {...props} />}
          inputStyle='p-3 md:p-5 rounded-xl mx-2 md:mx-3 border border-gray-400 focus:outline-primary text-black flex-1'
          containerStyle='justify-center mb-10'
        />
        <Button
          className='w-full rounded-full p-4'
          // loading={loading}
          // disabled={loading}
        >
          Verify One Time Password
        </Button>
      </form>
      <p className='py-3 text-center text-sm font-medium'>
        <span className='text-gray-600'>Didn&apos;t receive the code?</span>{' '}
        <Link href='' className='text-primary'>
          Request a new code
        </Link>
      </p>
    </div>
  );
};

export default OTPForm;
