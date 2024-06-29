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

interface Inputs {
  email: string;
  password: string;
}

const schema = yup
  .object({
    email: yup.string().email().required('Enter a valid email address'),
    password: yup.string().required(),
  })
  .required();

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const { handleLogin, loading, error } = useLogin();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleLogin(data);
  };

  return (
    <div className='border-grey-500 mx-5 w-full max-w-lg rounded-2xl border bg-white p-5'>
      <h1 className='my-5 text-center text-lg'>
        Sign in to <span className='text-primary'>Myhomeetal</span>
      </h1>
      {error && <p className='mb-2 text-center text-red-500'>{error}</p>}
      <div className='grid gap-3 py-5'>
        <Button className='w-full rounded-xl bg-primary/20 p-3 text-black'>
          <Image src='/icons/google.svg' width='20' height='20' alt='' />
          Continue with Google
        </Button>
        <Button className='w-full rounded-xl bg-primary/20 p-3 text-black'>
          <Image src='/icons/facebook.svg' width='20' height='20' alt='' />
          Continue with Facebook
        </Button>
      </div>
      <form className='grid gap-3' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='email'
          labelKey='Email Address'
          placeholder='Enter Email Address'
          {...register('email')}
          errorKey={errors.email?.message}
        />
        <Input
          type='password'
          labelKey='Password'
          placeholder='Enter Password'
          {...register('password')}
          errorKey={errors.password?.message}
        />
        <Button
          className='w-full rounded-full p-4'
          loading={loading}
          disabled={loading}
        >
          Login
        </Button>
      </form>
      <p className='mb-1 mt-5 text-center text-sm font-medium'>
        <span className='text-gray-600'>Don&apos;t have an account?</span>{' '}
        <Link href={ROUTES.SIGNUP} className='text-primary'>
          Create an account
        </Link>
      </p>
      <p className='mb-3 text-center text-sm font-medium'>
        <span className='text-gray-600'>Forgot password?</span>{' '}
        <Link href={ROUTES.FORGOT_PASSWORD} className='text-primary'>
          Change password
        </Link>
      </p>
    </div>
  );
};

export default LoginForm;
