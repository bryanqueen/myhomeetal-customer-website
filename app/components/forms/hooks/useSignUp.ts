import { useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router'; // Changed from 'next/navigation' to 'next/router'
import { toast } from 'react-hot-toast';

import { authService, SignupPayload } from '@services/authService';
import { apiUtils } from '@/app/utils/apiUtils';
import { ROUTES } from '@utils/routes';

export const useSignup = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const signupMutate = useMutation(authService.signup, {
    onSuccess: async (res, variables) => {
      const email = variables.email;
      try {
        // Explicitly assert the return type of router.push as Promise<boolean>
        await (router.push(
          `/verify-otp?email=${encodeURIComponent(email)}`
        ) as Promise<boolean>);
        toast.success('Created an account');
      } catch (e) {
        console.error('Navigation error:', e);
        toast.error('Failed to navigate to the next page. Please try again.');
      }
    },
    onError: (error: AxiosError<any>) => {
      const { response } = error;
      setError(apiUtils.getAPIErrorMessage(response?.data.message));
    },
  });

  const handleSignup = (payload: SignupPayload) => {
    signupMutate.mutate(payload);
  };

  return {
    handleSignup,
    loading: signupMutate.isLoading,
    error,
  };
};
