'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useSignup } from './hooks/useSignUp';

import Button from '@components/Button';
import Input from '@components/Input';
import { ROUTES } from '@utils/routes';

interface Inputs {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

const schema = yup
  .object({
    firstname: yup.string().required().label('First Name'),
    lastname: yup.string().required().label('Last Name'),
    email: yup.string().email().required('Enter a valid email address'),
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
    resolver: yupResolver(schema),
  });
  const { handleSignup, loading, error } = useSignup();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleSignup(data);
  };

  return (
    <div className='border-grey-500 mx-5 w-full max-w-lg rounded-2xl border bg-white p-5'>
      <h1 className='my-5 text-center text-lg'>
        Create a <span className='text-primary'>Myhomeetal account</span>
      </h1>
      {error && <p className='mb-2 text-center text-red-500'>{error}</p>}
      <form className='grid gap-3 py-5' onSubmit={handleSubmit(onSubmit)}>
        <Input
          labelKey='First Name'
          placeholder='Enter First Name'
          {...register('firstname')}
          errorKey={errors.firstname?.message}
        />
        <Input
          labelKey='Last Name'
          placeholder='Enter Last Name'
          {...register('lastname')}
          errorKey={errors.lastname?.message}
        />
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
          Get Started
        </Button>
      </form>
      <p className='mb-3 mt-3 text-center text-sm font-medium'>
        <span className='text-gray-600'>Already have an account?</span>{' '}
        <Link href={ROUTES.LOGIN} className='text-primary'>
          Login
        </Link>
      </p>
      <div className='mb-5 flex justify-center gap-3'>
        <Button className='rounded-xl bg-primary/20 p-3 text-black' fit>
          <Image src='/icons/facebook.svg' width='20' height='20' alt='' />
        </Button>
        <Button className='rounded-xl bg-primary/20 p-3 text-black' fit>
          <Image src='/icons/google.svg' width='20' height='20' alt='' />
        </Button>
      </div>
    </div>
  );
};

export default SignupForm;
