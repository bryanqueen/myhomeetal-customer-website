import { useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { authService, SignupPayload } from '@services/authService';
import { apiUtils } from '@/app/utils/apiUtils';
import { ROUTES } from '@utils/routes';

export const useSignup = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const signupMutate = useMutation(authService.signup, {
    onSuccess: async (res) => {
      console.log(res);
      router.push(ROUTES.LOGIN);
      toast.success('Created an account');
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
