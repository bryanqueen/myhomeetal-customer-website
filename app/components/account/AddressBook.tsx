'use client';
import React, { useEffect, useRef, useState } from 'react';
import Input from '@/app/components/Input';
import { Location, CloseSquare, Trash } from 'iconsax-react';
import Button from '@/app/components/Button';
import toast from 'react-hot-toast';
import authUtils from '@/app/utils/authUtils';
import ClientOnly from '../ClientOnly';
import { numberToWords } from '@/app/utils/helpers';
import NoHistory from './NoHistory';
import Dialog from '@components/Dialog';
import Image from 'next/image';
import { Close as CloseDialog } from '@radix-ui/react-dialog';
import { locations } from '@/app/utils/constants';
import productService from '@/app/services/productService';
import { HomeSkeleton } from '../loader';

interface UserInfo {
  firstname: string;
  lastname: string;
}

interface Address {
  _id: string;
  deliveryAddress: string;
  phone_number: string;
  city: string;
}

interface AddressCardProps {
  id: string;
  index: number | null;
  phone: string;
  address: string;
  firstname: string;
  lga: string;
  lastname: string;
  refresh: () => void;
  editfunc: (
    address: string,
    phone: string,
    index: number,
    id: string,
    lga: string
  ) => void; // Define the function type here
  edit: boolean;
}

