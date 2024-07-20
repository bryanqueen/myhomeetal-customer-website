'use client';
import React, { useEffect, useState } from 'react';
import Input from '@/app/components/Input';
import { Location, CloseSquare } from 'iconsax-react';

import Button from '@/app/components/Button';
import { useAddressBook } from '@/app/addressBookProvider';
import toast from 'react-hot-toast';
import authUtils from '@/app/utils/authUtils';
import ClientOnly from '../ClientOnly';
import { userInfo } from 'os';
import { numberToWords } from '@/app/utils/helpers';
import NoHistory from './NoHistory';

interface UserInfo {
  firstname: string;
  lastname: string;
}

interface AddressCardProps {
  id: number;
  index: number | null;
  phone: string;
  address: string;
  firstname: string;
  lastname: string;
  editfunc: (address: string, phone: string, index: number, id: number) => void; // Define the function type here
  edit: Boolean;
}

export default function AddressBook() {
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [myindex, setIndex] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const { addresses, createAddress, editAddress, deleteAddress, saveAddress } =
    useAddressBook();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchedUserInfo = authUtils.getUserInfo();
    setUserInfo(fetchedUserInfo);
  }, []);

  const handleEdit = (
    address: string,
    phone: string,
    index: number,
    id: number
  ) => {
    setAddress(address);
    setPhoneNumber(phone);
    setIndex(index);
    setId(id);
    setIsEdit(true);
  };

  const addressInWords = numberToWords(myindex + 1);

  return (
    <ClientOnly>
      <div>
        <div className='hidden lg:block'>
          <div className='flex items-center justify-between'>
            <h1 className='font-clashmd text-3xl text-myGray'>Address Book</h1>
            <Button
              disabled={addresses.length === 3}
              onClick={() => setIsAddAddress(!isAddAddress)}
              className='min-w-fit border-0 px-6 py-3 text-base text-white shadow-none'
            >
              <span className='flex items-center gap-2'>
                <Location variant='Bold' size={20} />
                Add Address
              </span>
            </Button>
          </div>
          <p className='py-2 text-base text-[#7C7C7C]'>
            Easily manage and select delivery locations to ensure your orders
            reach exactly where you want them.
          </p>
        </div>
        {/**Address display container */}
        {addresses.length > 0 ? (
          <div className='grid gap-5 lg:mt-10 lg:w-fit lg:grid-cols-3'>
            {addresses.map((address, index) => (
              <AddressCard
                index={index}
                id={address.id}
                key={address.id}
                phone={address.phoneNumber}
                address={address.email}
                lastname={userInfo?.lastname}
                firstname={userInfo?.firstname}
                editfunc={handleEdit}
                edit={isEdit}
              />
            ))}
          </div>
        ) : (
          <div>
            {!isAddAddress && (
              <div className='flex h-[80vh] items-center justify-center'>
                <NoHistory
                  title='No Address add yet'
                  buttonText='Add Address'
                  bodyText="It looks like you haven't added an address yet. Ready to set up your delivery details? Add your address to start enjoying our tailored shopping experience."
                  icon={<Location variant='Bold' size={20} />}
                  onButtonClick={() => setIsAddAddress(true)}
                />
              </div>
            )}
          </div>
        )}

        {/**Mobile add address btn */}
        {addresses.length > 0 && (
          <div className='mt-14 lg:hidden'>
            <Button
              onClick={() => setIsAddAddress(!isAddAddress)}
              disabled={addresses.length === 3}
              className='h-[50px] w-full rounded-[10px] border-0 font-clashmd text-base text-white shadow-none'
            >
              <span className='flex items-center gap-2'>
                <Location variant='Bold' size={20} />
                Add Address
              </span>
            </Button>
          </div>
        )}

        {/**Add container */}
        {isAddAddress && (
          <div>
            <div className='mx-auto mt-10 max-w-[582px] rounded-xl bg-[#f4f4f4] px-5 py-10 lg:mt-24 lg:block lg:rounded-2xl'>
              <div className='grid max-w-[503px] gap-5'>
                <Input
                  name='address'
                  onChange={(e) => setAddress(e.target.value)}
                  labelKey='Delevery Address'
                  placeholder='10, Uliot street, Bariga, Lagos Nigeria'
                  labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                  inputClassName='h-[50px] rounded-[10px] lg:rounded-2xl lg:h-[56px] bg-white placeholder:text-xs placeholder:text-[#989898] lg:placeholder:text-sm lg:placeholder:text-black'
                />
                <Input
                  name='phoneNumber'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  labelKey='Phone Number'
                  placeholder='+234 9073872270'
                  labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                  inputClassName='h-[50px] rounded-[10px] lg:rounded-2xl lg:h-[56px] bg-white placeholder:text-xs placeholder:text-[#989898] lg:placeholder:text-sm lg:placeholder:text-black'
                />
              </div>
              <div className='hidden items-center justify-center lg:flex'>
                <button
                  onClick={() => {
                    createAddress(address, phoneNumber);
                    toast.success('Address created successfully');
                    setIsAddAddress(false);
                  }}
                  className='mx-auto mt-10 h-[50px] w-full max-w-[391px] rounded-full bg-primary text-center font-clashmd text-base text-white'
                >
                  Create a New Address
                </button>
              </div>
            </div>
            <div className='flex items-center justify-center lg:hidden'>
              <button
                onClick={() => {
                  createAddress(address, phoneNumber);
                  toast.success('Address created successfully');
                  setIsAddAddress(false);
                }}
                className='mx-auto mt-14 h-[50px] min-w-full rounded-[10px] bg-primary text-center font-clashmd text-base text-white'
              >
                Create a New Address
              </button>
            </div>
          </div>
        )}
        {/**Edit container */}
        {isEdit && (
          <div>
            <div className='mx-auto mt-10 max-w-full rounded-2xl bg-[#f4f4f4] px-5 py-10 lg:mt-24 lg:block'>
              <p className='font-clashmd text-xs lg:text-base'>
                Address {addressInWords}
              </p>
              <p className='max-w-[243px] text-[10px] lg:max-w-[497px] lg:text-sm'>
                Ensure the details entered are accurate to avoid issues during
                product delivery
              </p>
              <div className='grid max-w-[503px] gap-5'>
                <Input
                  name='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  labelKey='Delevery Address'
                  placeholder='10, Uliot street, Bariga, Lagos Nigeria'
                  labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                  inputClassName='h-[56px] text-xs bg-white placeholder:text-sm placeholder:text-black'
                />
                <Input
                  name='phoneNumber'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  labelKey='Phone Number'
                  placeholder='+234 9073872270'
                  labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                  inputClassName='h-[56px] text-xs bg-white placeholder:text-sm placeholder:text-black'
                />
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <button
                onClick={() => {
                  editAddress(id, address, phoneNumber);
                  toast.success('Address updated successfully');
                  setIsEdit(false);
                }}
                className='mx-auto mt-10 h-[50px] w-full max-w-[391px] rounded-[10px] bg-primary text-center font-clashmd text-base text-white lg:rounded-full'
              >
                Update Address
              </button>
            </div>
          </div>
        )}
      </div>
    </ClientOnly>
  );
}

