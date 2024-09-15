import { useState } from 'react';
import Button from "../Button"
import { useSearchParams } from 'next/navigation';
import { rexPay } from '@/app/lib/Powerhouse';

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

const RexPay = ({ userInfo, phoneAmount }: PayWithSpayProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const order = decodeURIComponent(searchParams.get('order') || '');
  const orderCont = order.split('-');
  const orderId = orderCont[0];
  const points = Number(orderCont[1]);

  const initiatePayment = async () => {
    setIsLoading(true);

    try {
      const payload = {
        orderId: orderId,
        amount: phoneAmount?.totalAmount,
        email: userInfo?.email,
      }
      const res = await rexPay(payload);

      if (res && res.paymentUrl) {
        window.location.href = res.paymentUrl;
      } else {
        console.error('Payment URL not found in the response:', res);
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      disabled={isLoading}
      onClick={initiatePayment}
      className='h-[60px] bg-[#ffd4d4] disabled:text-black text-black w-full rounded-full border-0 font-clashmd text-base shadow-none'>
      {isLoading ? 'Processing...' : 'Make Payment(RexPay Gateway)'}
    </Button>
  )
}

export default RexPay
