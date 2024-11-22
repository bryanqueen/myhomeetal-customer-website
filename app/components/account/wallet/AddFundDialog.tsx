'use client';

import { useState } from 'react';
import toast from 'react-hot-toast';
import { ArrowRight2 } from 'iconsax-react';
import Image from 'next/image';

import Button from '@components/Button';
import Input from '@components/Input';
import { WalletAccountProps } from '@/types';
import { formatNumberWithCommas } from '@/app/utils/helpers';

const AddFundDialog: React.FC<WalletAccountProps> = ({ wallet }) => {
  const accountNumber = wallet.account_no;

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
  const [vat, setVat] = useState(0);
  const [error, setError] = useState('');
  const [isPayMethodToggle, setIsPayMethodToggle] = useState(false);
  const [isFundAccount, setIsFundAccount] = useState(true);
  const [isFundSuccess, setIsFundSuccess] = useState(null); // null indicates no success or failure yet

  const handleFundAccount = () => {
    if (amount && isPayMethod) {
      setIsFundAccount(true);
    } else {
      toast.error('All fields are required');
    }
  };

  const handleAmountChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setAmount: (value: string) => void,
    setError: (value: string) => void,
    setVat: (value: number) => void
  ) => {
    const inputValue = e.target.value.replace(/,/g, ''); // Remove commas

    // Check if the input is empty
    if (inputValue === '') {
      setError(''); // Clear the error if the input is empty
      setAmount(''); // Clear the amount
      setVat(0); // Reset VAT to 0
      return; // Exit the function early
    }

    const isValidAmount = /^\d+(\.\d{0,2})?$/.test(inputValue); // Allow decimals with up to two decimal places

    if (!isValidAmount) {
      setError(
        'Invalid amount format. Please enter numbers only, optionally with a decimal point.'
      );
    } else {
      setError('');
      const formattedValue = formatNumberWithCommas(inputValue);
      setAmount(formattedValue);
      const calculatedVat = parseFloat(inputValue) * 0.006; // Use parseFloat for decimal calculations
      setVat(calculatedVat);
    }
  };

  const handleSentFund = () => {
    window.location.reload();
  };

  return (
    <div>
      {!isFundAccount ? (
        <div className='flex w-full flex-col gap-4 px-2 py-5 lg:w-[50vw]'>
          <div className='pb-5'>
            <p className='text-center font-clashmd text-base'>Fund Account</p>
          </div>
          <div className='grid gap-4'>
            <div>
              <div className='relative'>
                <Input
                  name='amount'
                  labelKey='Enter Amount'
                  placeholder='150,000.00'
                  onChange={(e) =>
                    handleAmountChange(e, setAmount, setError, setVat)
                  }
                  errorKey={error}
                  variant='outline'
                  inputClassName='py-5 border-[#D9D9D9] text-xs lg:text-sm rounded-[10px] placeholder:text-xs placeholder:text-black'
                  labelClassName='text-myGray text-xs font-clashmd pl-4'
                />
                <p className='absolute right-5 top-14 text-[10px]'>Plus Vat</p>
                <span className='absolute left-3 top-[48.5px] text-[14px] lg:top-[50px]'>
                  ₦
                </span>
              </div>
              <p className='pl-4 pt-2 text-[10px] text-myGray'>
                0.6 % Fee on all transaction:{' '}
                <span className='text-[#F68182]'>₦{amount}</span> &times; 0.006
                =<span className='text-[#F68182]'>₦{vat.toFixed(2)}</span>
              </p>
            </div>
            <div className='mt-5'>
              <label className='pl-4 font-clashmd text-xs text-myGray'>
                Select Payment Method
              </label>
              <div className='mt-1 w-full rounded-[10px] border border-[#D9D9D9] px-2 py-5 lg:px-5'>
                <button
                  onClick={() => setIsPayMethodToggle(!isPayMethodToggle)}
                  className='flex w-full items-center justify-between px-2 text-xs text-black'
                >
                  Payment Method{' '}
                  <span>
                    <ArrowRight2 variant='Bold' size={10} />
                  </span>
                </button>
                {isPayMethodToggle && (
                  <div className='mt-4 grid gap-2 transition-all'>
                    <div
                      onClick={() => {
                        setIsPayMethod('virtual');
                        setIsPayMethodToggle(false);
                      }}
                      className={`flex h-[50px] cursor-pointer items-center rounded-xl pl-4 text-xs transition-colors ${isPayMethod === 'virtual' ? 'bg-[#FFC9CA]' : 'bg-white'} border-[0.5px] border-[#F4F4F4] text-myGray`}
                    >
                      Fund wallet (Virtual Account)
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
        <div className='flex flex-col items-center justify-center gap-7 lg:min-w-[552px]'>
          {isFundSuccess === null && (
            <>
              <p className='text-center font-clashmd text-base'>
                Fund wallet (Virtual Account)
              </p>
              <p className='max-w-[482px] text-center text-xs lg:text-base'>
                Copy the account details below and proceed to make the payment
                using your preferred banking method.
              </p>
              <div>
                <div className='flex items-center gap-4'>
                  <p className='font-clashmd text-base capitalize text-myGray lg:text-[25px]'>
                    {wallet.bank_name?.toLowerCase()}{' '}
                    <span className='mx-1'>|</span>{' '}
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
                <p className='text-xs mt-1 text-myGray text-center'>0.6 % Fee on all transaction</p>
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
            <div className='flex flex-col items-center justify-center gap-9 pb-10 lg:min-w-[552px]'>
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
                <p className='font-clashmd text-base text-myGray lg:text-[25px]'>
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
            <div className='flex flex-col items-center justify-center gap-9 pb-10 lg:min-w-[552px]'>
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
                <p className='font-clashmd text-base text-myGray lg:text-[25px]'>
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
