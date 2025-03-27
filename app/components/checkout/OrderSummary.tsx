'use client';

import Button from '@components/Button';
import ProductPrice from '../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import productService from '@/app/services/productService';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { Ticket } from 'iconsax-react';
import { locations } from '@/app/utils/constants';
import Image from 'next/image';
import Link from 'next/link';
import { CartSummarySkeleton } from '../loader';
import { useCart } from '@/app/CartProvider';
import { Wallet } from '@/types';
//import { useCartActions } from '@/app/utils/helpers';

interface Address {
  _id: string;
  deliveryAddress: string;
  phone_number: string;
  city: string;
}

interface DeliveryMethodProps {
  deliveryMethod: string;
  firstStage: boolean;
  isChange: boolean;
  setFirstStageCompleted: React.Dispatch<React.SetStateAction<boolean>>;
  address: Address;
  selectedPayment: string;
  point: number;
  wallet: Wallet;
  hasWallet: boolean;
}

const OrderSummary: React.FC<DeliveryMethodProps> = ({
  deliveryMethod,
  firstStage,
  isChange,
  setFirstStageCompleted,
  address,
  selectedPayment,
  point,
  wallet,
  hasWallet,
}) => {
  const { cartState } = useCart();

  // Sanitize and convert price to number
  const sanitizeAndConvertPrice = (price: string | number | undefined): number => {
    if (typeof price === 'string') {
      const sanitizedPrice = price.replace(/,/g, '');
      const parsedPrice = parseFloat(sanitizedPrice);
      return !isNaN(parsedPrice) ? parsedPrice : 0;
    }
    return typeof price === 'number' && !isNaN(price) ? price : 0;
  };

  const validItems = cartState.items?.map(item => ({
    ...item,
    product: {
      ...item.product,
      price: sanitizeAndConvertPrice(item?.product?.price) // Convert price here
    }
  })).filter(item => {
    // Ensure that the sanitized price is valid
    return item?.product && !isNaN(item?.product?.price) && item?.product?.price > 0;
  }) || [];

  const total = cartState.items.reduce((total, item) => {
    if (item?.product) {
      const price = sanitizeAndConvertPrice(item.product.price);
      return total + price * item.qty;
    }
    return total;
  }, 0);

  const totalItems = validItems.reduce((total, item) => {
    return total + item.qty;
  }, 0);

  //const VAT = total * 0.025; // Calculate 2.5% VAT
  const router = useRouter();
  const { region } = useRegion();
  const [loading, setLoading] = useState(false);
  const [useMyPoints, setUseMyPoints] = useState(false);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderId, setorderId] = useState('');
  const [totalAmount, setTotalAmount] = useState(total + deliveryFee);
  const [walletNotFound, setWalletNotFound] = useState(false);
  const [insufficient, setInsufficient] = useState(false);
  const [pointsUsed, setPointsUsed] = useState(0); // Track points used


  const calculateDeliveryFee = async () => {
    //setLoading(true);
    try {
      const response = await fetch('https://api.clicknship.com.ng/clicknship/Operations/DeliveryFee', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer YOUR_ACCESS_TOKEN`, // Replace with your actual token
        },
        body: JSON.stringify({
          Origin: 'IBADAN',
          Destination: 'ABUJA',
          Weight: '1.5',
          PickupType: '1', // or '2' for DropOff
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to fetch delivery fee');
      }

      const data = await response.json();
      setDeliveryFee(data.TotalAmount);
    } catch (error) {
      console.error('Error fetching delivery fee:', error);
      toast.error('Sorry, an error occurred while calculating the delivery fee. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  const clear = () => {
    setFirstStageCompleted(false);
  };

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
      // Calculate how many points can actually be used
      const pointsToUse = Math.min(point, total + deliveryFee);

      // Apply points
      setTotalAmount((prevTotal) => Math.max(prevTotal - pointsToUse, 0));
      setPointsUsed(pointsToUse); // Track points used
    } else {
      // Remove points
      setTotalAmount((prevTotal) => prevTotal + pointsUsed); // Add back the actual points used
      setPointsUsed(0); // Reset points used
    }
  };


  const handleCheckout = async () => {
    setLoading(true);

    try {
      const orderItems = validItems.map((item) => ({
        product: item.product._id,
        qty: item.qty,
        price: item?.product?.price,
        images: item.product.images,
        name: item.product.productTitle,
        brand: item.product.brand,
      }));
      const payload = {
        address: address._id,
        orderPrice: total, // Use itemsAmount directly for orderPrice
        orderItems: orderItems, // Use the transformed items for orderItems
        deliveryMethod: deliveryMethod,
        paymentMethod: selectedPayment,
      };
      const res = await productService.createOrder(payload);
      if (res.status === 200) {
        const orderId = res.data?.newOrder?.orderId;
        setorderId(res.data?.newOrder?.orderId);
        // Store orderItems to local storage
        localStorage.setItem('orderItems', JSON.stringify(orderItems));

        // Store phone number and total amount to local storage
        const phoneAmount = {
          phone: address.phone_number,
          totalAmount: totalAmount,
          myAddress: address.deliveryAddress,
          myOrder: orderId,
        };
        localStorage.setItem('phoneAmount', JSON.stringify(phoneAmount));

        if (selectedPayment === 'Online') {
          router.push(`/checkout/online-payment?order=${orderId}-${useMyPoints ? pointsUsed : 0}`);
        } else {
          if (hasWallet) {
            if (wallet.balance.balance >= totalAmount) {
              try {
                const payload = {
                  orderId: orderId,
                  narration: 'Purchase',
                  amount: totalAmount,
                  from_account_number: wallet.account_no,
                  points: useMyPoints === true ? pointsUsed : 0,
                };

                const res = await productService.payWithWallet(payload);
                if (res.status === 200) {
                  router.push(
                    `/order-confirmed?id=${orderId}-${totalAmount}-${selectedPayment}`
                  );
                  clear();
                }
              } catch (error) {
                console.log(error);
                toast.error('Sorry an error occured. Please try again!');
              }
            } else {
              setInsufficient(true);
            }
          } else {
            setWalletNotFound(true);
          }
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Sorry an error occured. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const newTotal = useMyPoints
      ? Math.max(total + deliveryFee - point, 0)
      : total + deliveryFee;
    setTotalAmount(newTotal);
  }, [total, deliveryFee, useMyPoints, point]);


  useEffect(() => {
    setTotalAmount(total + deliveryFee);
  }, [total, deliveryFee]);


  useEffect(() => {
    if (deliveryMethod === 'Pickup delivery') {
      setDeliveryFee(0);
    } else if (address) {
      // Recalculate delivery fee if deliveryMethod is not 'pickup'
      const selectedLga = locations
        .flatMap((location) => location.lga) // Flatten all LGAs from all states
        .find((lga) => lga.name === address.city); // Find the LGA matching the city (address.city)

      const fee = selectedLga ? selectedLga.fee : 0; // If LGA is found, use the fee, otherwise default to 0
      setDeliveryFee(fee);
    }
  }, [deliveryMethod, address, locations]); // Ensure locations is also included in the dependency array


  return (
    <div>
      {walletNotFound && (
        <div
          onClick={() => setWalletNotFound(false)}
          className='fixed bottom-0 left-0 right-0 top-0 z-20 flex min-h-screen items-center justify-center bg-black/50 px-[3%] lg:px-0'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='flex min-w-full flex-col items-center justify-center gap-9 rounded-2xl bg-white py-5 pb-10 lg:min-w-[552px]'
          >
            <div className='flex max-w-[458px] flex-col items-center justify-center gap-5'>
              <Image
                src='/images/failure.svg'
                width={75}
                height={75}
                alt='success icon'
              />
              <p className='font-clashmd text-base text-myGray lg:text-[25px]'>
                No Wallet Found
              </p>
              <p className='text-center text-xs lg:text-base'>
                You do not have a wallet associated with your account.
              </p>
              <div className='grid min-w-full gap-3'>
                <Link
                  href='/account/my-wallet'
                  className='flex h-[56px] w-full items-center justify-center rounded-xl bg-primary font-clashmd text-base text-white'
                >
                  set up a wallet
                </Link>
                <Link
                  href={`/checkout/online-payment?order=${orderId}`}
                  className='flex h-[56px] items-center justify-center rounded-xl bg-[#FFF1F1] font-clashmd text-base'
                >
                  Proceed with Online Payment
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {insufficient === true && (
        <div
          onClick={() => setInsufficient(false)}
          className='fixed bottom-0 left-0 right-0 top-0 z-20 flex min-h-screen items-center justify-center bg-black/50 px-[3%] lg:px-0'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='flex min-w-full flex-col items-center justify-center gap-9 rounded-2xl bg-white py-5 pb-10 lg:min-w-[552px]'
          >
            <div className='flex max-w-[458px] flex-col items-center justify-center gap-5'>
              <Image
                src='/images/failure.svg'
                width={75}
                height={75}
                alt='success icon'
              />
              <p className='font-clashmd text-base text-myGray lg:text-[25px]'>
                Insufficient Balance
              </p>
              <p className='text-center text-xs lg:text-base'>
                Your wallet balance is insufficient to complete this
                transaction.
              </p>
              <div className='grid min-w-full gap-3'>
                <Link
                  href='/account/my-wallet'
                  className='flex h-[56px] w-full items-center justify-center rounded-xl bg-primary font-clashmd text-base text-white'
                >
                  Fund wallet
                </Link>
                <Link
                  href={`/checkout/online-payment?order=${orderId}`}
                  className='flex h-[56px] items-center justify-center rounded-xl bg-[#FFF1F1] font-clashmd text-base'
                >
                  Proceed with Online Payment
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
      {point === 0 || point > 0 ? (
        <div className='h-fit rounded-[13.11px] bg-[#F4F4F4] lg:rounded-2xl'>
          <div className='relative m-4 mt-10 h-fit lg:mt-4'>
            <div className='hidden'>
              <div className='flex items-center gap-4 py-5'>
                <Ticket color='#F68182' size={24} />
                <span className='font-clashmd text-xs text-[#2A2A2A] lg:text-[15px]'>
                  Use Promo code
                </span>
              </div>
            </div>

            <div className='flex items-center justify-between pt-5'>
              <p className='text-xs text-primary lg:text-base'>MyPoints</p>
              <div className='flex items-center gap-3'>
                <label
                  className='font-clashmd text-xs  lg:text-base'
                  htmlFor='useMyPoints'
                >
                  ₦{point} Available
                </label>
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
                  className='font-clashmd '
                  priceInNGN={total}
                  region={region}
                />
              </div>
              <div className='flex mb-3 items-center justify-between text-xs text-myGray lg:text-base'>
                <span>Delivery fee</span>
                <ProductPrice
                  priceInNGN={deliveryFee}
                  className='font-clashmd '
                  region={region}
                />
              </div>
              {/*<div className='flex items-center justify-between text-xs text-myGray lg:text-base'>
                <span>VAT</span>
                <ProductPrice
                  priceInNGN={VAT}
                  className='font-clashmd '
                  region={region}
                />
              </div> */}
              {useMyPoints && (
                <div className='flex items-center justify-between pt-3 text-xs text-myGray lg:text-base'>
                  <span>Mypoints</span>
                  <p className='font-clashmd text-[#E33536] '>-{point}</p>
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
      ) : (
        <div className='mt-10 lg:mt-0'>
          <CartSummarySkeleton />
        </div>
      )}
    </div>
  );
};

export default OrderSummary;
