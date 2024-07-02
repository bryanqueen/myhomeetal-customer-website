'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import { useLogin } from './hooks/useLogin';

import Button from '@components/Button';
import Input from '@components/Input';
import { ROUTES } from '@utils/routes';
import { useForgotPassword } from './hooks/useForgotPassword';

interface Inputs {
  email: string;
}

const schema = yup
  .object({
    email: yup.string().email().required('Enter a valid email address'),
  })
  .required();

const ForgotPasswordForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema) as any,
  });

  const { handleForgotPassword, loading, error } = useForgotPassword();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    handleForgotPassword(data)
    console.log(data);
  };

  return (
    <div className='border-grey-500 mx-5 w-full max-w-lg rounded-2xl border bg-white p-5'>
      <h1 className='mt-10 text-xl'>
        Forgot <span className='text-primary'>Password?</span>
      </h1>
      <p className='my-2 max-w-xs text-gray-700'>
        No worries! We&apos;ll help you reset it and get back to your account.
      </p>
      {error && <p className='mb-2 text-center text-red-500'>{error}</p>}
      <form className='grid gap-3' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='email'
          labelKey='Email Address'
          placeholder='Enter Email Address'
          className='my-10'
          {...register('email')}
          errorKey={errors.email?.message}
        />
        <Button
          className='w-full rounded-full p-4'
          loading={loading}
          disabled={loading}
        >
          Reset Password
        </Button>
      </form>
      <Button
        className='mb-5 mt-1 w-full rounded-full border-0 bg-white p-4 text-black hover:shadow-none'
        linkType='rel'
        href={ROUTES.LOGIN}
      >
        Cancel
      </Button>
    </div>
  );
};

export default ForgotPasswordForm;
