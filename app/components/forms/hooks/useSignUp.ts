import { useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { authService, SignupPayload } from '@services/authService';
import { apiUtils } from '@/app/utils/apiUtils';

export const useSignup = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const signupMutate = useMutation(authService.signup, {
    onSuccess: async (res, variables) => {
      console.log(res);
      const email = variables.email;  // Accessing email from variables
      router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      toast.success('Account created successfully!');
    },
    onError: (error: AxiosError<any>, variables) => {  // Adding variables to onError callback
      const { response } = error;
      const email = variables?.email;  // Accessing email from variables in onError
  
      if (response?.status === 400) {
        // Handle 400 Bad Request error and use the email for redirection
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
      } else {
        setError(apiUtils.getAPIErrorMessage(response?.data.message || 'An error occurred'));
        toast.error('Something went wrong during signup.');
      }  
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
