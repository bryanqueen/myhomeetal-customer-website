'use client';
import React, { useEffect, useRef, useState } from 'react';
import Input from '@/app/components/Input';
import { Location, CloseSquare, Trash } from 'iconsax-react';

import Button from '@/app/components/Button';
import { useAddressBook } from '@/app/addressBookProvider';
import toast from 'react-hot-toast';
import authUtils from '@/app/utils/authUtils';
import ClientOnly from '../ClientOnly';
import { numberToWords } from '@/app/utils/helpers';
import NoHistory from './NoHistory';
import Dialog from '@components/Dialog';
import Image from 'next/image';
import { Close as CloseDialog } from '@radix-ui/react-dialog';
import { locations } from '@/app/utils/constants';

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
  edit: boolean;
}

export default function AddressBook() {
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [myindex, setIndex] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);
  const [selectedLocation, setSelectedLocation] = useState('');
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
  const addAddressRef = useRef<HTMLDivElement>(null);
  const editAddressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isAddAddress && addAddressRef.current) {
      addAddressRef.current.scrollIntoView({ behavior: 'smooth' });
    } else if (isEdit && editAddressRef.current) {
      editAddressRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isAddAddress, isEdit]);

  const addressInWords = numberToWords(myindex + 1);

  const handleSelectChange = (event) => {
    setSelectedLocation(event.target.value);
  };

  return (
    <ClientOnly>
      <div>
        <div className='hidden lg:block'>
          <div className='flex items-center justify-between'>
            <h1 className='font-clashmd text-3xl text-myGray'>Address Book</h1>
            <Button
              disabled={addresses.length === 3 || isEdit === true}
              onClick={() => {
                setIsAddAddress(!isAddAddress);
              }}
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
                  title='No Address added yet'
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
              onClick={() => {
                setIsAddAddress(!isAddAddress);
              }}
              disabled={addresses.length === 3 || isEdit === true}
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
          <div ref={addAddressRef}>
            <div className='relative mx-auto mt-10 max-w-[582px] rounded-xl bg-[#f4f4f4] px-5 py-10 lg:mt-24 lg:block lg:rounded-2xl'>
              <button
                onClick={() => setIsAddAddress(false)}
                className='absolute right-4 top-4 flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[#030303]/20 lg:right-5 lg:top-5 lg:h-[34px] lg:w-[34px] lg:border-[#030303]'
              >
                <Image
                  src='/icons/X.svg'
                  width={12}
                  height={10}
                  alt='x-icon'
                  className='w-[7px] lg:w-[12px]'
                />
              </button>
              <div className='grid max-w-[503px] gap-5 lg:pt-5'>
                <Input
                  name='address'
                  onChange={(e) => setAddress(e.target.value)}
                  labelKey='Delevery Address'
                  placeholder='10, Uliot street, Bariga, Lagos Nigeria'
                  labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                  inputClassName='h-[50px] lg:text-sm text-xs rounded-[10px] lg:rounded-2xl lg:h-[56px] bg-white placeholder:text-xs placeholder:text-[#989898] lg:placeholder:text-sm lg:placeholder:text-black'
                />
                <Input
                  name='phoneNumber'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  labelKey='Phone Number'
                  placeholder='+234 9073872270'
                  labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                  inputClassName='h-[50px] lg:text-sm text-xs rounded-[10px] lg:rounded-2xl lg:h-[56px] bg-white placeholder:text-xs placeholder:text-[#989898] lg:placeholder:text-sm lg:placeholder:text-black'
                />
                <div className='grid gap-2'>
                  <label className='font-clashmd text-[10px] text-black lg:font-clash lg:text-xs'>
                    City (only in Lagos*)
                  </label>
                  <select
                    className='h-[50px] rounded-[10px] bg-white px-4 text-xs placeholder:text-xs placeholder:text-[#989898] lg:h-[56px] lg:rounded-2xl lg:text-sm lg:placeholder:text-sm lg:placeholder:text-black'
                    value={selectedLocation}
                    onChange={handleSelectChange}
                  >
                    {locations.map((lga, i) => (
                      <option key={i} value={lga.name}>
                        {lga.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className='hidden items-center justify-center lg:flex'>
                <button
                  onClick={() => {
                    if (address && phoneNumber && selectedLocation) {
                      createAddress(address, phoneNumber, selectedLocation);
                      setAddress('');
                      setPhoneNumber('');
                      setSelectedLocation('');
                      toast.success('Address created successfully');
                      setIsAddAddress(false);
                    } else {
                      toast.error('All fields are required');
                    }
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
                  if (address && phoneNumber && selectedLocation) {
                    createAddress(address, phoneNumber, selectedLocation);
                    setAddress('');
                    setPhoneNumber('');
                    setSelectedLocation('');
                    toast.success('Address created successfully');
                    setIsAddAddress(false);
                  } else {
                    toast.error('All fields are required');
                  }
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
          <div ref={editAddressRef}>
            <div className='relative mx-auto mt-10 max-w-full rounded-2xl bg-[#f4f4f4] px-5 py-10 pt-20 lg:mt-24 lg:block lg:pt-14'>
              <button
                onClick={() => setIsEdit(false)}
                className='absolute right-4 top-4 flex h-[20px] w-[20px] items-center justify-center rounded-full border border-[#030303]/20 lg:right-5 lg:top-5 lg:h-[34px] lg:w-[34px] lg:border-[#030303]'
              >
                <Image
                  src='/icons/X.svg'
                  width={12}
                  height={10}
                  alt='x-icon'
                  className='w-[7px] lg:w-[12px]'
                />
              </button>
              <div className='lg:grid grid-cols-2 gap-5'>
                <div>
                  <p className='font-clashmd text-xs lg:text-base'>
                    Address {addressInWords}
                  </p>
                  <p className='max-w-[243px] text-[10px] lg:max-w-[497px] lg:text-sm'>
                    Ensure the details entered are accurate to avoid issues
                    during product delivery
                  </p>
                </div>
                <div className='hidden gap-2 lg:grid'>
                  <label className='font-clashmd text-[10px] text-black lg:font-clash lg:text-xs'>
                    City (only in Lagos*)
                  </label>
                  <select
                    className='h-[50px] rounded-[10px] bg-white px-4 text-xs placeholder:text-xs placeholder:text-[#989898] lg:h-[56px] lg:rounded-xl lg:text-sm lg:placeholder:text-sm lg:placeholder:text-black'
                    value={selectedLocation}
                    onChange={handleSelectChange}
                  >
                    {locations.map((lga, i) => (
                      <option key={i} value={lga.name}>
                        {lga.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='grid gap-5 lg:mt-5 lg:grid-cols-2'>
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
                <div className='grid gap-2 lg:hidden'>
                  <label className='font-clashmd text-[10px] text-black lg:font-clash lg:text-xs'>
                    City (only in Lagos*)
                  </label>
                  <select
                    className='h-[50px] rounded-[10px] bg-white px-4 text-xs placeholder:text-xs placeholder:text-[#989898] lg:h-[56px] lg:rounded-xl lg:text-sm lg:placeholder:text-sm lg:placeholder:text-black'
                    value={selectedLocation}
                    onChange={handleSelectChange}
                  >
                    {locations.map((lga, i) => (
                      <option key={i} value={lga.name}>
                        {lga.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <button
                onClick={() => {
                  editAddress(id, address, phoneNumber, selectedLocation);
                  setAddress('');
                  setPhoneNumber('');
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
  const { deleteAddress } = useAddressBook();
  const addressInWords = numberToWords(index + 1);
  return (
    <div className='flex w-full flex-col rounded-[10px] bg-[#F4F4F4] px-5 pt-4 lg:block lg:max-w-[262px] lg:items-center lg:rounded-2xl lg:py-4'>
      <div className='mb-5 flex min-w-full items-end justify-between lg:mb-10'>
        <span className='text-sm text-[#7C7C7C] lg:text-base'>
          Address {addressInWords}
        </span>
        <Dialog
          trigger={
            <Button className='p-0 text-[#525252]' variant='ghost' fit>
              <CloseSquare variant='Bold' />
            </Button>
          }
          content={<Delete id={id} deleteAddress={deleteAddress} />}
        />
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

interface LogoutCardProps {
  id: number;
  deleteAddress: (id: number) => void; // Define the function type here
}

const Delete: React.FC<LogoutCardProps> = ({ id, deleteAddress }) => {
  return (
    <div className='flex w-[full] max-w-[400px] flex-col items-center gap-4 px-0 py-5 text-center lg:w-[70vw] lg:px-3'>
      <div className='h-16 w-16 rounded-full bg-[#FFC5C6]' />
      <div className=''>
        <p className='mb-3 text-center font-clashmd text-xl text-myGray lg:text-2xl'>
          Are you sure you want to <br /> delete this address?
        </p>
        <p className='text-sm text-myGray'>
          Ensure you&apos;ve saved all your actions <br /> before proceeding.
        </p>
      </div>
      <div className='w-full'>
        <CloseDialog asChild>
          <Button
            className='mb-2 h-[44px] w-full gap-2 border-0 p-3 shadow-none'
            onClick={() => deleteAddress(id)}
          >
            <span className='flex items-center gap-3 text-base'>
              <Trash variant='Bulk' />
              Yes, Delete
            </span>
          </Button>
        </CloseDialog>
        <CloseDialog asChild>
          <Button className='font-base h-[44px] w-full gap-2 border-0 bg-[#FFF1F1] text-myGray shadow-none'>
            <span className='flex items-center gap-3'>
              <CloseSquare variant='Bold' />
              No, Cancel
            </span>
          </Button>
        </CloseDialog>
      </div>
    </div>
  );
};
