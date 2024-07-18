'use client';

import { useCart } from 'react-use-cart';

import Button from '@components/Button';
import { ROUTES } from '@utils/routes';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import Input from '../Input';

interface Address {
  phone: string;
  address: string;
}

interface DeliveryMethodProps {
  deliveryMethod: string;
  firstStage: boolean;
  setFirstStageCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  address: Address;
  selectedPayment: string;
}

const OrderSummary: React.FC<DeliveryMethodProps> = ({
  deliveryMethod,
  firstStage,
  setFirstStageCompleted,
  address,
  selectedPayment,
}) => {
  const { cartTotal, totalItems } = useCart();
  const { region } = useRegion();

  const handleFirstStage = () => {
    if (address && deliveryMethod && selectedPayment) {
      setFirstStageCompleted(true);
    }
  };

  return (
    <div className='h-fit rounded-2xl bg-[#F4F4F4]'>
      <div className='relative m-4 h-fit'>
        <Input
          name='voucher'
          placeholder='Enter Voucher Code Here'
          inputClassName='min-w-full h-[60px] border border-primary rounded-[10px] placeholder:text-[#535353] placeholder:text-sm'
        />
        <button className='absolute right-3 top-[50%] translate-y-[-50%] text-xs text-black'>
          Apply
        </button>
      </div>
      <div className='px-4'>
        <div className='border-b border-[#DCDCDC] pb-3 pt-4 text-base text-myGray'>
          Order Summary
        </div>
        <div className='border-b border-[#DCDCDC] py-3 text-sm'>
          <div className='mb-3 flex items-center justify-between text-base text-myGray'>
            <span>Order total ({totalItems})</span>
            <ProductPrice priceInNGN={cartTotal} region={region} />
          </div>
          <div className='flex items-center justify-between text-base text-myGray'>
            <span>Delivery fee</span>
            <ProductPrice priceInNGN={60} region={region} />
          </div>
        </div>
        <div className='flex justify-between pb-4 pt-3 text-myGray'>
          <span className='text-base'>Total</span>
          <div className='text-right'>
            <ProductPrice
              priceInNGN={cartTotal + 60}
              className='font-clashmd text-[25px] text-myGray'
              region={region}
            />
          </div>
        </div>
      </div>

      <div className='flex justify-between border-t border-[#DCDCDC] py-3 font-medium text-myGray'>
        <span className='pl-4'>Payment method:</span>
        <span className='pr-4'>{deliveryMethod}</span>
      </div>
      <div className='px-4 pb-5'>
        {firstStage ? (
          <Button
            linkType='rel'
            href={ROUTES.ORDER_CONFIRMED}
            className='mt-8 w-full rounded-full border-0 p-4 font-clashmd text-base shadow-none'
          >
            <span>
              Checkout (<ProductPrice priceInNGN={cartTotal} region={region} />)
            </span>
          </Button>
        ) : (
          <button
            onClick={handleFirstStage}
            className='mt-8 w-full rounded-full border-0 bg-primary p-4 font-clashmd text-base text-white shadow-none'
          >
            {' '}
            Continue
          </button>
        )}
      </div>
    </div>
  );
};

export default OrderSummary;
