import { Metadata } from 'next';

import SignupForm from '@components/forms/SignupForm';

export const metadata: Metadata = {
  title: 'Create an Account | Myhomeetal',
};

export default function RegisterPage() {
  return (
    <div className='flex items-center justify-center'>
      <SignupForm />
    </div>
  );
}
