'use client';

import { forwardRef } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-number-input';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import 'react-phone-number-input/style.css';

import DocumentInput from './DocumentInput';

import Button from '@components/Button';
import Input from '@components/Input';

const schema = yup
  .object({
    fullname: yup.string().required().label('Full Name'),
    phone_number: yup.string().required().label('Phone Number'),
    document: yup.mixed().required(),
  })
  .required();

interface Inputs {
  fullname: string;
  phone_number: string;
  document: any;
}

const CustomPhoneInput = forwardRef((props: any, ref) => (
  <Input
    ref={ref}
    variant='outline'
    className='ml-2'
    inputClassName='border-0 py-5 px-3'
    {...props}
  />
));
CustomPhoneInput.displayName = 'Phone Input';

const PersonalInfoDialog = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({ resolver: yupResolver(schema) as any });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className='flex w-[80vw] max-w-3xl flex-col gap-4 p-5 px-2'>
      <div className='py-5'>
        <p className='font-bold'>Personal Information</p>
        <p>Enter your details</p>
      </div>
      <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          labelKey='Full Name'
          placeholder='Enter your Full Name'
          variant='outline'
          inputClassName='py-5'
          labelClassName='text-black pl-2'
          {...register('fullname')}
          errorKey={errors.fullname?.message}
        />
        <Controller
          name='phone_number'
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <div>
              <label className='mb-2 inline-block pl-2' htmlFor='phone'>
                Phone Number
              </label>
              <PhoneInput
                id='phone'
                placeholder='Enter phone number'
                value={value}
                onChange={onChange}
                className='grid rounded-xl border border-gray-300 pl-5'
                defaultCountry='NG'
                inputComponent={CustomPhoneInput}
              />
              {fieldState.error && (
                <p className='my-2 text-xs text-red-500 first-letter:capitalize'>
                  {fieldState.error?.message}
                </p>
              )}
            </div>
          )}
          rules={{ required: true }}
        />
        <Controller
          name='document'
          control={control}
          render={({ field: { onChange, value }, fieldState }) => (
            <DocumentInput
              id='document'
              value={value}
              onChange={onChange}
              labelKey='Upload Document'
              errorKey={fieldState.error?.message}
            />
          )}
          rules={{ required: true }}
        />
        <Button className='mb-2 mt-5 w-full gap-2 rounded-lg p-4 font-normal'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default PersonalInfoDialog;
