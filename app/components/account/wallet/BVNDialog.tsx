'use client';

import Image from 'next/image';
import { SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@components/Button';
import Input from '@components/Input';

const schema = yup
  .object({
    bvn_number: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'BVN Number must be only digits')
      .min(11, 'BVN Number must be exactly 11 digits')
      .max(11, 'BVN Number must be exactly 11 digits')
      .label('BVN Number'),
  })
  .required();

interface Inputs {
  bvn_number: string;
}

const BVNDialog = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema) as any,
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className='flex w-[80vw] max-w-3xl flex-col gap-4 p-5 px-2'>
      <div className='py-5'>
        <p className='font-bold'>Bank Verification Number</p>
      </div>
      <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          labelKey='Bank Verification Number'
          placeholder='Enter your unique 11 digit number'
          variant='outline'
          inputClassName='py-5'
          labelClassName='text-black pl-2'
          {...register('bvn_number')}
          errorKey={errors.bvn_number?.message}
        />
        <Button className='mb-2 mt-5 w-full gap-2 rounded-lg p-4 font-normal'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default BVNDialog;
