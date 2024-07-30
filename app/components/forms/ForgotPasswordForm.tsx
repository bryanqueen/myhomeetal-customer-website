'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
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
    handleForgotPassword(data);
    console.log(data);
  };

  return (
    <div className='bg-white py-2 lg:min-w-[540px] lg:max-w-[566px] lg:rounded-3xl lg:border lg:border-[#DCDCDC] lg:px-6'>
      <h1 className='mt-10 text-xl hidden lg:block'>
        Forgot <span className='text-primary'>Password?</span>
      </h1>
      <p className='my-2 max-w-xs text-xs text-black hidden lg:block'>
        No worries! We&apos;ll help you reset it and get back to your account.
      </p>
      {error && <p className='mb-2 text-center text-red-500'>{error}</p>}
      <form className='grid gap-3' onSubmit={handleSubmit(onSubmit)}>
        <Input
          type='email'
          labelKey='Email Address'
          placeholder='Enter Email Address'
          className='my-10'
          inputClassName='rounded-[10px] placeholder:text-xs placeholder:text-[#5E5E5E]'
          labelClassName='text-xs font-clashmd text-black pl-4'
          {...register('email')}
          errorKey={errors.email?.message}
        />
        <Button
          className='h-[56px] w-full rounded-full border-0 font-clashmd text-base shadow-none'
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
