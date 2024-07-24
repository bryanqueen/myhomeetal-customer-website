// components/PayWithSpay.js
'use client';
import authUtils from '@/app/utils/authUtils';
import Script from 'next/script';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

interface UserInfo {
  firstname: string;
  lastname: string;
  email: string;
}

interface PayWithSpayProps {
  cartTotal: number;
}

const PayWithSpay = ({ cartTotal }: PayWithSpayProps) => {
  const [userInfo, setUserInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    const fetchedUserInfo = authUtils.getUserInfo();
    setUserInfo(fetchedUserInfo);
    // Ensure the payWithSpay function is defined in the window object
    if (fetchedUserInfo) {
      window.payWithSpay = function () {
        var handler = {
          amount: cartTotal,
          currency: 'NGN',
          reference: 'myhomeetal234556739',
          merchantCode: 'MCH_la8whiqumgh489i',
          customer: {
            firstName: fetchedUserInfo.firstname,
            lastName: fetchedUserInfo.lastname,
            phone: '0813575SPAY',
            email: fetchedUserInfo.email,
          },
          callback: function (response) {
            if (response.status === 'SUCCESS') {
              toast.success('Payment successful');
            }
          },
          onClose: function () {
            console.log('do something before closing');
          },
        };

        window.SpayCheckout.init(handler);
      };
    }
  }, []);

  return (
    <>
      <Script
        src='https://testcheckout.spaybusiness.com/pay/static/js/spay_checkout.js'
        strategy='afterInteractive'
      />
      <link
        href='https://testcheckout.spaybusiness.com/pay/static/css/spay_checkout.css'
        rel='stylesheet'
      />
      <button
        className='rounded-xl bg-white px-10 py-4 font-clashmd text-base'
        id='payWithSpay'
        onClick={(e) => {
          e.stopPropagation();
          window.payWithSpay();
        }}
      >
        Pay With Spay
      </button>
    </>
  );
};

export default PayWithSpay;
