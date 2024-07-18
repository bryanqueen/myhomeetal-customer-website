'use client';

import { useCart } from 'react-use-cart';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import { ArrowRight } from 'iconsax-react';

import OrderSummary from './OrderSummary';
import Input from '@components/Input';
import RadioItem from '@components/RadioItem';
import Button from '@components/Button';
import ClientOnly from '@components/ClientOnly';
import Link from 'next/link';

interface Address {
  phone: string;
  address: string;
}

const myAddressBook: Address[] = [
  {
    phone: '+234 8024312345',
    address: '18, Karimu street, Surulere',
  },
  {
    phone: '+234 8024312345',
    address: '22, Fagbenro Square',
  },
  {
    phone: '+234 8024312345',
    address: '107, Femi Ayantuga, Surulere',
  },
];

const CheckoutForm: React.FC = () => {
  const { items, totalItems, isEmpty } = useCart();

  const [address, setAddress] = useState<Address>(myAddressBook[0]);
  const [isChange, setIsChange] = useState(false);
  const [firstStageCompleted, setFirstStageCompleted] = useState(false);
  const [selectedMethod, setSelectedMethod] = useState('Door Delivery');
  const [selectedPaymentMethod, setSelectedPaymentMethod] =
    useState('Pay with wallet');
  const [deliveryDates, setDeliveryDates] = useState({ start: '', end: '' });

  useEffect(() => {
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

    calculateDeliveryDates();
  }, []);

  return (
    <ClientOnly>
      <div className='grid gap-5 lg:grid-cols-[2fr_1fr]'>
        <div className='grid gap-5'>
          <div className='rounded-[10px] border border-[#F4F4F4] px-[2%] py-4 lg:rounded-2xl lg:px-5'>
            <div className='flex items-center justify-between'>
              <div className='mt-4 flex w-fit items-center gap-3 lg:mt-0'>
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
                {myAddressBook.length > 0 && !isChange && (
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
                    className='font-clashmd text-base text-primary'
                  >
                    Continue Checkout
                  </button>
                )}
              </div>
            </div>
            {myAddressBook.length > 0 ? (
              <div className='mt-10 rounded-[10px] bg-[#F4F4F4] px-3 py-5 lg:rounded-2xl lg:px-9'>
                <p className='mb-2 text-xs text-black lg:mb-1 lg:text-base'>
                  Oyefeso Afolabi
                </p>
                <div className='flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-10'>
                  <p className='text-xs text-black lg:text-base'>
                    {address.address}
                  </p>
                  <p className='text-xs text-black lg:text-base'>
                    {address.phone}
                  </p>
                </div>
              </div>
            ) : (
              <div className='mt-10 rounded-[10px] bg-[#F4F4F4] px-3 py-5 lg:rounded-2xl lg:px-9'>
                <p className='mb-1 text-xs text-black lg:text-base'>
                  Oyefeso Afolabi
                </p>
                <div className='flex items-center gap-10'>
                  <p className='text-xs text-primary lg:text-base'>
                    Add an address to continue
                  </p>
                  <p className='text-xs text-black lg:text-base'>
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
            <div className='mt-5 rounded-[10px] bg-[#F4F4F4] px-3 py-7 lg:rounded-2xl lg:px-9'>
              {firstStageCompleted ? (
                <p className='font-clashmd text-xs text-myGray lg:font-clash lg:text-base'>
                  {selectedMethod}
                </p>
              ) : (
                <RadioGroup.Root
                  className='flex flex-col gap-5 font-clashmd text-xs text-myGray lg:flex-row lg:items-center lg:gap-60 lg:font-clash lg:text-base'
                  defaultValue={selectedMethod}
                  aria-label='Delivery Method'
                  onValueChange={setSelectedMethod}
                >
                  <RadioItem
                    id='r1'
                    value='Door Delivery'
                    labelKey='Door Delivery'
                  />
                  <RadioItem
                    id='r2'
                    value='Pickup Delivery'
                    labelKey='Pickup Delivery'
                  />
                </RadioGroup.Root>
              )}

              <div className='mt-5 lg:mt-8'>
                {selectedMethod === 'Door Delivery' && (
                  <p className='pl-1 text-[10px] text-[#7C7C7C] lg:pl-0 lg:text-base'>
                    Delivery between {deliveryDates.start} and{' '}
                    {deliveryDates.end}
                  </p>
                )}
                {selectedMethod === 'Pickup Delivery' && (
                  <p className='text-[10px] text-[#7C7C7C] lg:text-base'>
                    Available for pickup between {deliveryDates.start} and{' '}
                    {deliveryDates.end}
                  </p>
                )}
              </div>
            </div>
            {firstStageCompleted && (
              <div className='mt-10 rounded-[10px] bg-[#F4F4F4] px-3 py-7 lg:rounded-2xl lg:px-9'>
                <p className='font-clashmd text-xs text-myGray lg:font-clash lg:text-base'>
                  Shipment({totalItems})
                </p>
                <div className='mt-5 grid lg:grid-cols-2 gap-5'>
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
                          className='w-10 h-10 lg:h-[56px] lg:w-[56px] rounded-[8px]'
                        />
                        <div className='text-xs lg:text-base lg:leading-[19.68px] text-myGray'>
                          {item.productTitle}
                        </div>
                      </div>
                    ))}
                </div>
                <Link
                  href='/cart'
                  className='mx-auto mt-10 flex w-fit items-center gap-2 font-clashmd text-sm lg:text-base text-myGray'
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
                  <RadioItem
                    id='r1'
                    value='Online payment'
                    labelKey='Online payment'
                  />
                  <RadioItem
                    id='r2'
                    value='Pay with wallet'
                    labelKey='Pay with wallet'
                  />
                </RadioGroup.Root>
              )}

              <div className='mt-5 lg:mt-8'>
                {selectedPaymentMethod === 'Online payment' && (
                  <p className='pl-1 text-[10px] text-[#7C7C7C] lg:pl-0 lg:text-base'>
                    Secure, fast, and efficient. Use your credit/debit card or
                    bank account to finalize your purchase instantly.
                  </p>
                )}
                {selectedPaymentMethod === 'Pay with wallet' && (
                  <p className='pl-1 text-[10px] text-[#7C7C7C] lg:pl-0 lg:text-base'>
                    Convenient and swift! Use your digital wallet balance to
                    complete your purchase seamlessly.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <OrderSummary
          deliveryMethod={selectedMethod}
          firstStage={firstStageCompleted}
          setFirstStageCompleted={setFirstStageCompleted}
          address={address}
          selectedPayment={selectedPaymentMethod}
        />
      </div>
    </ClientOnly>
  );
};

export default CheckoutForm;
