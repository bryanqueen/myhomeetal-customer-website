import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { setCookie } from 'cookies-next';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { authService, LoginPayload } from '@services/authService';
import { apiUtils } from '@utils/apiUtils';
import { constants } from '@utils/constants';
import { ROUTES } from '@utils/routes';

export const useLogin = () => {
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);

  useEffect(() => {
    const callback = searchParams.get('callbackUrl');
    if (callback) {
      setCallbackUrl(callback);
    }
  }, [searchParams]);

  const loginMutate = useMutation(authService.login, {
    onSuccess: async (res: AxiosResponse<any>) => {
      const { data } = res;
      setCookie(constants.AUTH_TOKEN, data.token, { maxAge: 60 * 60 * 24 }); // 1 day
      setCookie(constants.USER_INFO, JSON.stringify(data.userProfile), { maxAge: 60 * 60 * 24 }); // 1 day
      toast.success('Login successful. Redirecting...');

      // Retrieve and use the callbackUrl to redirect after login
      router.push(callbackUrl || ROUTES.HOME);
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
