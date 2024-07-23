'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowRight2 } from 'iconsax-react';
import Image from 'next/image';

import Button from '@components/Button';
import Input from '@components/Input';

const AddFundDialog = () => {
  const accountNumber = '9840582103';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber).then(
      () => {
        toast.success('Account Number copied');
      },
      (err) => {
        toast.error('Failed to copy the account. Please try again.');
      }
    );
  };

  const [isPayMethod, setIsPayMethod] = useState('');
  const [amount, setAmount] = useState('');
  const [error, setError] = useState('');
  const [isPayMethodToggle, setIsPayMethodToggle] = useState(false);
  const [isFundAccount, setIsFundAccount] = useState(false);
  const [isFundSuccess, setIsFundSuccess] = useState(null); // null indicates no success or failure yet

  const handleFundAccount = () => {
    if (amount && isPayMethod) {
      setIsFundAccount(true);
      setError(''); // Clear any previous errors
    } else {
      setError('All fields are required');
    }
  };

  const handleSentFund = () => {
    setIsFundSuccess(false);
  };

  return (
    <div>
      {!isFundAccount ? (
        <div className='flex lg:w-[80vw] max-w-xl flex-col gap-4 w-full py-5 px-2'>
          <div className='pb-5'>
            <p className='text-center font-clashmd text-base'>Fund Account</p>
          </div>
          {error && <p className='text-center text-sm text-primary'>{error}</p>}
          <div className='grid gap-4'>
            <div>
              <div className='relative'>
                <Input
                  name='amount'
                  labelKey='Enter Amount'
                  placeholder='₦150,000.00'
                  onChange={(e) => setAmount(e.target.value)}
                  variant='outline'
                  inputClassName='py-5 border-[#D9D9D9] text-sm rounded-[10px] placeholder:text-xs placeholder:text-black'
                  labelClassName='text-myGray text-xs font-clashmd pl-4'
                />
                <p className='absolute right-5 top-14 text-[10px]'>Plus Vat</p>
              </div>
              <p className='pl-4 pt-1 text-[10px] text-myGray'>
                0.6 % Fee on all transaction:{' '}
                <span className='text-[#F68182]'>150,000</span> &times; 0.006 =
                900
              </p>
            </div>
            <div className='mt-5'>
              <label className='pl-4 font-clashmd text-xs text-myGray'>
                Select Payment Method
              </label>
              <div className='mt-1 w-full rounded-[10px] border border-[#D9D9D9] px-5 py-5'>
                <button
                  onClick={() => setIsPayMethodToggle(!isPayMethodToggle)}
                  className='flex w-full items-center justify-between text-xs text-black'
                >
                  Payment Method{' '}
                  <span>
                    <ArrowRight2 variant='Bold' size={10} />
                  </span>
                </button>
                {isPayMethodToggle && (
                  <div className='mt-4 grid gap-2 transition-all'>
                    <div
                      onClick={() => setIsPayMethod('virtual')}
                      className={`flex h-[50px] cursor-pointer items-center rounded-xl pl-4 text-xs transition-colors ${isPayMethod === 'virtual' ? 'bg-[#FFC9CA]' : 'bg-white'} border-[0.5px] border-[#F4F4F4] text-myGray`}
                    >
                      Fund wallet (Virtual Account)
                    </div>
                    <div
                      onClick={() => setIsPayMethod('online')}
                      className={`flex h-[50px] cursor-pointer items-center rounded-xl pl-4 text-xs transition-colors ${isPayMethod === 'online' ? 'bg-[#FFC9CA]' : 'bg-white'} border-[0.5px] border-[#F4F4F4] text-myGray`}
                    >
                      Fund wallet (Online Transfer)
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button
              onClick={handleFundAccount}
              className='mb-2 mt-5 w-full gap-2 rounded-lg border-0 p-4 font-clashmd text-base shadow-none'
            >
              Fund Account
            </Button>
          </div>
        </div>
      ) : isPayMethod === 'online' ? (
        <div className='lg:min-h-[70vh] lg:min-w-[742px]'>
          <p className='text-center font-clashmd text-base'>
            Fund wallet (Online Transfer)
          </p>
          <div className='flex min-h-[300px] items-center justify-center font-clashmd text-[25px]'>
            Paystack Paywall
          </div>
        </div>
      ) : (
        <div className='flex lg:min-w-[552px] flex-col items-center justify-center gap-7'>
          {isFundSuccess === null && (
            <>
              <p className='text-center font-clashmd text-base'>
                Fund wallet (Virtual Account)
              </p>
              <p className='max-w-[482px] text-xs lg:text-base text-center'>
                Copy the account details below and proceed to make the payment
                using your preferred banking method.
              </p>
              <div className='flex items-center gap-4'>
                <p className='font-clashmd text-base lg:text-[25px] text-myGray'>
                  Paystack titan <span className='mx-1'>|</span>{' '}
                  <span className='text-primary' id='accountNumber'>
                    {accountNumber}
                  </span>
                </p>
                <Image
                  src='/images/clip.svg'
                  width={24.5}
                  height={32.67}
                  alt='clipboard icon'
                  className='cursor-pointer'
                  onClick={copyToClipboard}
                />
              </div>
              <Button
                onClick={() => handleSentFund()} // Simulate a success case for testing
                className='mb-2 mt-5 w-full gap-2 rounded-lg border-0 p-4 font-clashmd text-base shadow-none'
              >
                I&#39;ve Sent the Money
              </Button>
            </>
          )}
          {isFundSuccess && (
            <div className='flex lg:min-w-[552px] flex-col items-center justify-center gap-9 pb-10'>
              <p className='text-center font-clashmd text-base'>
                Fund wallet (Virtual Account)
              </p>

              <div className='flex max-w-[458px] flex-col items-center justify-center gap-5'>
                <Image
                  src='/images/success.svg'
                  width={75}
                  height={75}
                  alt='success icon'
                />
                <p className='font-clashmd text-base lg:text-[25px] text-myGray'>
                  Payment Made Successfully!
                </p>
                <p className='text-center text-xs lg:text-base'>
                  Your funds have been added to your virtual wallet using your
                  virtual account number. Thank you for your payment!
                </p>
              </div>
            </div>
          )}
          {isFundSuccess === false && (
            <div className='flex lg:min-w-[552px] flex-col items-center justify-center gap-9 pb-10'>
              <p className='text-center font-clashmd text-base'>
                Fund wallet (Virtual Account)
              </p>

              <div className='flex max-w-[458px] flex-col items-center justify-center gap-5'>
                <Image
                  src='/images/failure.svg'
                  width={75}
                  height={75}
                  alt='success icon'
                />
                <p className='font-clashmd text-base lg:text-[25px] text-myGray'>
                  Unsuccessful Payment
                </p>
                <p className='text-center text-xs lg:text-base'>
                  Unfortunately, your payment could not be processed. Please try
                  again or{' '}
                  <span className='text-primary'> contact support</span> for
                  assistance.
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default AddFundDialog;
