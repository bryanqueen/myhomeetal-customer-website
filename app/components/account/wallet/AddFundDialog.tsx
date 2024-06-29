'use client';

import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import Button from '@components/Button';
import Input from '@components/Input';
import SelectInput from '@components/SelectInput';

const paymentOptions = [
  {
    value: 'online_transfer',
    label: 'Online Transfer',
  },
  {
    value: 'card',
    label: 'Debit or Credit Card',
  },
];

const schema = yup
  .object({
    amount: yup.string().required(),
    payment_method: yup.string().required().label('Payment Method'),
  })
  .required();

interface Inputs {
  amount: string;
  payment_method: string;
}

const AddFundDialog = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(schema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data);
  };

  return (
    <div className='flex w-[80vw] max-w-xl flex-col gap-4 p-5 px-2'>
      <div className='py-5'>
        <p className='text-center'>Fund Account</p>
      </div>
      <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Input
          labelKey='Enter Amount'
          placeholder='Enter preferred amount'
          variant='outline'
          inputClassName='py-5'
          labelClassName='text-black pl-2'
          {...register('amount')}
          errorKey={errors.amount?.message}
        />
        <Controller
          name='payment_method'
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              labelKey='Select payment method'
              placeholder='Select your preferred payment method'
              options={paymentOptions}
              value={paymentOptions.find((c) => c.value === value)}
              onChange={(val) => onChange(val.value)}
              errorKey={errors.payment_method?.message}
            />
          )}
          rules={{ required: true }}
        />
        <Button className='mb-2 mt-5 w-full gap-2 rounded-lg p-4 font-normal'>
          Fund Account
        </Button>
      </form>
    </div>
  );
};

export default AddFundDialog;
