import { Metadata } from 'next';
import AccountDashboard from '@/app/components/account/AccountDashboard';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import PersonalInformationForm from '@/app/components/account/PersonalInformationForm';
import authUtils from '@/app/utils/authUtils';
import productService from '@/app/services/productService';
import { cookies, headers } from 'next/headers';
import { constants } from '@/app/utils/constants';

interface UserInfo {
  firstname: string;
  email: string;
  phone?: string;
}

export const metadata: Metadata = {
  title: 'Personal Information | Myhomeetal',
};

export default async function AccountPage() {
  const userCookie = cookies().get('USER_INFO')?.value;
  const authToken = cookies().get(constants.AUTH_TOKEN)?.value;

  if (!userCookie || !authToken) {
    console.log('User info or authorization token is missing');
    return {
      notFound: true,
    };
  }

  let userInfo = null;

  try {
    userInfo = JSON.parse(decodeURIComponent(userCookie));
  } catch (error) {
    console.error('Failed to parse user info from cookies:', error);
  }

  if (userInfo?.id) {
    try {
      const res = await productService.getUserDetails(userInfo.id);
      if (res.status === 200) {
        userInfo = res.data;
      } else {
        console.log('Failed to fetch user details:', res);
      }
    } catch (error) {
      console.log('Error fetching user details:', error);
    }
  } else {
    console.log('User info is undefined or missing ID');
  }

  const headersList = headers();
  const previousPath = headersList.get('referer') || '';

  return (
    <main className='px-[3%] lg:px-0'>
      <div className='sticky top-[83px] z-20 flex items-center bg-white py-5 pl-1 lg:hidden'>
        <Button
          href={previousPath}
          className='justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
          linkType='rel'
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
