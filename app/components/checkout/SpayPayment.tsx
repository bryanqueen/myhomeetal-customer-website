import { useState, useEffect } from 'react';
import Script from 'next/script';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { useCart } from 'react-use-cart';
import { useAddressBook } from '@/app/addressBookProvider';
import productService from '@/app/services/productService';

interface UserInfo {
  firstname: string;
  lastname: string;
  email: string;
}

interface PhoneAmount {
  phone: string;
  totalAmount: number;
}

interface PayWithSpayProps {
  userInfo: UserInfo;
  phoneAmount: PhoneAmount;
}

const PayWithSpay = ({ userInfo, phoneAmount }: PayWithSpayProps) => {
  const router = useRouter();
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const searchParams = useSearchParams();
  const order = decodeURIComponent(searchParams.get('order') || '');
  const orderCont = order.split('-');
  const orderId = orderCont[0];
  const points = Number(orderCont[1]);
  const { setFirstStageCompleted } = useAddressBook();
  const { emptyCart } = useCart();

  const clear = () => {
    setFirstStageCompleted(false);
    emptyCart();
  };

  const updateOrder = async () => {
    const payload = {
      orderId: orderId,
      points: points,
    }
    const res = await productService.updateOrder(payload);
    if (res.status === 200) {
      console.log(res.data);
    }
  }

  useEffect(() => {
    if (scriptLoaded && userInfo) {
      window.payWithSpay = function () {
        const handler = {
          amount: phoneAmount.totalAmount.toFixed(2),
          currency: 'NGN',
          reference: `myhomeetal-${orderId}`,
          merchantCode: 'MCH_la8whiqumgh489i',
          customer: {
            firstName: userInfo?.firstname,
            lastName: userInfo?.lastname,
            phone: phoneAmount.phone,
            email: userInfo?.email,
          },
          callback: function (response) {
            if (response.status === 'FAILED') {
              toast.error('payment failed, please try again!');
              router.push('/checkout');
            } else if (response.status === 'SUCCESSFUL') {
              // Clear the cart storage from local storage
              clear();
              updateOrder();
              router.push(
                `/order-confirmed?id=${orderId}-${response.amount}`
              );
            }
          },
          onClose: function () {
            window.location.reload();
          },
        };

        try {
          window.SpayCheckout.init(handler);
        } catch (error) {
          console.error('Error initializing SpayCheckout:', error);
        }
      };
    }
  }, [scriptLoaded, userInfo, phoneAmount?.totalAmount]);




  //
  return (
    <>
      {/* Load the SpayCheckout script */}
      <Script
        src='https://testcheckout.spaybusiness.com/pay/static/js/spay_checkout.js'
        strategy='afterInteractive'
        onLoad={() => {
          setScriptLoaded(true);
        }}
        onError={(e) => {
          console.error('Error loading SpayCheckout script:', e);
        }}
      />

      {/* Load the SpayCheckout stylesheet */}
      <link
        href='https://testcheckout.spaybusiness.com/pay/static/css/spay_checkout.css'
        rel='stylesheet'
      />

      {/* Payment button */}
      <button
        className='h-[60px] bg-[#ffd4d4] text-black w-full rounded-full border-0 font-clashmd text-base shadow-none'
        id='payWithSpay'
        onClick={(e) => {
          e.stopPropagation();
          if (window.payWithSpay) {
            try {
              window.payWithSpay();
            } catch (error) {
              console.error('Error during payWithSpay execution:', error);
            }
          } else {
            console.error('payWithSpay function is not defined');
          }
        }}
        disabled={!userInfo}
      >
        Make Payment (Spay Gateway)
      </button>
    </>
  );
};

export default PayWithSpay;
