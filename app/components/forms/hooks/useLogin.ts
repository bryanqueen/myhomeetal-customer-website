import { useState, useEffect } from 'react';
import { useMutation } from 'react-query';
import axios, { AxiosError, AxiosResponse } from 'axios';
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
      setCookie('AUTH_TOKEN', data.token, {
        maxAge: 60 * 60 * 24,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none',
        path: '/',
      });
      setCookie(constants.USER_INFO, JSON.stringify(data.userProfile), { maxAge: 60 * 60 * 24 }); // 1 day
      toast.success('Login successful. Redirecting...');

      // Retrieve and use the callbackUrl to redirect after login
      router.push(callbackUrl || ROUTES.HOME);
    },
    onError: (error: AxiosError<any>, variables) => {
      const { response } = error;
      const email = variables?.email;

      const resendOtp = async () => {
        const data: any = { email: email };
        try {
          const res = await axios.post(
            `${process.env.NEXT_PUBLIC_V1_BASE_API_URL as string}user/resend-otp`,
            data
          );

          if (res.status === 200) {
            toast.success('Code sent!');
          }
        } catch (error) {
          console.log(error);
        }
      };

      if (response?.data.error === "User email has not been verified") {
        router.push(`/verify-otp?email=${encodeURIComponent(email)}`);
        resendOtp();

      } else {
        setError(apiUtils.getAPIErrorMessage(response?.data.error));
      }
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
