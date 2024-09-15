'use client';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import ClientOnly from '@/app/components/ClientOnly';
import ProductPrice from '@/app/components/product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import authUtils from '@/app/utils/authUtils';
import Link from 'next/link';

const PayWithSpay = dynamic(
  () => import('@/app/components/checkout/SpayPayment'),
  { ssr: false }
);

const PayWithRexpay = dynamic(
  () => import('@/app/components/checkout/RexPay'),
  { ssr: false }
);

interface UserInfo {
  firstname: string;
  lastname: string;
  email: string;
}

interface PhoneAmount {
  phone: string;
  totalAmount: number;
}

export default function OnlinePaymentPage() {
  const { region } = useRegion();
  const router = useRouter();

  const handleBack = () => {
    router.back();
  };

  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
  const [phoneAmount, setPhoneAmount] = useState<PhoneAmount | null>(null);

  useEffect(() => {
    const fetchedUserInfo = authUtils?.getUserInfo();
    if (fetchedUserInfo) {
      setUserInfo(fetchedUserInfo);

      const myUser = {
        fname: fetchedUserInfo?.firstname,
        lname: fetchedUserInfo?.lastname,
        email: fetchedUserInfo?.email,
      }
      localStorage.setItem('myUser', JSON.stringify(myUser));
    }

    const storedPhoneAmount = localStorage.getItem('phoneAmount');
    if (storedPhoneAmount) {
      const parsedPhoneAmount = JSON.parse(storedPhoneAmount);
      setPhoneAmount(parsedPhoneAmount);
    } else {
      console.error('No order items found in local storage.');
    }
  }, []);

  return (
    <main className='pb-20 pt-[100px] lg:pt-0'>
      <div className='hidden px-[3%] pt-[90px] lg:mt-0 lg:block lg:pt-0'>
        <button
          onClick={handleBack}
          className='hidden items-center text-sm text-myGray lg:flex'
        >
          <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
          Back
        </button>
      </div>
      <ClientOnly>
        <div className='flex h-[50vh] w-full items-center justify-center px-[3%] lg:px-0'>
          <div className='mx-auto mt-[200px] grid w-full max-w-[600px] gap-14'>
            <div>
              <h1 className='mx-auto mb-3 text-center font-clashmd text-xl text-black lg:text-[31px]'>
                Pay{' '}
                <ProductPrice
                  priceInNGN={phoneAmount?.totalAmount}
                  region={region}
                />{' '}
              </h1>
              <p className='mx-auto text-center text-xs text-[#525252] lg:max-w-[500px] lg:text-base lg:leading-[19.68px]'>
                All transactions are safe and secure. Your financial information
                is <br />
                encrypted and protected.
              </p>
            </div>
            <div className='flex justify-center flex-col items-center gap-3'>
              {userInfo && phoneAmount && (
                <PayWithSpay userInfo={userInfo} phoneAmount={phoneAmount} />
              )}
              <PayWithRexpay userInfo={userInfo} phoneAmount={phoneAmount} />
              <Link href='/checkout/deposit' className='text-black text-base w-fit font-clashmd text-center'>
                Use direct transfer
              </Link>
            </div>

          </div>
        </div>
      </ClientOnly>
    </main>
  );
}
