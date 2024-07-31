'use client';

import { useCart } from 'react-use-cart';
import Button from '@components/Button';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import productService from '@/app/services/productService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Ticket } from 'iconsax-react';
import * as RadioGroup from '@radix-ui/react-radio-group';
import RadioItem from '../RadioItem';
import { locations } from '@/app/utils/constants';

interface Address {
  id: number;
  email: string;
  phoneNumber: string;
  lga?: string;
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
  const { cartTotal, totalItems, items } = useCart();
  const router = useRouter();
  const { region } = useRegion();
  const [loading, setLoading] = useState(false);
  const [useMyPoints, setUseMyPoints] = useState(false);
  const [point, setPoint] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(null);
  const [totalAmount, setTotalAmount] = useState(cartTotal + deliveryFee);

  const handleFirstStage = async () => {
    if (address && deliveryMethod && selectedPayment) {
      setFirstStageCompleted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      toast.error('All fields required');
    }
  };

  const handleMyPointsChange = () => {
    setUseMyPoints((prev) => !prev);
    if (!useMyPoints) {
      setTotalAmount((prevTotal) => prevTotal - point);
    } else {
      setTotalAmount((prevTotal) => prevTotal + point);
    }
  };

  const handleCheckout = async () => {
    setLoading(true);

    try {
      const orderItems = items.map((item) => ({
        product: item.id,
        qty: item.quantity,
        price: item.price,
        images: item.images,
        name: item.productTitle,
        brand: item.brand,
      }));
      const payload = {
        address: address.email,
        orderPrice: cartTotal, // Use itemsAmount directly for orderPrice
        orderItems: orderItems, // Use the transformed items for orderItems
        deliveryMethod: deliveryMethod,
        paymentMethod: selectedPayment,
      };
      const res = await productService.createOrder(payload);
      if (res.status === 200) {
        const orderId = res.data?.newOrder?.orderId;

        // Store orderItems to local storage
        localStorage.setItem('orderItems', JSON.stringify(orderItems));

        // Store orderItems to local storage
        localStorage.setItem('phone', JSON.stringify(address.phoneNumber));

        if (selectedPayment === 'Online') {
          router.push(`/checkout/online-payment?order=${orderId}`);
        }
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // JWT expired or unauthorized, redirect to login page
        router.push('/login');
      } else {
        // Handle other errors
        console.error('Error in creating order:', error);
        toast.error(
          'An error occurred while processing your order. Please try again.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Update total amount whenever cart total changes
    const newTotal = useMyPoints
      ? cartTotal + deliveryFee - point
      : cartTotal + deliveryFee;
    setTotalAmount(newTotal);
  }, [cartTotal, deliveryFee, useMyPoints, point]);

  useEffect(() => {
    if (address) {
      // Find the selected location based on the address's LGA
      const selectedLocation = locations.find(
        (location) => location.name === address.lga
      );

      // Set the delivery fee based on the selected location's fee
      setDeliveryFee(selectedLocation ? selectedLocation.fee : 0);
      setTotalAmount(cartTotal + selectedLocation.fee);
    }
  }, [address, locations]);

  useEffect(() => {
    const fetchReferral = async () => {
      try {
        const res = await productService.getUserReferrals();
        if (res.status == 200) {
          setPoint(res.data.data.totalEarnings);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchReferral();
  }, []);

  return (
    <div>
      {point && (
        <div className='h-fit rounded-[13.11px] bg-[#F4F4F4] lg:rounded-2xl'>
          <div className='relative m-4 mt-10 h-fit lg:mt-4'>
            <div className='flex items-center gap-4 py-5'>
              <Ticket color='#F68182' size={24} />
              <span className='text-[15px] text-[#2A2A2A]'>Use Promo code</span>
            </div>
            <div className='flex items-center justify-between'>
              <p className='text-base text-primary'>MyPoints</p>
              <div className='flex items-center gap-3'>
                <label htmlFor='useMyPoints'>₦{point} Available</label>
                <input
                  type='checkbox'
                  id='useMyPoints'
                  checked={useMyPoints}
                  onChange={handleMyPointsChange}
                  aria-label='Use MyPoints'
                />
              </div>
            </div>
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
                  priceInNGN={deliveryFee}
                  className='font-clashmd lg:font-clash'
                  region={region}
                />
              </div>
              {useMyPoints && (
                <div className='flex pt-3 items-center justify-between text-xs text-myGray lg:text-base'>
                  <span>Mypoints</span>
                  <p className='font-clashmd lg:font-clash text-[#E33536]'>-{point}</p>
                </div>
              )}
            </div>
            <div className='flex justify-between pb-4 pt-3 text-myGray'>
              <span className='text-xs lg:text-base'>Total</span>
              <div className='text-right'>
                <ProductPrice
                  priceInNGN={totalAmount}
                  className='font-clashmd text-xs text-myGray lg:text-[25px]'
                  region={region}
                />
              </div>
            </div>
          </div>

          <div className='flex justify-between border-t border-[#DCDCDC] py-3 text-myGray'>
            <span className='pl-4 text-xs lg:text-base'>Payment method:</span>
            <span className='pr-4 text-[10px] lg:text-base'>
              {selectedPayment}
            </span>
          </div>
          <div className='px-4 pb-5'>
            {firstStage ? (
              <Button
                disabled={isChange === true || loading === true}
                loading={loading}
                onClick={handleCheckout}
                className='mt-8 w-full rounded-[10px] border-0 p-4 font-clashmd text-base shadow-none lg:rounded-full'
              >
                <span>
                  Checkout (
                  <ProductPrice priceInNGN={totalAmount} region={region} />)
                </span>
              </Button>
            ) : (
              <Button
                disabled={isChange === true}
                onClick={handleFirstStage}
                loading={loading}
                className='mt-4 w-full rounded-[10px] border-0 bg-primary p-3 font-clashmd text-base text-white shadow-none disabled:cursor-not-allowed disabled:opacity-50 lg:mt-8 lg:rounded-full lg:p-4'
              >
                {' '}
                Continue
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
