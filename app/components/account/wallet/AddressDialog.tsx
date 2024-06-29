'use client';

import Image from 'next/image';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import DocumentInput from './DocumentInput';

import Button from '@components/Button';

interface Inputs {
  document: string;
}

const AddressDialog = () => {
  const { handleSubmit, control } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log('Data: ', data);
  };

  return (
    <div className='flex w-[80vw] max-w-3xl flex-col gap-4 p-5 px-2'>
      <div className='py-5'>
        <p className='font-bold'>Proof of Address</p>
        <p>Upload a clear Proof of Address Document</p>
      </div>
      <form className='grid gap-4' onSubmit={handleSubmit(onSubmit)}>
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
        <p className='pl-2 text-sm'>(Maximum upload size 5MB)</p>
        <div className='my-3 flex items-center gap-4'>
          <Image
            src='/icons/image-icon.svg'
            alt='icon'
            width={25}
            height={20}
          />
          <span className='gap-5 text-primary'>Preview Sample Document</span>
        </div>
        <div>
          <p>Check that the image certifies these criteria&apos;s:</p>
          <ul className='m-5 list-disc text-gray-600'>
            <li>Image is clear and legible</li>
            <li>Document contains legible names</li>
            <li>Document contains information no older than 3 months</li>
            <li>Image is the full width of your identification document</li>
            <li>Ensure all 4 corners of document to be uploaded are visible</li>
          </ul>
        </div>
        <Button className='mb-2 mt-5 w-full gap-2 rounded-lg p-4 font-normal'>
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddressDialog;
