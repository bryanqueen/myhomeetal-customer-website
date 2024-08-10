'use client';
import Input from '@/app/components/Input';
import productService from '@/app/services/productService';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import PhoneInputComponent from './phoneNumber2';

interface UserInfo {
  firstname: string;
  email: string;
  phone_number?: string;
  lastname: string;
  password: string;
}

interface AccountDashboardProps {
  userInfo: UserInfo | null;
}

export default function PersonalInformationForm({
  userInfo,
}: AccountDashboardProps) {
  const [firstName, setFirstName] = useState(userInfo?.firstname || '');
  const [lastName, setLastName] = useState(userInfo?.lastname || '');
  const [error, setError] = useState('');
  const [email, setEmail] = useState(userInfo?.email || '');
  const [phone, setPhone] = useState(userInfo?.phone_number || '');
  const [editMode, setEditMode] = useState(false);
  const [loading, setloading] = useState(false);

  const handlePhoneChange = (value: string) => {
    // Allow digits and the '+' character at the beginning
    const isNumber = /^[+]?\d*$/.test(value);

    if (!isNumber) {
      setError('Invalid Phone Number format');
    } else {
      setError('');
      setPhone(value);
    }
  };

  // Update lastName when userInfo changes and editMode is false
  useEffect(() => {
    if (!editMode) {
      setLastName(userInfo?.lastname || '');
    }
  }, [userInfo, editMode]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      const payload = {
        firstName,
        lastName,
        phone_number: phone,
        email,
      };
      const res = await productService.updateUser(payload);
      if (res.status === 200) {
        console.log(res.data);
        toast.success('Profile updated successfully');
        setloading(false);
        setEditMode(false);
      }
    } catch (error) {
      console.log(error);
      setloading(false);
      setEditMode(false);
      toast.error('Sorry an error occured. Please try again later');
    }
  };

  return (
    <div>
      {/**Mobile form */}
      <form onSubmit={handleSubmit} className='mt-4 lg:hidden'>
        <div className='rounded-[10px] bg-[#F4F4F4] px-4 py-5'>
          <div className='flex items-center justify-between'>
            <div className='flex w-fit items-center gap-3'>
              <span className='flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FFE0E0] text-[8px] text-myGray'>
                1
              </span>
              <p className='text-xs text-myGray'>Personal Information</p>
            </div>
            {editMode ? (
              <button
                disabled={loading}
                type='submit'
                className={`relative mb-5 flex items-center gap-[6px] text-[10px] text-primary ${loading ? 'cursor-not-allowed' : ''}`}
              >
                {loading && (
                  <span className='relative flex h-3 w-3'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
                    <span className='relative inline-flex h-3 w-3 rounded-full bg-primary'></span>
                  </span>
                )}

                {loading ? 'saving...' : 'Save Information'}
              </button>
            ) : (
              <p
                onClick={() => setEditMode(true)}
                className='cursor-pointer text-[10px] text-primary'
              >
                Edit Information
              </p>
            )}
          </div>

          <div className='mt-5 grid gap-[14px]'>
            <div className='relative'>
              <Input
                name='firstName'
                type='text'
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                disabled={!editMode}
                variant='outline'
                inputClassName='border-0 h-[65px] rounded-[10px] text-xs placeholder:text-[#989898]'
              />
            </div>
            <div className='relative'>
              <Input
                name='lastName'
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                disabled={!editMode}
                type='text'
                variant='outline'
                inputClassName='border-0 h-[65px] rounded-[10px] text-xs placeholder:text-[#989898]'
              />
            </div>
            <div className='relative'>
              <Input
                name='email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!editMode}
                type='text'
                variant='outline'
                inputClassName='border-0 h-[65px] rounded-[10px] text-xs placeholder:text-[#989898]'
              />
            </div>
            <div className='grid gap-2'>
              <PhoneInputComponent
                value={phone}
                onChange={handlePhoneChange}
                disabled={!editMode}
              />
              {error && <p style={{ color: 'red' }}>{error}</p>}
            </div>
          </div>
        </div>
      </form>

      {/**Desktop form */}
      <form onSubmit={handleSubmit} className='hidden lg:block'>
        <div className='my-10 rounded-2xl border border-[#F4F4F4] p-3 pb-5'>
          <div className='mb-3 flex justify-between pt-3'>
            <div className='flex items-center gap-3'>
              <p className='text-base text-myGray'>Personal Information</p>
            </div>
            {editMode ? (
              <button
                disabled={loading}
                type='submit'
                className={`relative mr-5 flex items-center gap-[6px] font-clashmd text-base text-primary ${loading ? 'cursor-not-allowed' : ''}`}
              >
                {loading && (
                  <span className='relative flex h-3 w-3'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
                    <span className='relative inline-flex h-3 w-3 rounded-full bg-primary'></span>
                  </span>
                )}

                {loading ? 'saving...' : 'Save Information'}
              </button>
            ) : (
              <p
                onClick={() => setEditMode(true)}
                className='cursor-pointer font-clashmd text-base text-primary'
              >
                Edit Information
              </p>
            )}
          </div>
          <div className='rounded-xl bg-[#F4F4F4] p-5 py-7'>
            <div className='mb-5 grid gap-5 md:grid-cols-2'>
              <Input
                name='firstName'
                labelKey='First Name'
                type='text'
                variant='outline'
                inputClassName='border-0 rounded-2xl placeholder:text-black'
                disabled={!editMode}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                labelClassName='text-myGray font-clashmd text-base'
              />
              <Input
                name='lastName'
                labelKey='Last Name'
                type='text'
                variant='outline'
                inputClassName='border-0 rounded-2xl placeholder:text-black'
                value={lastName}
                disabled={!editMode}
                onChange={(e) => setLastName(e.target.value)}
                labelClassName='text-myGray font-clashmd text-base'
              />
            </div>
            <div className='mb-5 grid gap-5 md:grid-cols-2'>
              <Input
                name='email'
                labelKey='Email adress'
                type='text'
                variant='outline'
                inputClassName='border-0 rounded-2xl mb-3 placeholder:text-black'
                value={email}
                disabled={!editMode}
                onChange={(e) => setEmail(e.target.value)}
                labelClassName='text-myGray font-clashmd text-base'
              />
              <div className='grid'>
                <label className='font-clashmd text-[8px] text-black lg:text-base lg:text-myGray'>
                  Phone Number
                </label>
                <div className='mt-[-5px]'>
                <PhoneInputComponent
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={!editMode}
                />
                </div>
                
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
