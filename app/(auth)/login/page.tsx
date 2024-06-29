import { Metadata } from 'next';

import LoginForm from '@components/forms/LoginForm';

export const metadata: Metadata = {
  title: 'Login | Myhomeetal',
};

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center'>
      <LoginForm />
    </div>
  );
}
