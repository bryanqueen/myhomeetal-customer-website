import { ButtonHTMLAttributes } from 'react';

import PersonalInfoDialog from './PersonalInfoDialog';
import AddressDialog from './AddressDialog';
import BVNDialog from './BVNDialog';
import IDDialog from './IDDialog';

import MyDialog from '@components/Dialog';
import Button from '@components/Button';

const CollectWalletInfo = () => {
  const isPersonalInfoCompleted = false;

  return (
    <div className='my-10 rounded-2xl border p-6 lg:p-8'>
      <h2 className='text-2xl'>Customer Information</h2>
      <p className='my-3 max-w-xl text-sm text-gray-600'>
        We collect your information to protect you from fraud as well as to
        comply with local laws and regulations.
      </p>
      <div className='grid gap-5'>
        <MyDialog
          trigger={
            <InfoAction
              label='Personal Information'
              completed={isPersonalInfoCompleted}
              disabled={isPersonalInfoCompleted}
            />
          }
          content={<PersonalInfoDialog />}
        />
        <MyDialog
          trigger={<InfoAction label='Proof of Address' />}
          content={<AddressDialog />}
        />
        <MyDialog
          trigger={<InfoAction label='BVN Verification' />}
          content={<BVNDialog />}
        />
        <MyDialog
          trigger={<InfoAction label='Proof of ID' />}
          content={<IDDialog />}
        />
      </div>
    </div>
  );
};

interface InfoActionType extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  completed?: boolean;
}

const InfoAction = ({ label, completed = false, ...props }: InfoActionType) => {
  return (
    <Button
      className='block w-full rounded-2xl border-2 bg-transparent p-5 text-left text-black'
      {...props}
    >
      <span className='mb-2 block text-lg'>{label}</span>
      <span className='flex items-center gap-3 text-gray-500'>
        {completed ? (
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='0.5'
              y='0.5'
              width='13.3296'
              height='13.5383'
              rx='6.66478'
              stroke='#42FF00'
            />
            <path d='M4 7.74717L5.79122 9.53834L10.3296 5' stroke='#42FF00' />
          </svg>
        ) : (
          <svg
            width='15'
            height='15'
            viewBox='0 0 15 15'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <circle cx='7.5' cy='7.5' r='7' stroke='#FF0002' />
            <path
              d='M8.1407 3.96C8.1407 5.20667 8.13737 6.06 8.1307 6.52C8.12404 6.97333 8.10404 7.35 8.0707 7.65C8.04404 7.95 7.98737 8.37333 7.9007 8.92H7.1007C7.01404 8.37333 6.95404 7.95 6.9207 7.65C6.89404 7.35 6.87737 6.97333 6.8707 6.52C6.86404 6.06 6.8607 5.20667 6.8607 3.96H8.1407ZM6.7807 9.56H8.2207V11H6.7807V9.56Z'
              fill='#FF0002'
            />
          </svg>
        )}
        {completed ? (
          'Completed'
        ) : (
          <>
            Incomplete
            <span className='text-sm text-red-500'>-Submit {label}</span>
          </>
        )}
      </span>
    </Button>
  );
};

export default CollectWalletInfo;