export default function AddressBook() {
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [address, setAddress] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [myindex, setIndex] = useState<number | null>(null);
  const [id, setId] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [addresses, setAddresses] = useState<Address[]>([]);
  // const { addresses, createAddress, editAddress, deleteAddress, saveAddress } =
  //  useAddressBook();
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAddLoading, setIsAddLoading] = useState<boolean>(false);
  const [isUpdateLoading, setIsUpdateLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);

  //get user address
  const getAddress = async () => {
    try {
      const res = await productService.getAddress();
      if (res.status === 200) {
        setAddresses(res?.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  //create address
  const createMyAddress = async () => {
    setIsAddLoading(true);
    if (address && phoneNumber && selectedLocation) {
      try {
        const payload = {
          deliveryAddress: address,
          phone_number: phoneNumber,
          city: selectedLocation,
        };
        const res = await productService.createAddress(payload);
        if (res.status === 200) {
          setAddress('');
          setPhoneNumber('');
          setSelectedLocation('');
          toast.success('Address created successfully');
          setIsAddAddress(false);
          setIsAddLoading(false);
          getAddress();
        }
      } catch (error) {
        console.log(error);
        toast.error('An error occured. Please try again!');
        setIsAddLoading(false);
      } finally {
        setIsAddLoading(false);
      }
    } else {
      toast.error('All fields are required');
      setIsAddLoading(false);
    }
  };

  //edit address
  const handleEdit = (
    address: string,
    phone: string,
    index: number,
    id: string,
    lga: string
  ) => {
    setAddress(address);
    setPhoneNumber(phone);
    setIndex(index);
    setId(id);
    setSelectedLocation(lga);
    setIsEdit(true);
  };
  const editMyAddress = async () => {
    setIsUpdateLoading(true);
    try {
      const payload = {
        addressId: id,
        deliveryAddress: address,
        phone_number: phoneNumber,
        city: selectedLocation,
      };
      const res = await productService.updateAddress(payload);
      if (res.status === 200) {
        setAddress('');
        setPhoneNumber('');
        toast.success('Address updated successfully');
        setIsEdit(false);
        setIsUpdateLoading(false);
        getAddress();
      }
    } catch (error) {
      console.log(error);
      toast.error('An error ocurred. Plese try again!');
      setIsUpdateLoading(false);
    } finally {
      setIsUpdateLoading(false);
    }
  };

  //use efect actions
  useEffect(() => {
    const fetchedUserInfo = authUtils.getUserInfo();
    setUserInfo(fetchedUserInfo);
    getAddress();
  }, []);

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

  const handleSelectChange = (location) => {
    setSelectedLocation(location);
    setSearchTerm('');
    setDropdownOpen(false); // Close dropdown after selection
  };

  const filteredLocations = locations.map((state) => ({
    ...state,
    lga: state.lga.filter((lga) =>
      lga.name.toLowerCase().includes(searchTerm.toLowerCase())
    ),
  }));

  if (isLoading) {
    return <HomeSkeleton />;
  }

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
        <div className='pt-5'>
          {/**Address display container */}
          {addresses && addresses?.length > 0 ? (
            <div className='grid gap-5 lg:mt-10 lg:w-fit lg:grid-cols-3'>
              {addresses.map((address, index) => (
                <AddressCard
                  index={index}
                  id={address._id}
                  key={address._id}
                  phone={address.phone_number}
                  address={address.deliveryAddress}
                  lastname={userInfo?.lastname}
                  firstname={userInfo?.firstname}
                  lga={address.city}
                  editfunc={handleEdit}
                  edit={isEdit}
                  refresh={getAddress}
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
        </div>

        {/**Mobile add address btn */}
        {addresses && addresses.length > 0 && (
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
                  placeholder='Enter a Valid address'
                  labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                  inputClassName='h-[50px] lg:text-sm text-xs rounded-[10px] lg:rounded-2xl lg:h-[56px] bg-white placeholder:text-xs placeholder:text-[#989898] lg:placeholder:text-sm lg:placeholder:text-black'
                />
                <Input
                  name='phoneNumber'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  labelKey='Phone Number'
                  placeholder='Enter your Phone Number'
                  labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                  inputClassName='h-[50px] lg:text-sm text-xs rounded-[10px] lg:rounded-2xl lg:h-[56px] bg-white placeholder:text-xs placeholder:text-[#989898] lg:placeholder:text-sm lg:placeholder:text-black'
                />
                <div className='grid gap-2'>
                  <label className='font-clashmd text-[10px] text-black lg:font-clash lg:text-xs'>
                    City
                  </label>
                  <input
                    type="text"
                    placeholder={selectedLocation || 'Select your location...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className="h-[50px] w-full rounded-[10px] bg-white px-4 text-xs placeholder:text-xs placeholder:text-[#989898] lg:h-[56px] lg:rounded-xl lg:text-sm lg:placeholder:text-sm lg:placeholder:text-black"
                  />
                  {dropdownOpen && (
                    <div className="relative">
                      <div className="absolute z-10 mt-2 h-[150px] custom-scrollbar w-full overflow-y-scroll rounded-[10px] bg-white shadow-lg">
                        {filteredLocations.map(
                          (state, index) =>
                            state.lga.length > 0 && (
                              <div key={index} className="mb-2">
                                <div className="bg-gray-100 px-4 py-2 text-sm font-clashmd text-gray-700">
                                  {state.state}
                                </div>
                                {state.lga.map((lga, i) => (
                                  <div
                                    key={i}
                                    onClick={() => handleSelectChange(lga.name)}
                                    className={`cursor-pointer px-4 py-2 text-xs ${selectedLocation === lga.name
                                      ? 'bg-gray-200'
                                      : 'hover:bg-gray-100'
                                      }`}
                                  >
                                    {lga.name}
                                  </div>
                                ))}
                              </div>
                            )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className='hidden items-center justify-center lg:flex'>
                <Button
                  onClick={createMyAddress}
                  loading={isAddLoading}
                  disabled={isAddLoading}
                  className='mx-auto mt-10 h-[50px] w-full max-w-[391px] rounded-full border-0 bg-primary text-center font-clashmd text-base text-white shadow-none'
                >
                  Create a New Address
                </Button>
              </div>
            </div>
            <div className='flex items-center justify-center lg:hidden'>
              <Button
                onClick={createMyAddress}
                loading={isAddLoading}
                disabled={isAddLoading}
                className='mx-auto mt-14 h-[50px] min-w-full rounded-[10px] border-0 bg-primary text-center font-clashmd text-base text-white shadow-none'
              >
                Create a New Address
              </Button>
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
              <div className='grid-cols-2 gap-5 lg:grid'>
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
                    City
                  </label>
                  <div className='grid gap-2'>
                    <input
                      type="text"
                      placeholder={selectedLocation || 'Select your location...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="h-[50px] w-full rounded-[10px] bg-white px-4 text-xs placeholder:text-xs placeholder:text-[#989898] lg:h-[56px] lg:rounded-xl lg:text-sm lg:placeholder:text-sm lg:placeholder:text-black"
                    />
                    {dropdownOpen && (
                      <div className="relative">
                        <div className="absolute z-10 mt-2 h-[150px] custom-scrollbar w-full overflow-y-scroll rounded-[10px] bg-white shadow-lg">
                          {filteredLocations.map(
                            (state, index) =>
                              state.lga.length > 0 && (
                                <div key={index} className="mb-2">
                                  <div className="bg-gray-100 px-4 py-2 text-sm font-clashmd text-gray-700">
                                    {state.state}
                                  </div>
                                  {state.lga.map((lga, i) => (
                                    <div
                                      key={i}
                                      onClick={() => handleSelectChange(lga.name)}
                                      className={`cursor-pointer px-4 py-2 text-xs ${selectedLocation === lga.name
                                        ? 'bg-gray-200'
                                        : 'hover:bg-gray-100'
                                        }`}
                                    >
                                      {lga.name}
                                    </div>
                                  ))}
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div className='grid gap-5 lg:mt-5 lg:grid-cols-2'>
                <Input
                  name='address'
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  labelKey='Delevery Address'
                  placeholder='Enter a Valid address'
                  labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                  inputClassName='h-[56px] text-xs bg-white placeholder:text-sm placeholder:text-black'
                />
                <Input
                  name='phoneNumber'
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  labelKey='Phone Number'
                  placeholder='Enter your Phone Number'
                  labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                  inputClassName='h-[56px] text-xs bg-white placeholder:text-sm placeholder:text-black'
                />
                <div className='grid gap-2 lg:hidden'>
                  <label className='font-clashmd text-[10px] text-black lg:font-clash lg:text-xs'>
                    City
                  </label>
                  <div className='grid gap-2'>
                    <input
                      type="text"
                      placeholder={selectedLocation || 'Select your location...'}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onClick={() => setDropdownOpen(!dropdownOpen)}
                      className="h-[50px] w-full rounded-[10px] bg-white px-4 text-xs placeholder:text-xs placeholder:text-[#989898] lg:h-[56px] lg:rounded-xl lg:text-sm lg:placeholder:text-sm lg:placeholder:text-black"
                    />
                    {dropdownOpen && (
                      <div className="relative">
                        <div className="absolute z-10 mt-2 h-[150px] custom-scrollbar w-full overflow-y-scroll rounded-[10px] bg-white shadow-lg">
                          {filteredLocations.map(
                            (state, index) =>
                              state.lga.length > 0 && (
                                <div key={index} className="mb-2">
                                  <div className="bg-gray-100 px-4 py-2 text-sm font-clashmd text-gray-700">
                                    {state.state}
                                  </div>
                                  {state.lga.map((lga, i) => (
                                    <div
                                      key={i}
                                      onClick={() => handleSelectChange(lga.name)}
                                      className={`cursor-pointer px-4 py-2 text-xs ${selectedLocation === lga.name
                                        ? 'bg-gray-200'
                                        : 'hover:bg-gray-100'
                                        }`}
                                    >
                                      {lga.name}
                                    </div>
                                  ))}
                                </div>
                              )
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className='flex items-center justify-center'>
              <Button
                onClick={editMyAddress}
                disabled={isUpdateLoading}
                loading={isUpdateLoading}
                className='mx-auto mt-10 h-[50px] w-full max-w-[391px] rounded-[10px] border-0 bg-primary text-center font-clashmd text-base text-white shadow-none lg:rounded-full'
              >
                Update Address
              </Button>
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
  lga,
  firstname,
  lastname,
  editfunc,
  refresh,
  edit,
}) => {
  //delete address
  const deleteMyAddress = async () => {
    try {
      const payload = {
        addressId: id,
      };
      const res = await productService.deleteAddress(payload);
      if (res.status === 200) {
        toast.success('Address deleted successfully');
        refresh();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.status === 404 &&
        error.response.data.error === 'No address found for this user'
      ) {
        toast.error('No addresses found for this user.');
      } else {
        toast.error('An error occurred. Please try again!');
      }
    }
  };
  const addressInWords = numberToWords(index + 1);
  return (
    <div className='relative flex min-h-[193px] w-full flex-col rounded-[10px] bg-[#F4F4F4] px-5 pt-4 lg:block lg:min-h-[229px] lg:max-w-[262px] lg:items-center lg:rounded-2xl lg:py-4'>
      <div className='mb-5 flex min-w-full items-end justify-between lg:mb-7'>
        <span className='text-sm text-[#7C7C7C] lg:text-base'>
          Address {addressInWords}
        </span>
        <Dialog
          trigger={
            <Button className='p-0 text-[#525252]' variant='ghost' fit>
              <CloseSquare variant='Bold' />
            </Button>
          }
          content={<Delete id={id} deleteAddress={deleteMyAddress} />}
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

      <div className='absolute bottom-3 left-[50%] mt-5 flex w-fit translate-x-[-50%] items-center justify-center lg:mt-0 lg:block'>
        <Button
          onClick={() => editfunc(address, phone, index, id, lga)}
          className='w-full max-w-[224px] rounded-[8px] border-0 bg-white px-6 py-3 font-clashmd text-sm text-primary shadow-none lg:mb-0 lg:w-full lg:font-clash lg:text-base'
        >
          <span className='flex items-center justify-center gap-3 whitespace-nowrap lg:gap-2'>
            <Location variant='Bold' size={20} />
            Edit Address
          </span>
        </Button>
      </div>
    </div>
  );
};

interface LogoutCardProps {
  id: string;
  deleteAddress: (id: string) => void; // Define the function type here
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
