import { useState } from 'react';
import { useMutation } from 'react-query';
import { AxiosError } from 'axios';
import { deleteCookie } from 'cookies-next';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';

import { constants } from '@utils/constants';
import { ROUTES } from '@utils/routes';

async function logout() {
  return {
    ok: true,
    message: 'Logout Successful!',
  };
}

export const useLogout = () => {
  const [error, setError] = useState('');
  const router = useRouter();

  const logoutMutate = useMutation(logout, {
    onSuccess: async () => {
      deleteCookie(constants.AUTH_TOKEN);
      window.location.reload();
      router.push(ROUTES.HOME);
      toast.success('Logout Successful');
    },
    onError: (error: AxiosError<any>) => {
      console.log('Logout error response: ', error);
    },
  });

  const handleLogout = () => {
    setError('');
    logoutMutate.mutate();
  };

  return {
    handleLogout,
    loading: logoutMutate.isLoading,
    error,
  };
};
