'use client';
import Input from '@/app/components/Input';
import PhoneInputComponent from '@/app/components/account/phoneNumber';
import productService from '@/app/services/productService';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/16/solid';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

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
  const [password, setPassword] = useState(userInfo?.password || '');
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
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

  const customInputStyle: React.CSSProperties = {
    height: '55px',
    border: '0px',
  };
  const customMobileInputStyle: React.CSSProperties = {
    height: '60px',
    backgroundColor: 'white',
    border: '0px',
  };

  const customButtonStyle: React.CSSProperties = {
    border: '0px',
  };

  const customMobileButtonStyle: React.CSSProperties = {
    backgroundColor: 'white',
    border: '0px',
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setloading(true);
    try {
      const payload = {
        firstName,
        lastName,
        phone_number: phone,
        email,
        password,
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
                className={`relative flex items-center gap-[2px] text-[10px] text-primary ${loading ? 'cursor-not-allowed' : ''}`}
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
            <div>
              <Input
                name='password'
                value={password}
                type={showPassword ? 'text' : 'password'}
                variant='outline'
                onChange={(e) => setPassword(e.target.value)}
                disabled={!editMode}
                inputClassName='bg-white h-[60px] lg:h-[56px] border-0 rounded-[10px] lg:rounded-2xl placeholder:text-[#989898]'
                placeholder='*********'
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className='absolute bottom-[14px] right-10 cursor-pointer text-[#717171]'
              >
                {showPassword ? (
                  <EyeSlashIcon width={20} />
                ) : (
                  <EyeIcon width={20} />
                )}
              </span>
            </div>
            <div className='grid gap-2'>
              <PhoneInputComponent
                mobileInputStyle={customMobileInputStyle}
                mobileButtonStyle={customMobileButtonStyle}
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
                className={`relative flex items-center gap-[2px] font-clashmd text-base text-primary ${loading ? 'cursor-not-allowed' : ''}`}
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
            <div className='mb-5 grid gap-5 md:grid-cols-2'>
              <div className='relative'>
                <Input
                  name='password'
                  labelKey='Password'
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={!editMode}
                  variant='outline'
                  inputClassName='bg-[#F4F4F4] lg:bg-white h-[60px] lg:h-[56px] border-0 rounded-[10px] lg:rounded-2xl placeholder:text-black'
                  placeholder='*********'
                  labelClassName='lg:text-myGray lg:text-base text-black text-[8px] font-clashmd'
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className='absolute bottom-[18px] right-5 cursor-pointer text-[#717171]'
                >
                  {showPassword ? (
                    <EyeSlashIcon width={20} />
                  ) : (
                    <EyeIcon width={20} />
                  )}
                </span>
              </div>

              <div className='grid gap-2'>
                <label className='font-clashmd text-[8px] text-black lg:text-base lg:text-myGray'>
                  Phone Number
                </label>
                <PhoneInputComponent
                  inputStyle={customInputStyle}
                  buttonStyle={customButtonStyle}
                  value={phone}
                  onChange={handlePhoneChange}
                  disabled={!editMode}
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
