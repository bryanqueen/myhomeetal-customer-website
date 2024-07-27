'use client';

import { useCart } from 'react-use-cart';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ArrowRight } from 'iconsax-react';

import OrderSummary from './OrderSummary';
import Input from '@components/Input';
import RadioItem from '@components/RadioItem';
import ClientOnly from '@components/ClientOnly';
import Link from 'next/link';
import { useAddressBook } from '@/app/addressBookProvider';
import authUtils from '@/app/utils/authUtils';
import toast from 'react-hot-toast';
import { numberToWords } from '@/app/utils/helpers';

interface Address {
  id: number;
  email: string;
  phoneNumber: string;
}

interface UserInfo {
  firstname: string;
  lastname: string;
  id: string;
}

const CheckoutForm: React.FC = () => {
  const {
    addresses,
    createAddress,
    editAddress,
    setFirstStageCompleted,
    firstStageCompleted,
    setSelectedDeliveryMethod,
    selectedDeliveryMethod,
    selectedPaymentMethod,
    setSelectedPaymentMethod,
  } = useAddressBook();
  const { items } = useCart();
  const [isAddAddress, setIsAddAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    addresses.length > 0 ? addresses[0] : null
  );
  const [isChange, setIsChange] = useState(false);
  const [deliveryDates, setDeliveryDates] = useState({ start: '', end: '' });
  const [isEdit, setIsEdit] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [myAddress, setMyAddress] = useState('');
  const [error, setError] = useState('');
  const [myindex, setIndex] = useState<number | null>(null);
  const [id, setId] = useState<number | null>(null);

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchedUserInfo = authUtils.getUserInfo();
    const calculateDeliveryDates = () => {
      const today = new Date();
      const startDate = new Date();
      startDate.setDate(today.getDate() + 1); // Start date is tomorrow
      const endDate = new Date();
      endDate.setDate(today.getDate() + 4); // End date is three days after the start date

      const options: Intl.DateTimeFormatOptions = {
        day: 'numeric',
        month: 'short',
      };

      setDeliveryDates({
        start: startDate.toLocaleDateString('en-GB', options),
        end: endDate.toLocaleDateString('en-GB', options),
      });
    };
    const savedState = JSON.parse(localStorage.getItem('checkoutState'));
    if (savedState) {
      setSelectedAddress(savedState.address || null);
      setFirstStageCompleted(savedState.firstStage || false);
      setSelectedDeliveryMethod(savedState.deliveryMethod || '');
      setSelectedPaymentMethod(savedState.selectedPayment || '');
    }
    calculateDeliveryDates();
    setUserInfo(fetchedUserInfo);
  }, []);

  useEffect(() => {
    // Ensure that the address list is updated after creating a new address
    setSelectedAddress(addresses.length > 0 ? addresses[0] : null);
  }, [addresses]);

  const handleAddressClick = (address) => {
    setSelectedAddress(address);
  };

  const handlePhoneChange = (e) => {
    const inputValue = e.target.value;
    // Allow digits and the '+' character at the beginning
    const isNumber = /^[+]?\d*$/.test(inputValue);

    if (!isNumber) {
      setError('Invalid Phone Number format');
    } else {
      setError('');
      setPhoneNumber(inputValue);
    }
  };

  const handleEdit = (
    address: string,
    phone: string,
    index: number,
    id: number
  ) => {
    setMyAddress(address);
    setPhoneNumber(phone);
    setIndex(index);
    setId(id);
    setIsEdit(true);
  };
  const addressInWords = numberToWords(myindex + 1);

  return (
    <ClientOnly>
      <div className='grid gap-5 lg:grid-cols-[2fr_1fr]'>
        {(isEdit || isAddAddress) && (
          <div
            onClick={() => (isEdit ? setIsEdit(false) : setIsAddAddress(false))}
            className='fixed bottom-0 left-0 right-0 top-0 z-50 items-center justify-center bg-[#292929]/50 lg:flex'
          >
            {/**Edit container */}
            {isEdit && (
              <div className='absolute top-[50%] mt-20 min-w-full translate-y-[-50%] px-[3%] lg:min-w-[1115px] lg:px-0'>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className='mx-auto rounded-2xl bg-[#f4f4f4] px-5 py-10 lg:mt-24 lg:block lg:min-w-[1115px]'
                >
                  <p className='font-clashmd text-xs lg:text-base'>
                    Address {addressInWords}
                  </p>
                  <p className='max-w-[243px] text-[10px] lg:max-w-[497px] lg:text-sm'>
                    Ensure the details entered are accurate to avoid issues
                    during product delivery
                  </p>
                  <div className='mt-5 grid gap-5 lg:grid-cols-2'>
                    <Input
                      name='address'
                      value={myAddress}
                      onChange={(e) => setMyAddress(e.target.value)}
                      labelKey='Delevery Address'
                      placeholder='10, Uliot street, Bariga, Lagos Nigeria'
                      labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                      inputClassName='h-[56px] text-xs bg-white placeholder:text-sm placeholder:text-black'
                    />
                    <Input
                      name='phoneNumber'
                      value={phoneNumber}
                      onChange={handlePhoneChange}
                      errorKey={error}
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
                      editAddress(id, myAddress, phoneNumber);
                      setMyAddress('');
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
            {/**Add container */}
            {isAddAddress && (
              <div className='absolute top-[50%] min-w-full translate-y-[-50%] px-[3%]'>
                <div
                  onClick={(e) => e.stopPropagation()}
                  className='mt-10 rounded-xl bg-[#f4f4f4] px-5 py-10 lg:mx-auto lg:mt-24 lg:block lg:max-w-[582px] lg:rounded-2xl'
                >
                  <div className='mx-auto grid gap-5 lg:max-w-[503px]'>
                    <Input
                      name='address'
                      onChange={(e) => setMyAddress(e.target.value)}
                      labelKey='Delevery Address'
                      placeholder='10, Uliot street, Bariga, Lagos Nigeria'
                      labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                      inputClassName='h-[50px] w-full lg:text-sm text-xs rounded-[10px] lg:rounded-2xl lg:h-[56px] bg-white placeholder:text-xs placeholder:text-[#989898] lg:placeholder:text-sm lg:placeholder:text-black'
                    />
                    <Input
                      name='phoneNumber'
                      onChange={handlePhoneChange}
                      errorKey={error}
                      labelKey='Phone Number'
                      placeholder='+234 9073872270'
                      labelClassName='text-[10px] font-clashmd lg:font-clash lg:text-xs text-black'
                      inputClassName='h-[50px] lg:text-sm text-xs rounded-[10px] lg:rounded-2xl lg:h-[56px] bg-white placeholder:text-xs placeholder:text-[#989898] lg:placeholder:text-sm lg:placeholder:text-black'
                    />
                  </div>
                  <div className='hidden items-center justify-center lg:flex'>
                    <button
                      onClick={() => {
                        if (myAddress && phoneNumber) {
                          createAddress(myAddress, phoneNumber);
                          setMyAddress('');
                          setPhoneNumber('');
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
                <div
                  onClick={(e) => e.stopPropagation()}
                  className='flex items-center justify-center lg:hidden'
                >
                  <button
                    onClick={() => {
                      if (myAddress && phoneNumber) {
                        createAddress(myAddress, phoneNumber);
                        setMyAddress('');
                        setPhoneNumber('');
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
          </div>
        )}

        <div className='grid gap-5'>
          <div className='rounded-[10px] border border-[#F4F4F4] px-[2%] py-4 lg:rounded-2xl lg:px-5'>
            <div className='flex items-center justify-between'>
              <div className='flex w-fit items-center gap-3 lg:mt-0'>
                {firstStageCompleted ? (
                  <Image
                    alt='tick icon'
                    src='/images/tick.svg'
                    width={24}
                    height={24}
                    className='h-4 w-4 lg:h-6 lg:w-6'
                  />
                ) : (
                  <div className='flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FFE0E0] lg:h-6 lg:w-6'>
                    <p className='text-[10px] text-myGray lg:font-clashmd lg:text-sm'>
                      1
                    </p>
                  </div>
                )}

                <p className='font-clashmd text-xs text-myGray lg:text-base'>
                  Customer Address
                </p>
              </div>
              <div>
                {addresses?.length > 0 && !isChange && !firstStageCompleted && (
                  <button
                    onClick={() => setIsChange(!isChange)}
                    className='text-xs text-[#8B1A1A] lg:font-clashmd lg:text-base'
                  >
                    Change Information
                  </button>
                )}
                {isChange && (
                  <button
                    onClick={() => setIsChange(!isChange)}
                    className='text-xs text-primary lg:font-clashmd lg:text-base'
                  >
                    Continue Checkout
                  </button>
                )}
                {firstStageCompleted && (
                  <button
                    onClick={() => setFirstStageCompleted(false)}
                    className='text-xs text-primary lg:font-clashmd lg:text-base'
                  >
                    Modify Checkout
                  </button>
                )}
              </div>
            </div>
            {addresses?.length > 0 ? (
              <div>
                {!isChange ? (
                  <div className='mt-10 rounded-[10px] bg-[#F4F4F4] px-3 py-5 lg:rounded-2xl lg:px-9'>
                    <p className='mb-2 text-xs text-black lg:mb-1 lg:text-base'>
                      <span className='mr-2'>{userInfo?.firstname}</span>
                      <span>{userInfo?.lastname}</span>
                    </p>
                    <div className='flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-10'>
                      <p className='text-xs text-black lg:text-base'>
                        {selectedAddress?.email}
                      </p>
                      <p className='text-xs text-black lg:text-base'>
                        {selectedAddress?.phoneNumber}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className='mt-10'>
                    {addresses.map((address, index) => (
                      <div
                        key={address.id}
                        onClick={() => handleAddressClick(address)}
                        className={`relative mt-3 rounded-[10px] lg:mt-10 ${
                          address.id === selectedAddress.id
                            ? 'bg-primary text-white'
                            : 'bg-[#F4F4F4] text-black'
                        } px-3 py-7 lg:rounded-2xl lg:px-9 lg:py-5`}
                      >
                        <p className='mb-2 text-xs lg:mb-1 lg:text-base'>
                          <span className='mr-2'>{userInfo?.firstname}</span>
                          <span>{userInfo?.lastname}</span>
                        </p>
                        <div className='flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-10'>
                          <p className='text-xs lg:text-base'>
                            {address?.email}
                          </p>
                          <p className='text-xs lg:text-base'>
                            {address?.phoneNumber}
                          </p>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation(); // Prevent triggering the parent div's onClick
                            handleEdit(
                              address.email,
                              address.phoneNumber,
                              index,
                              address.id
                            );
                          }}
                          className={`${
                            address.id === selectedAddress.id
                              ? 'text-white'
                              : 'text-[#8B1A1A]'
                          } absolute right-2 top-[50%] h-20 w-20 translate-y-[-50%] text-sm lg:text-base`}
                        >
                          Edit
                        </button>
                      </div>
                    ))}
                    <div className='flex items-center justify-center pb-3 lg:pb-0'>
                      <button
                        disabled={addresses.length === 3}
                        onClick={() => {
                          setIsAddAddress(true);
                        }}
                        className='mx-auto mt-10 h-[50px] w-[90%] max-w-[395px] rounded-full bg-primary text-center font-clashmd text-base text-white disabled:cursor-not-allowed disabled:bg-[#F8BCBC] lg:w-full'
                      >
                        Add a New Address
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className='mt-10 rounded-[10px] bg-[#F4F4F4] px-3 py-5 lg:rounded-2xl lg:px-9'>
                <p className='mb-1 text-xs text-black lg:text-base'>
                  <span className='mr-2'>{userInfo?.firstname}</span>
                  <span>{userInfo?.lastname}</span>
                </p>
                <div className='flex items-center gap-10'>
                  <p
                    onClick={() => setIsAddAddress(true)}
                    className='cursor-pointer text-xs text-primary lg:text-base'
                  >
                    Add an address to continue
                  </p>
                  <p
                    onClick={() => setIsAddAddress(true)}
                    className='cursor-pointer text-xs text-black lg:text-base'
                  >
                    Add a phone number to continue
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className='rounded-[10px] border border-[#F4F4F4] px-[2%] py-4 lg:rounded-2xl lg:px-5'>
            <div className='flex items-center justify-between'>
              <div className='mt-4 flex w-fit items-center gap-3'>
                {firstStageCompleted ? (
                  <Image
                    alt='tick icon'
                    src='/images/tick.svg'
                    width={24}
                    height={24}
                    className='h-4 w-4 lg:h-6 lg:w-6'
                  />
                ) : (
                  <div className='flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FFE0E0] lg:h-6 lg:w-6'>
                    <p className='text-[10px] text-myGray lg:font-clashmd lg:text-sm'>
                      2
                    </p>
                  </div>
                )}
                <p className='font-clashmd text-xs text-myGray lg:text-base'>
                  Delivery Details
                </p>
              </div>
            </div>
            {!isChange && (
              <div className='mt-5 rounded-[10px] bg-[#F4F4F4] px-3 py-7 lg:rounded-2xl lg:px-9'>
                <div>
                  {firstStageCompleted ? (
                    <p className='font-clashmd text-xs text-myGray lg:font-clash lg:text-base'>
                      {selectedDeliveryMethod}
                    </p>
                  ) : (
                    <RadioGroup.Root
                      className='flex flex-col gap-5 font-clashmd text-xs text-myGray lg:flex-row lg:items-center lg:gap-60 lg:font-clash lg:text-base'
                      defaultValue={selectedDeliveryMethod}
                      aria-label='Delivery Method'
                      onValueChange={setSelectedDeliveryMethod}
                    >
                      <RadioItem
                        id='r1'
                        value='Door delivery'
                        labelKey='Door Delivery'
                      />
                      <RadioItem
                        id='r2'
                        value='Pickup delivery'
                        labelKey='Pickup Delivery'
                      />
                    </RadioGroup.Root>
                  )}

                  <div className='mt-5 lg:mt-8'>
                    {selectedDeliveryMethod === 'Door delivery' && (
                      <p className='pl-1 text-[10px] text-[#7C7C7C] lg:pl-0 lg:text-base'>
                        Delivery between {deliveryDates.start} and{' '}
                        {deliveryDates.end}
                      </p>
                    )}
                    {selectedDeliveryMethod === 'Pickup delivery' && (
                      <p className='text-[10px] text-[#7C7C7C] lg:text-base'>
                        Available for pickup between {deliveryDates.start} and{' '}
                        {deliveryDates.end}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}
            {firstStageCompleted && (
              <div className='mt-10 rounded-[10px] bg-[#F4F4F4] px-3 py-7 lg:rounded-2xl lg:px-9'>
                <p className='font-clashmd text-xs text-myGray lg:font-clash lg:text-base'>
                  Shipment({items.length})
                </p>
                <div className='mt-5 grid gap-5 lg:grid-cols-2'>
                  {items &&
                    items.map((item) => (
                      <div
                        key={item.id}
                        className='flex max-w-[388px] items-center gap-5'
                      >
                        <Image
                          alt='tick icon'
                          src={item?.images[0]}
                          width={56}
                          height={56}
                          className='h-10 w-10 rounded-[8px] lg:h-[56px] lg:w-[56px]'
                        />
                        <div className='text-xs text-myGray lg:text-base lg:leading-[19.68px]'>
                          {item.productTitle}
                        </div>
                      </div>
                    ))}
                </div>
                <Link
                  href='/cart'
                  className='mx-auto mt-10 flex w-fit items-center gap-2 font-clashmd text-sm text-myGray lg:text-base'
                >
                  Modify Cart <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
          <div className='rounded-[10px] border border-[#F4F4F4] px-[2%] py-4 lg:rounded-2xl lg:px-5'>
            <div className='flex items-center justify-between'>
              <div className='mt-4 flex w-fit items-center gap-3'>
                {firstStageCompleted ? (
                  <Image
                    alt='tick icon'
                    src='/images/tick.svg'
                    width={24}
                    height={24}
                    className='h-4 w-4 lg:h-6 lg:w-6'
                  />
                ) : (
                  <div className='flex h-[15px] w-[15px] items-center justify-center rounded-full bg-[#FFE0E0] lg:h-6 lg:w-6'>
                    <p className='text-[10px] text-myGray lg:font-clashmd lg:text-sm'>
                      3
                    </p>
                  </div>
                )}
                <p className='font-clashmd text-xs text-myGray lg:text-base'>
                  Select Payment Method
                </p>
              </div>
            </div>
            {!isChange && (
              <div className='mt-5 rounded-[10px] bg-[#F4F4F4] px-3 py-7 lg:rounded-2xl lg:px-9 lg:pb-5 lg:pt-10'>
                {firstStageCompleted ? (
                  <RadioGroup.Root
                    className='flex flex-col gap-5 font-clashmd text-xs text-myGray lg:flex-row lg:items-center lg:gap-60 lg:font-clash lg:text-base'
                    defaultValue={selectedPaymentMethod}
                    aria-label='Pay with wallet'
                    onValueChange={setSelectedPaymentMethod}
                  >
                    <RadioItem
                      id='r1'
                      value={selectedPaymentMethod}
                      labelKey={selectedPaymentMethod}
                    />
                  </RadioGroup.Root>
                ) : (
                  <RadioGroup.Root
                    className='flex flex-col gap-5 font-clashmd text-xs text-myGray lg:flex-row lg:items-center lg:gap-60 lg:font-clash lg:text-base'
                    defaultValue={selectedPaymentMethod}
                    aria-label='Pay with wallet'
                    onValueChange={setSelectedPaymentMethod}
                  >
                    <RadioItem id='r3' value='Online' labelKey='Online payment' />
                    <RadioItem
                      id='r4'
                      value='Wallet'
                      labelKey='Pay with wallet'
                    />
                  </RadioGroup.Root>
                )}

                <div className='mt-5 transition-all lg:mt-8'>
                  {selectedPaymentMethod === 'Online' && (
                    <p className='pl-1 text-[10px] text-[#7C7C7C] lg:pl-0 lg:text-base'>
                      Secure, fast, and efficient. Use your credit/debit card or
                      bank account to finalize your purchase instantly.
                    </p>
                  )}
                  {selectedPaymentMethod === 'Wallet' && (
                    <p className='pl-1 text-[10px] text-[#7C7C7C] lg:pl-0 lg:text-base'>
                      Convenient and swift! Use your digital wallet balance to
                      complete your purchase seamlessly.
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <OrderSummary
          deliveryMethod={selectedDeliveryMethod}
          firstStage={firstStageCompleted}
          isChange={isChange}
          setFirstStageCompleted={setFirstStageCompleted}
          address={selectedAddress}
          selectedPayment={selectedPaymentMethod}
        />
      </div>
    </ClientOnly>
  );
};

export default CheckoutForm;
