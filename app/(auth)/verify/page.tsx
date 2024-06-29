import { Metadata } from 'next';

import OTPForm from '@/app/components/forms/OTPForm';

export const metadata: Metadata = {
  title: 'Verify OTP | Myhomeetal',
};

export default function VerifyPage() {
  return (
    <div className='flex items-center justify-center'>
      <OTPForm />
    </div>
  );
}
