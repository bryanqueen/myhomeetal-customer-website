'use client';
import AccountDashboard from '@/app/components/account/AccountDashboard';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import PersonalInformationForm from '@/app/components/account/PersonalInformationForm';
import productService from '@/app/services/productService';
import { cookies, headers } from 'next/headers';
import { constants } from '@/app/utils/constants';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getCookie } from 'cookies-next';
import toast from 'react-hot-toast';

interface UserInfo {
  firstname: string;
  email: string;
  phone?: string;
}

export default function AccountPage() {
  const [userInfo, setUserInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchUserInfo = async () => {
      const userCookie = getCookie('USER_INFO');
      const authToken = getCookie(constants.AUTH_TOKEN);

      if (!userCookie || !authToken) {
        console.log('User info or authorization token is missing');
        setLoading(false);
        return;
      }

      let parsedUserInfo = null;

      try {
        parsedUserInfo = JSON.parse(decodeURIComponent(userCookie as string));
      } catch (error) {
        console.error('Failed to parse user info from cookies:', error);
        setLoading(false);
        return;
      }

      if (parsedUserInfo?.id) {
        try {
          const res = await productService.getUserDetails(parsedUserInfo.id);
          if (res.status === 200) {
            setUserInfo(res.data);
          } else {
            console.log('Failed to fetch user details:', res);
            toast.error('Failed to fetch user details');
          }
        } catch (error) {
          console.log('Error fetching user details:', error);
          toast.error('Error fetching user details');
        }
      } else {
        console.log('User info is undefined or missing ID');
      }

      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!userInfo) {
    return <div>User not found</div>;
  }

  return (
    <main className='px-[3%] lg:px-0'>
      <div className='sticky top-[83px] z-20 flex items-center justify-center bg-white py-5 pl-1 lg:hidden'>
        <Button
          onClick={router.back}
          className='absolute left-[2%] justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
          variant='ghost'
        >
          <ArrowLeftIcon
            width={17}
            className=' mr-[2px] mt-[-1px] lg:mr-1 lg:mt-[-3px]'
          />
          Back
        </Button>
        <p className='text-center font-clashmd text-xs text-myGray lg:hidden'>
          Personal Info
        </p>
      </div>
      <AccountDashboard userInfo={userInfo} />
      <PersonalInformationForm userInfo={userInfo} />
    </main>
  );
}
