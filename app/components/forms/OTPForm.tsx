'use client';

import { useState } from 'react';
import OtpInput from 'react-otp-input';
import Button from '@components/Button';
import axios from 'axios';
import { useRouter, useSearchParams } from 'next/navigation';
import toast from 'react-hot-toast';

interface OTPFormProps {
  redirectTo: string; // Route to redirect after successful verification
}

const OTPForm: React.FC<OTPFormProps> = ({ redirectTo }) => {
  const router = useRouter();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [isloading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const email = decodeURIComponent(searchParams.get('email') || '');

  const resendOtp = async () => {
    setIsLoading(true);
    const data: any = { email: email };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}user/resend-otp`,
        data
      );

      if (res.status === 200) {
        setIsLoading(false);
        toast.success('Code resent!');
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    const data = { email: email, otp: otp };
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}user/verify-otp`,
        data
      );
      if (res.status === 200) {
        try {
          router.push(redirectTo);
          toast.success('Account verification successful');
        } catch (navError) {
          console.error('Navigation error:', navError);
          toast.error(
            'Failed to navigate to the login page. Please try again.'
          );
        }
      } else {
        toast.error('Verification failed. Please check the OTP and try again.');
      }
    } catch (error) {
      console.error('OTP verification error:', error);
      toast.error('An error occurred during verification. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {email && (
        <div className='w-full border-[#E4E7EC] bg-white lg:mx-5 lg:rounded-3xl lg:border lg:px-5 lg:py-8'>
          <h1 className='mb-1 text-center font-clashmd text-base lg:my-5 lg:font-clash lg:text-xl'>
            Enter verification code
          </h1>
          <p className='mx-auto max-w-[275.54px] text-center text-[10px] leading-[12.3px] lg:text-sm lg:leading-[16.93px]'>
            We have sent a verification code to {email} or <button className='text-primary underline'>switch to phone</button>
          </p>
          {/* {error && <p className='mb-2 text-center text-red-500'>{error}</p>} */}

          <form className='mt-20 grid gap-3' onSubmit={onSubmit}>
            <div className='mb-3 hidden lg:block'>
              <p className='text-center text-[10px]'>5-digit code</p>
            </div>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={5}
              renderInput={(props) => <input {...props} />}
              inputStyle='w-[60px] bg-[#F4F4F4] lg:bg-white h-[60px] lg:max-w-[71px] lg:h-[71px] rounded-[10px] mx-1 lg:mx-auto lg:border lg:border-[#E4E7EC] focus:bg-white focus:outline-[#FF0003] text-black flex-1'
              containerStyle='justify-center lg:mb-16 lg:px-10'
            />
            <div className='mt-3 lg:hidden'>
              <p className='text-center text-[10px]'>5-digit code</p>
            </div>
            <Button
              className='mt-14 h-[50px] w-full rounded-[10px] border-0 font-clashmd text-xs shadow-none lg:mt-0 lg:h-[56px] lg:rounded-full lg:text-base'
              loading={loading}
              disabled={loading}
            >
              Verify One Time Password
            </Button>
          </form>
          <p className='mb-10 pt-5 text-center text-[10px] lg:text-sm'>
            <span className='text-[#656565]'>
              Didn&apos;t receive the code?
            </span>{' '}
            <button disabled={isloading} onClick={resendOtp} className='text-[#C70E10]'>{isloading ? "Requesting..." : "Request a new code"}</button>
          </p>
        </div>
      )}
    </>
  );
};

export default OTPForm;
