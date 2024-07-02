import { useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { authService, LoginPayload } from '@services/authService';
import { apiUtils } from '@utils/apiUtils';
import { constants } from '@utils/constants';
import { ROUTES } from '@utils/routes';

export const useLogin = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const loginMutate = useMutation(authService.login, {
    onSuccess: async (res: AxiosResponse<any>) => {
      const { data } = res;
      setCookie(constants.AUTH_TOKEN, data.token);
      console.log(data);
      // setCookie(constants.USER_INFO, JSON.stringify(data.user));
      toast.success('Login successful');
      router.push(ROUTES.HOME);
    },
    onError: (error: AxiosError<any>) => {
      const { response } = error;
      setError(apiUtils.getAPIErrorMessage(response?.data.error));
    },
  });

  const handleLogin = (payload: LoginPayload) => {
    setError('');
    loginMutate.mutate(payload);
  };

  return {
    handleLogin,
    loading: loginMutate.isLoading,
    error,
  };
};
