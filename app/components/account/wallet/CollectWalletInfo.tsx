'use client';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import PersonalInfoDialog from './PersonalInfoDialog';
import AddressDialog from './AddressDialog';
import BVNDialog from './BVNDialog';

import MyDialog from '@components/Dialog';
import Button from '@components/Button';
import { useRouter } from 'next/navigation';
import PhoneInputComponent from '../phoneNumber';
import Input from '../../Input';
import authUtils from '@/app/utils/authUtils';

interface UserInfo {
  firstname: string;
  lastname: string;
  email: string;
  phone?: string;
}

const CollectWalletInfo = () => {
  const router = useRouter();

  const [isWallet, setIsWallet] = useState(false);

  useEffect(() => {
    const fetchedUserInfo = authUtils.getUserInfo();
    if (fetchedUserInfo) {
      setEmail(fetchedUserInfo?.email);
      setLastName(fetchedUserInfo?.lastname);
      setFirstName(fetchedUserInfo?.firstname);
      setPhoneNumber(fetchedUserInfo?.phone);
    }
  }, []);

  //personal information states
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [isPersonalInfoCompleted, setIsPersonalInfoCompleted] = useState(true);
  //phone number states
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [isPhoneNumberCompleted, setisPhoneNumberCompleted] = useState(false);
  //bvn states
  const [isBvnDialogOpen, setIsBvnDialogOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bvn, setBvn] = useState('');
  const [isBvnCompleted, setIsBvnCompleted] = useState(false);

  const handleContinueSetup = () => {
    if (isPersonalInfoCompleted && isPhoneNumberCompleted && isBvnCompleted) {
      router.push(
        `/account/my-wallet/verification?email=${encodeURIComponent(email)}`
      );
    }
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber && otp) {
      setisPhoneNumberCompleted(true);
      setIsPhoneDialogOpen(false);
    }
  };

  const handleBvnSubmit = () => {
    if (fullName && bvn) {
      setIsBvnCompleted(true);
      setIsBvnDialogOpen(false);
    }
  };

  return (
    <div className='my-10 border-[#DCDCDC] pb-28 pt-10 lg:rounded-2xl lg:border lg:px-7'>
      <h2 className='font-clashmd text-sm text-black lg:text-base'>
        Customer Information
      </h2>
      <p className='mt-1 max-w-[284px] text-[10px] leading-[12.3px] lg:max-w-[509px] lg:text-sm lg:leading-[17.22px] lg:text-[#5E5E5E]'>
        We collect your information to protect you from fraud as well as to
        comply with local laws and regulations.
      </p>
      <div className='mt-5 grid gap-5 lg:mt-10'>
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
          trigger={
            <InfoAction
              label='Phone Number'
              completed={isPhoneNumberCompleted}
              disabled={isPhoneNumberCompleted}
            />
          }
          content={
            <PhoneBox
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              otp={otp}
              setOtp={setOtp}
              submit={handlePhoneSubmit}
            />
          }
          open={isPhoneDialogOpen} // Control the dialog open state
          onOpenChange={setIsPhoneDialogOpen} // Handle open state change
        />
        <MyDialog
          trigger={
            <InfoAction
              label='BVN Verification'
              completed={isBvnCompleted}
              disabled={isBvnCompleted}
            />
          }
          content={
            <BvnBox
              fullName={fullName}
              setFullName={setFullName}
              bvn={bvn}
              setBvn={setBvn}
              submit={handleBvnSubmit}
            />
          }
          open={isBvnDialogOpen} // Control the dialog open state
          onOpenChange={setIsBvnDialogOpen} // Handle open state change
        />
      </div>
      <button
        onClick={handleContinueSetup}
        className='mt-16 h-[50px] w-full rounded-[10px] bg-primary font-clashmd text-base text-white lg:mt-20 lg:p-5'
      >
        Continue Setup
      </button>
    </div>
  );
};

// Define PhoneBox component to accept onPhoneNumberChange prop
interface PhoneBoxProps {
  phoneNumber: string;
  setPhoneNumber: (value: string) => void;
  otp: string;
  setOtp: (value: string) => void;
  submit: () => void;
}

