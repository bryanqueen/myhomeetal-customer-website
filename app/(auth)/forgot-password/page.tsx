import { Metadata } from 'next';

import LoginForm from '@components/forms/LoginForm';
import ForgotPasswordForm from '@components/forms/ForgotPasswordForm';

export const metadata: Metadata = {
  title: 'Forgot Password | Myhomeetal',
};

export default function LoginPage() {
  return (
    <div className='flex items-center justify-center'>
      <ForgotPasswordForm />
    </div>
  );
}
