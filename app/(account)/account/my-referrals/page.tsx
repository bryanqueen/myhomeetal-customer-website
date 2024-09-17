'use client';
import ReferralDashBoard from '@/app/components/account/ReferralDashBoard';
import ReferralEarningDashboard from '@/app/components/account/ReferralEarningDashboard';
import ReferralTable from '@/app/components/account/ReferralTable';
import Button from '@/app/components/Button';
import { HomeSkeleton } from '@/app/components/loader';
import productService from '@/app/services/productService';
import { constants } from '@/app/utils/constants';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { getCookie } from 'cookies-next';
import { notFound, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface Referral {
  id: string;
  firstname: string;
  lastname: string;
  pointsContributed: number;
  status: string;
}

interface ReferralsInfo {
  referrals: Referral[];
  totalEarnings: number;
  totalReferrals: number;
}

interface UserInfo {
  id: string;
  points: number;
  referralCode: string;
  referrals: [];
}

export default function ReferralPage() {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [referralsInfo, setReferralsInfo] = useState<ReferralsInfo>({
    referrals: [],
    totalEarnings: 0,
    totalReferrals: 0,
  });
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
  
      let parsedUserInfo: UserInfo | null = null;
  
      try {
        parsedUserInfo = JSON.parse(decodeURIComponent(userCookie as string)) as UserInfo;
      } catch (error) {
        console.error('Failed to parse user info from cookies:', error);
        setLoading(false);
        return;
      }
  
      // Type guard to ensure parsedUserInfo has a valid 'id'
      if (parsedUserInfo && typeof parsedUserInfo.id === 'string') {
        try {
          const [userDetails, referrals] = await Promise.all([
            productService.getUserDetails(parsedUserInfo.id),
            productService.getUserReferrals(),
          ]);
  
          if (userDetails.status === 200) {
            setUserInfo(userDetails.data);
          } else {
            console.log('Failed to fetch user details:', userDetails);
            toast.error('Failed to fetch user details');
          }
  
          if (referrals.status === 200) {
            setReferralsInfo({
              referrals: referrals.data.data.referrals,
              totalEarnings: referrals.data.data.totalEarnings,
              totalReferrals: referrals.data.data.totalReferrals,
            });
          } else {
            console.log('Failed to fetch referrals:', referrals);
            toast.error('Failed to fetch referrals');
          }
        } catch (error) {
          console.log('Error fetching user details or referrals:', error);
          toast.error('Error fetching user details or referrals');
        }
      } else {
        console.log('User info is undefined or missing ID');
      }
  
      setLoading(false);
    };
  
    fetchUserInfo();
  }, []);  

  if (loading) {
    return <HomeSkeleton />;
  }

  if (!userInfo) {
    return notFound();
  }
  return (
    <main className='mx-[3%] lg:mx-0'>
      <div className='sticky top-[83px] z-20 flex items-center justify-center bg-white py-5 pl-1 lg:hidden'>
        <Button
          onClick={router.back}
          className='absolute left-[2%] justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
          variant='ghost'
        >
          <span className='flex items-center'>
            <ArrowLeftIcon
              width={17}
              className=' mr-[2px] mt-[-1px] lg:mr-1 lg:mt-[-3px]'
            />
            Back
          </span>

        </Button>
        <p className='text-center font-clashmd text-xs text-myGray lg:hidden'>
          My Referrals
        </p>
      </div>
      <section>
        <ReferralDashBoard userInfo={userInfo} />
      </section>
      <section>
        <ReferralEarningDashboard referralsInfo={referralsInfo} />
      </section>
      <section>
        <ReferralTable userInfo={userInfo} referralsInfo={referralsInfo} />
      </section>
    </main>
  );
}