const PhoneBox: React.FC<PhoneBoxProps> = ({
  phoneNumber,
  setPhoneNumber,
  otp,
  setOtp,
  submit,
}) => {
  return (
    <div className='min-w-full rounded-[15px] bg-white lg:min-w-[626px] lg:rounded-[30px]'>
      <div>
        <p className='mb-8 text-center font-clashmd text-sm lg:mb-10 lg:text-start lg:text-base'>
          Phone Number
        </p>
        <div>
          <div>
            <Input
              name='phone'
              labelKey='Phone Number'
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              labelClassName=' text-black font-clashmd text-[8px] lg:text-xs'
              inputClassName='lg:border text-sm placeholder:text-[#53535399] placeholder:text-[10px] lg:placeholder:text-xs h-[60px] lg:placeholder:text-myGray bg-[#F4F4F4] rounded-[10px] lg:h-[70px] lg:border-[#D9D9D9] lg:bg-white'
            />
            <div className='mt-2 flex items-center justify-end'>
              <button className='text-[10px] text-[#1B691B]'>
                Request Otp
              </button>
            </div>
          </div>
          <div>
            <Input
              name='otp'
              labelKey='One-time-Password'
              onChange={(e) => setOtp(e.target.value)}
              placeholder='Enter 5 digit Pin'
              labelClassName='pl-4 text-black font-clashmd text-[8px] lg:text-xs'
              inputClassName='lg:border text-sm placeholder:text-[#53535399] placeholder:text-[10px] lg:placeholder:text-xs h-[60px] lg:placeholder:text-myGray bg-[#F4F4F4] rounded-[10px] lg:h-[70px] lg:border-[#D9D9D9] lg:bg-white'
            />
          </div>
          <button
            onClick={submit}
            className={`mt-10 w-full rounded-[10px] lg:mb-3 lg:mt-20 ${otp && phoneNumber ? 'bg-primary' : 'bg-[#989898]'}  h-[50px] px-6 font-clashmd text-base text-white lg:h-[55px]`}
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

interface BvnBoxProps {
  fullName: string;
  setFullName: (value: string) => void;
  bvn: string;
  setBvn: (value: string) => void;
  submit: () => void;
}

const BvnBox: React.FC<BvnBoxProps> = ({
  fullName,
  setFullName,
  bvn,
  setBvn,
  submit,
}) => {
  return (
    <div className='w-full bg-white lg:min-w-[626px] lg:max-w-[626px] lg:rounded-[30px] lg:py-5'>
      <div>
        <p className='mb-8 text-center font-clashmd text-sm lg:mb-10 lg:text-start lg:text-base'>
          Bank Verification Number
        </p>
        <div>
          <div>
            <Input
              name='fullname'
              labelKey='Full Name'
              onChange={(e) => setFullName(e.target.value)}
              placeholder='Enter your Full Name'
              labelClassName='pl-4 text-black font-clashmd text-[8px] lg:text-xs'
              inputClassName='lg:border text-sm placeholder:text-[#53535399] placeholder:text-[10px] lg:placeholder:text-xs h-[60px] lg:placeholder:text-myGray bg-[#F4F4F4] rounded-[10px] lg:h-[70px] lg:border-[#D9D9D9] lg:bg-white'
            />
          </div>
          <div className='mt-5'>
            <Input
              name='bvn'
              labelKey='Bank Verification Number'
              placeholder='Enter your unique 11 digit number'
              onChange={(e) => setBvn(e.target.value)}
              labelClassName='pl-4 text-black font-clashmd text-[8px] lg:text-xs'
              inputClassName='lg:border text-sm placeholder:text-[#53535399] placeholder:text-[10px] lg:placeholder:text-xs h-[60px] lg:placeholder:text-myGray bg-[#F4F4F4] rounded-[10px] lg:h-[70px] lg:border-[#D9D9D9] lg:bg-white'
            />
          </div>
          <button
            onClick={submit}
            className={`mt-16 w-full rounded-[10px] lg:mb-3 lg:mt-20 ${fullName && bvn ? 'bg-primary' : 'bg-[#989898]'}  h-[50px] px-6 font-clashmd text-base text-white lg:h-[55px]`}
          >
            Submit
          </button>
        </div>
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
      className='block w-full rounded-[10px] border border-[#DCDCDC] bg-transparent p-5 text-left text-black disabled:text-black lg:rounded-xl'
      {...props}
    >
      <span className='mb-2 block font-clashmd text-xs lg:text-sm'>
        {label}
      </span>
      <span className='flex items-center gap-2 text-[10px] text-[#5E5E5E] lg:text-xs'>
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
            <span className='text-[10px] text-primary'>-Submit {label}</span>
          </>
        )}
      </span>
    </Button>
  );
};

export default CollectWalletInfo;