const AddressCard: React.FC<AddressCardProps> = ({
  id,
  index,
  phone,
  address,
  firstname,
  lastname,
  editfunc,
  edit,
}) => {
  const { addresses, createAddress, editAddress, deleteAddress, saveAddress } =
    useAddressBook();
  const addressInWords = numberToWords(index + 1);
  return (
    <div className='flex w-full flex-col rounded-[10px] bg-[#F4F4F4] px-5 pt-4 lg:block lg:max-w-[262px] lg:items-center lg:rounded-2xl lg:py-4'>
      <div className='mb-5 flex min-w-full items-end justify-between lg:mb-10'>
        <span className='text-sm text-[#7C7C7C] lg:text-base'>
          Address {addressInWords}
        </span>
        <Button
          onClick={() => {
            deleteAddress(id);
            toast.success('Address successfully deleted');
          }}
          className='p-0 text-[#525252]'
          variant='ghost'
          fit
        >
          <CloseSquare variant='Bold' />
        </Button>
      </div>
      <div>
        <p className='text-xs text-[#7C7C7C] lg:max-w-[209px] lg:text-start lg:text-sm lg:text-black'>
          {firstname} {lastname}
        </p>
        <p className='text-xs text-[#7C7C7C] lg:max-w-[209px] lg:text-start lg:text-sm lg:text-black'>
          {address}
        </p>
        <p className='text-xs text-[#7C7C7C] lg:mb-5 lg:max-w-[209px] lg:text-start lg:text-sm lg:text-black'>
          {phone}
        </p>
      </div>

      <div className='mt-5 flex items-center justify-center lg:mt-0 lg:block'>
        <Button
          onClick={() => editfunc(address, phone, index, id)}
          className='mb-3 w-full max-w-[224px] rounded-[8px] border-0 bg-white px-6 py-3 font-clashmd text-sm text-primary shadow-none lg:mb-0 lg:w-full lg:font-clash lg:text-base'
        >
          <span className='flex items-center justify-center gap-3 lg:gap-2'>
            <Location variant='Bold' size={20} />
            Edit Address
          </span>
        </Button>
      </div>
    </div>
  );
};
