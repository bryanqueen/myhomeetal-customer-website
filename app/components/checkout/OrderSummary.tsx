'use client';

import { useCart } from 'react-use-cart';

import Button from '@components/Button';
import { ROUTES } from '@utils/routes';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import Input from '../Input';

interface Address {
  id: number;
  email: string;
  phoneNumber: string;
}

interface DeliveryMethodProps {
  deliveryMethod: string;
  firstStage: boolean;
  isChange: boolean;
  setFirstStageCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  address: Address;
  selectedPayment: string;
}

const OrderSummary: React.FC<DeliveryMethodProps> = ({
  deliveryMethod,
  firstStage,
  isChange,
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
    <div className='h-fit rounded-[13.11px] bg-[#F4F4F4] lg:rounded-2xl'>
      <div className='relative m-4 mt-10 h-fit lg:mt-4'>
        <Input
          name='voucher'
          placeholder='Enter Voucher Code Here'
          inputClassName='min-w-full h-[60px] border border-primary rounded-[10px] placeholder:text-[#535353] placeholder:text-xs lg:placeholder:text-sm'
        />
        <button className='absolute right-3 top-[50%] translate-y-[-50%] text-xs text-black'>
          Apply
        </button>
      </div>
      <div className='px-4'>
        <div className='border-b border-[#DCDCDC] pb-3 pt-2 text-xs text-myGray lg:pt-4 lg:text-base'>
          Order Summary
        </div>
        <div className='border-b border-[#DCDCDC] py-3 text-xs lg:text-sm'>
          <div className='mb-3 flex items-center justify-between text-xs text-myGray lg:text-base'>
            <span>Order total ({totalItems})</span>
            <ProductPrice
              className='font-clashmd lg:font-clash'
              priceInNGN={cartTotal}
              region={region}
            />
          </div>
          <div className='flex items-center justify-between text-xs text-myGray lg:text-base'>
            <span>Delivery fee</span>
            <ProductPrice
              priceInNGN={60}
              className='font-clashmd lg:font-clash'
              region={region}
            />
          </div>
        </div>
        <div className='flex justify-between pb-4 pt-3 text-myGray'>
          <span className='text-xs lg:text-base'>Total</span>
          <div className='text-right'>
            <ProductPrice
              priceInNGN={cartTotal + 60}
              className='font-clashmd text-xs text-myGray lg:text-[25px]'
              region={region}
            />
          </div>
        </div>
      </div>

      <div className='flex justify-between border-t border-[#DCDCDC] py-3 text-myGray'>
        <span className='pl-4 text-xs lg:text-base'>Payment method:</span>
        <span className='pr-4 text-[10px] lg:text-base'>{selectedPayment}</span>
      </div>
      <div className='px-4 pb-5'>
        {firstStage ? (
          <Button
            disabled={isChange === true}
            linkType='rel'
            href={ROUTES.ORDER_CONFIRMED}
            className='mt-8 w-full rounded-[10px] border-0 p-4 font-clashmd text-base shadow-none lg:rounded-full'
          >
            <span>
              Checkout (<ProductPrice priceInNGN={cartTotal} region={region} />)
            </span>
          </Button>
        ) : (
          <button
            disabled={isChange === true}
            onClick={handleFirstStage}
            className='mt-4 w-full rounded-[10px] disabled:opacity-50 cursor-not-allowed border-0 bg-primary p-3 font-clashmd text-base text-white shadow-none lg:mt-8 lg:rounded-full lg:p-4'
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
