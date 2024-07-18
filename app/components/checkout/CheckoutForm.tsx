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
          <div className='rounded-2xl border border-[#F4F4F4] px-5 py-4'>
            <div className='flex items-center justify-between'>
              <div className='flex w-fit items-center gap-3'>
                {firstStageCompleted ? (
                  <Image
                    alt='tick icon'
                    src='/images/tick.svg'
                    width={24}
                    height={24}
                  />
                ) : (
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE0E0]'>
                    <p className='font-clashmd text-sm text-myGray'>1</p>
                  </div>
                )}

                <p className=' font-clashmd text-base text-myGray'>
                  Customer Address
                </p>
              </div>
              <div>
                {myAddressBook.length > 0 && !isChange && (
                  <button
                    onClick={() => setIsChange(!isChange)}
                    className='font-clashmd text-base text-[#8B1A1A]'
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
              <div className='mt-10 rounded-2xl bg-[#F4F4F4] px-9 py-5'>
                <p className='mb-1 text-base text-black'>Oyefeso Afolabi</p>
                <div className='flex items-center gap-10'>
                  <p className='text-base text-black'>{address.address}</p>
                  <p className='text-base text-black'>{address.phone}</p>
                </div>
              </div>
            ) : (
              <div className='mt-10 rounded-2xl bg-[#F4F4F4] px-9 py-5'>
                <p className='mb-1 text-base text-black'>Oyefeso Afolabi</p>
                <div className='flex items-center gap-10'>
                  <p className='text-base text-primary'>
                    Add an address to continue
                  </p>
                  <p className='text-base text-black'>
                    Add a phone number to continue
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className='rounded-2xl border border-[#F4F4F4] px-5 py-4'>
            <div className='flex items-center justify-between'>
              <div className='flex w-fit items-center gap-3'>
                {firstStageCompleted ? (
                  <Image
                    alt='tick icon'
                    src='/images/tick.svg'
                    width={24}
                    height={24}
                  />
                ) : (
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE0E0]'>
                    <p className='font-clashmd text-sm text-myGray'>2</p>
                  </div>
                )}
                <p className=' font-clashmd text-base text-myGray'>
                  Delivery Details
                </p>
              </div>
            </div>
            <div className='mt-5 rounded-2xl bg-[#F4F4F4] px-9 py-7'>
              {firstStageCompleted ? (
                <p className='text-base text-myGray'>{selectedMethod}</p>
              ) : (
                <RadioGroup.Root
                  className='flex items-center gap-60 text-base text-myGray'
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

              <div className='mt-8'>
                {selectedMethod === 'Door Delivery' && (
                  <p className='text-[#7C7C7C]'>
                    Delivery between {deliveryDates.start} and{' '}
                    {deliveryDates.end}
                  </p>
                )}
                {selectedMethod === 'Pickup Delivery' && (
                  <p className='text-[#7C7C7C]'>
                    Available for pickup between {deliveryDates.start} and{' '}
                    {deliveryDates.end}
                  </p>
                )}
              </div>
            </div>
            {firstStageCompleted && (
              <div className='mt-10 rounded-2xl bg-[#F4F4F4] px-9 py-7'>
                <p className='text-base text-myGray'>Shipment({totalItems})</p>
                <div className='mt-5 grid grid-cols-2 gap-5'>
                  {items &&
                    items.map((item) => (
                      <div className='flex max-w-[388px] items-center gap-5'>
                        <Image
                          alt='tick icon'
                          src={item?.images[0]}
                          width={56}
                          height={56}
                          className='h-[56px] w-[56px] rounded-[8px] object-cover'
                        />
                        <div className='text-base leading-[19.68px] text-myGray'>
                          {item.productTitle}
                        </div>
                      </div>
                    ))}
                </div>
                <Link
                  href='/cart'
                  className='mx-auto mt-10 flex w-fit items-center gap-2 font-clashmd text-base text-myGray'
                >
                  Modify Cart <ArrowRight size={16} />
                </Link>
              </div>
            )}
          </div>
          <div className='rounded-2xl border border-[#F4F4F4] px-5 py-4'>
            <div className='flex items-center justify-between'>
              <div className='flex w-fit items-center gap-3'>
                {firstStageCompleted ? (
                  <Image
                    alt='tick icon'
                    src='/images/tick.svg'
                    width={24}
                    height={24}
                  />
                ) : (
                  <div className='flex h-6 w-6 items-center justify-center rounded-full bg-[#FFE0E0]'>
                    <p className='font-clashmd text-sm text-myGray'>3</p>
                  </div>
                )}
                <p className=' font-clashmd text-base text-myGray'>
                  Select Payment Method
                </p>
              </div>
            </div>
            <div className='mt-5 rounded-2xl bg-[#F4F4F4] px-9 pb-5 pt-10'>
              {firstStageCompleted ? (
                <RadioGroup.Root
                  className='flex items-center gap-60 text-base text-myGray'
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
                  className='flex items-center gap-60 text-base text-myGray'
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

              <div className='mt-8'>
                {selectedPaymentMethod === 'Online payment' && (
                  <p className='max-w-[408px] leading-[19.68px] text-[#7C7C7C]'>
                    Secure, fast, and efficient. Use your credit/debit card or
                    bank account to finalize your purchase instantly.
                  </p>
                )}
                {selectedPaymentMethod === 'Pay with wallet' && (
                  <p className='max-w-[408px] leading-[19.68px] text-[#7C7C7C]'>
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
