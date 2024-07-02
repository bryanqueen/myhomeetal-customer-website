'use client';

import Image from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

import DocumentInput from './DocumentInput';

import Button from '@components/Button';
import Input from '@components/Input';
import SelectInput from '@components/SelectInput';

const idOptions = [
  {
    value: 'NIN',
    label: 'National ID Card',
  },
  {
    value: 'NIN2',
    label: 'International Passport',
  },
  {
    value: 'NIN3',
    label: "Driver's License",
  },
  {
    value: 'NIN5',
    label: "Voter's Card",
  },
];

const schema = yup
  .object({
    id_method: yup.string().required().label('ID Method'),
    document: yup.mixed().required(),
    id_number: yup
      .string()
      .required()
      .matches(/^[0-9]+$/, 'ID Number must be only digits')
      .min(11, 'ID Number must be exactly 11 digits')
      .max(11, 'ID Number must be exactly 11 digits')
      .label('ID Number'),
  })
  .required();

interface Inputs {
  id_method: string;
  document: any;
  id_number: string;
}

const IDDialog = () => {
  const {
    register,
    handleSubmit,
    control,
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
        <p className='font-bold'>Proof of ID</p>
      </div>
      <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name='id_method'
          control={control}
          render={({ field: { onChange, value } }) => (
            <SelectInput
              labelKey='Select a Field'
              placeholder='Select your preferred method of identification'
              options={idOptions}
              value={idOptions.find((c) => c.value === value)}
              onChange={(val) => onChange(val.value)}
              errorKey={errors.id_method?.message}
            />
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
        <p className='pr-2 text-right text-xs'>(Maximum upload size 5MB)</p>
        <Input
          labelKey='ID Number'
          placeholder='Enter your unique 11 digit number'
          variant='outline'
          inputClassName='py-5'
          labelClassName='text-black pl-2'
          {...register('id_number')}
          errorKey={errors.id_number?.message}
        />
        <Button className='mb-2 mt-5 w-full gap-2 rounded-lg p-4 font-normal'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default IDDialog;
