'use client';
import { ButtonHTMLAttributes, useEffect, useState } from 'react';
import MyDialog from '@components/Dialog';
import Button from '@components/Button';
import { useRouter } from 'next/navigation';
import PhoneInputComponent from '../phoneNumber';
import Input from '../../Input';
import authUtils from '@/app/utils/authUtils';
import productService from '@/app/services/productService';
import toast from 'react-hot-toast';
import Image from 'next/image';

const CollectWalletInfo = () => {
  const router = useRouter();

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
  const [gender, setGender] = useState('Male');
  const [dob, setDob] = useState('');
  const [isPersonalInfoCompleted, setIsPersonalInfoCompleted] = useState(false);
  const [isPersonalDialogOpen, setIsPersonalDialogOpen] = useState(false);
  //phone number states
  const [isPhoneDialogOpen, setIsPhoneDialogOpen] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isPhoneNumberCompleted, setisPhoneNumberCompleted] = useState(false);
  //bvn states
  const [isBvnDialogOpen, setIsBvnDialogOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [bvn, setBvn] = useState('');
  const [isBvnCompleted, setIsBvnCompleted] = useState(false);
  const [error, setError] = useState('');

  const [loading, setLoading] = useState(false);

  const handleContinueSetup = async () => {
    setLoading(true);
    if (isPersonalInfoCompleted && isPhoneNumberCompleted && isBvnCompleted) {
      try {
        const payload = {
          display_name: firstName,
          bvn: bvn,
          firstname: firstName,
          currency: 'NGN',
          lastname: lastName,
          email: email,
          date_of_birth: dob,
          gender: gender.toLowerCase(),
          email_alert: true,
          mobile_number: phoneNumber,
        };
        const res: any = await productService.createWallet(payload);
        if (res.status === 200) {
          router.push(`/account/my-wallet/verification`);
          setLoading(false);
        } else {
          setLoading(false);
          toast.error(res.data.error || 'An unexpected error occurred.');
          window.location.reload();
        }
      } catch (error) {
        setLoading(false);
        toast.error(
          error.response?.data?.error || 'An unexpected error occurred.'
        );
        window.location.reload();
      }
    } else {
      toast.error('Incomplete setup information.');
      setLoading(false);
    }
  };

  const handlePhoneSubmit = () => {
    if (phoneNumber) {
      setisPhoneNumberCompleted(true);
      setIsPhoneDialogOpen(false);
    }
  };

  const handlePersonalSubmit = () => {
    if (email && gender && dob) {
      setIsPersonalInfoCompleted(true);
      setIsPersonalDialogOpen(false);
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
          content={
            <PersonalInfo
              email={email}
              gender={gender}
              dob={dob}
              setDob={setDob}
              setGender={setGender}
              submit={handlePersonalSubmit}
              setEmail={setEmail}
            />
          }
          open={isPersonalDialogOpen} // Control the dialog open state
          onOpenChange={setIsPersonalDialogOpen} // Handle open state change
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
              submit={handlePhoneSubmit}
              error={error}
              setError={setError}
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
              error={error}
              setError={setError}
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
      <Button
        onClick={handleContinueSetup}
        disabled={loading}
        loading={loading}
        className='mt-16 flex h-[50px] w-full items-center justify-center rounded-[10px] border-0 bg-primary font-clashmd text-base text-white shadow-none lg:mt-20 lg:h-[60px] lg:p-5'
      >
        Continue Setup
      </Button>
    </div>
  );
};

// Define Personal component to accept onPhoneNumberChange prop
interface PersonalProps {
  email: string;
  setDob: (value: string) => void;
  dob: string;
  setGender: (value: string) => void;
  setEmail: (value: string) => void;
  gender: string;
  submit: () => void;
}
const PersonalInfo: React.FC<PersonalProps> = ({
  email,
  gender,
  dob,
  submit,
  setEmail,
  setGender,
  setDob,
}) => {
  const [isGenderToggle, setIsGenderToggle] = useState(false);
  const handleDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, ""); // Remove all non-numeric characters

    // Automatically insert the first hyphen after the fourth character (YYYY)
    if (value.length >= 4) {
      value =
        value.slice(0, 4) + (value.length > 4 ? "-" : "") + value.slice(4);
    }

    // Automatically insert the second hyphen after the sixth character (YYYY-MM)
    if (value.length >= 7) {
      value =
        value.slice(0, 7) + (value.length > 7 ? "-" : "") + value.slice(7);
    }

    // Limit the input to 10 characters (YYYY-MM-DD)
    value = value.slice(0, 10);

    setDob(value);
  };
  return (
    <div className='min-w-full rounded-[15px] bg-white px-[3%] lg:min-w-[626px] lg:rounded-[30px]'>
      <div>
        <p className='mb-8 text-center font-clashmd text-sm lg:mb-8 lg:text-start lg:text-base'>
          Personal Information
        </p>
        <div className='grid gap-5'>
          <Input
            name='email'
            type='email'
            labelKey='Email Address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder='example@gmail.com'
            labelClassName=' text-black font-clashmd text-[8px] lg:text-xs'
            inputClassName='lg:border text-xs lg:text-sm placeholder:text-[#53535399] placeholder:text-[10px] lg:placeholder:text-xs h-[60px] lg:placeholder:text-myGray bg-[#F4F4F4] rounded-[10px] lg:h-[70px] lg:border-[#D9D9D9] lg:bg-white'
          />

          <div>
            <label className='font-clashmd text-[8px] text-black lg:text-xs'>
              Gender
            </label>
            <div
              onClick={() => setIsGenderToggle(!isGenderToggle)}
              className='rounded-[10px] bg-[#F4F4F4] px-2 lg:border lg:border-[#D9D9D9] lg:bg-white lg:px-5'
            >
              {gender === 'Male' ? (
                <div className='flex h-[60px] items-center justify-between px-3 text-xs lg:h-[70px] lg:px-0 lg:text-sm'>
                  Male
                  <Image
                    src='/Male.svg'
                    width={15}
                    height={15}
                    alt='male icon'
                  />
                </div>
              ) : (
                <div className='flex h-[60px] items-center justify-between px-3 text-sm lg:h-[70px] lg:px-0'>
                  Female
                  <Image
                    src='/Female.svg'
                    width={15}
                    height={15}
                    alt='female icon'
                  />
                </div>
              )}
              {isGenderToggle && (
                <div className='grid gap-2 pb-4 transition-all'>
                  <div
                    onClick={() => setGender('Male')}
                    className={`flex h-[50px] cursor-pointer items-center justify-between rounded-xl px-4 text-xs transition-colors ${gender === 'Male' ? 'bg-[#FFC9CA]' : 'bg-white'} border-[0.5px] border-[#F4F4F4] text-myGray`}
                  >
                    Male
                    <Image
                      src='/Male.svg'
                      width={15}
                      height={15}
                      alt='male icon'
                    />
                  </div>
                  <div
                    onClick={() => setGender('Female')}
                    className={`flex h-[50px] cursor-pointer items-center justify-between rounded-xl px-4 text-xs transition-colors ${gender === 'Female' ? 'bg-[#FFC9CA]' : 'bg-white'} border-[0.5px] border-[#F4F4F4] text-myGray`}
                  >
                    Female
                    <Image
                      src='/Female.svg'
                      width={15}
                      height={15}
                      alt='female icon'
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          <label className='font-clashmd text-[8px] text-black lg:text-xs'>
            Date of Birth
          </label>
          <div className='relative'>
            <input name='dob' placeholder='YYYY-MM-DD' value={dob} onChange={handleDateChange} className='h-[60px] w-full rounded-[10px] placeholder:text-black bg-[#F4F4F4] px-5 text-xs lg:h-[70px] lg:border lg:border-[#D9D9D9] lg:bg-white lg:text-sm' />
            <Image src='/Calendar.svg' width={15} height={15} alt='calendar icon' className='absolute top-[50%] translate-y-[-50%] right-5' />
          </div>
        </div>
        <button
          onClick={submit}
          className={`mt-7 w-full rounded-[10px] lg:mb-3 lg:mt-10 ${email && gender && dob ? 'bg-primary' : 'bg-[#989898]'}  h-[50px] px-6 font-clashmd text-base text-white lg:h-[55px]`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

// Define PhoneBox component to accept onPhoneNumberChange prop
interface PhoneBoxProps {
  phoneNumber: string;
  error: string;
  setPhoneNumber: (value: string) => void;
  submit: () => void;
  setError: (value: string) => void;
}

const PhoneBox: React.FC<PhoneBoxProps> = ({
  phoneNumber,
  setPhoneNumber,
  submit,
  error,
  setError,
}) => {
  const handlePhoneChange = (value: string) => {
    // Allow digits and the '+' character at the beginning
    const isNumber = /^[+]?\d*$/.test(value);

    if (!isNumber) {
      setError('Invalid Phone Number format');
    } else {
      setError('');
      setPhoneNumber(value);
    }
  };

  return (
    <div className='min-w-full rounded-[15px] bg-white px-[3%] lg:min-w-[626px] lg:rounded-[30px]'>
      <div>
        <p className='mb-8 text-center font-clashmd text-sm lg:mb-10 lg:text-start lg:text-base'>
          Phone Number
        </p>

        <div className='grid gap-3'>
          <label className='pl-5 font-clashmd text-[8px] text-black lg:text-xs'>
            Phone Number
          </label>

          <PhoneInputComponent
            value={phoneNumber}
            onChange={handlePhoneChange}
          />
          {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
        <button
          onClick={submit}
          className={`mt-10 w-full rounded-[10px] lg:mb-3 lg:mt-20 ${phoneNumber ? 'bg-primary' : 'bg-[#989898]'}  h-[50px] px-6 font-clashmd text-base text-white lg:h-[55px]`}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

interface BvnBoxProps {
  fullName: string;
  setFullName: (value: string) => void;
  bvn: string;
  error: string;
  setBvn: (value: string) => void;
  submit: () => void;
  setError: (value: string) => void;
}

const BvnBox: React.FC<BvnBoxProps> = ({
  fullName,
  setFullName,
  bvn,
  setBvn,
  submit,
  setError,
  error,
}) => {
  const handleBvnChange = (e) => {
    const inputValue = e.target.value;
    const isNumber = /^\d+$/.test(inputValue); // Checks if input contains only numbers

    if (inputValue.length > 11 || !isNumber) {
      setError('Invalid BVN format');
    } else {
      setError('');
      setBvn(inputValue);
    }
  };
  return (
    <div className='w-full bg-white px-[3%] lg:min-w-[626px] lg:max-w-[626px] lg:rounded-[30px] lg:py-5'>
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
              inputClassName='lg:border text-xs lg:text-sm placeholder:text-[#53535399] placeholder:text-[10px] lg:placeholder:text-xs h-[60px] lg:placeholder:text-myGray bg-[#F4F4F4] rounded-[10px] lg:h-[70px] lg:border-[#D9D9D9] lg:bg-white'
            />
          </div>
          <div className='mt-5'>
            <Input
              errorKey={error}
              name='bvn'
              labelKey='Bank Verification Number'
              placeholder='Enter your unique 11 digit number'
              onChange={handleBvnChange}
              labelClassName='pl-4 text-black font-clashmd text-[8px] lg:text-xs'
              inputClassName='lg:border text-xs lg:text-sm placeholder:text-[#53535399] placeholder:text-[10px] lg:placeholder:text-xs h-[60px] lg:placeholder:text-myGray bg-[#F4F4F4] rounded-[10px] lg:h-[70px] lg:border-[#D9D9D9] lg:bg-white'
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
