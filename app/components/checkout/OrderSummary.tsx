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
import { locations } from '@/app/utils/constants';
import Image from 'next/image';
import Link from 'next/link';

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
  const [hasWallet, setHasWallet] = useState(false);
  const [wallet, setWallet] = useState(null);
  const [point, setPoint] = useState(null);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [orderId, setorderId] = useState('');
  const [totalAmount, setTotalAmount] = useState(cartTotal + deliveryFee);
  const [walletNotFound, setWalletNotFound] = useState(false);
  const [insufficient, setInsufficient] = useState(false);
  const { emptyCart } = useCart();

  const clear = () => {
    setFirstStageCompleted(false);
    emptyCart();
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
        setorderId(res.data?.newOrder?.orderId);
        // Store orderItems to local storage
        localStorage.setItem('orderItems', JSON.stringify(orderItems));

        // Store phone number and total amount to local storage
        const phoneAmount = {
          phone: address.phoneNumber,
          totalAmount: totalAmount,
        };
        localStorage.setItem('phoneAmount', JSON.stringify(phoneAmount));

        if (selectedPayment === 'Online') {
          router.push(`/checkout/online-payment?order=${orderId}`);
        } else {
          if (hasWallet) {
            if (wallet.balance >= totalAmount) {
              try {
                const payload = {
                  orderId: orderId,
                  narration: 'Purchase',
                  amount: totalAmount,
                  from_account_number: wallet.account_no,
                };

                const res = await productService.payWithWallet(payload);
                if (res.status === 200) {
                  clear();
                  router.push(
                    `/order-confirmed?id=${orderId}-${totalAmount}-${selectedPayment}`
                  );
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
    // Update total amount whenever cart total changes
    const newTotal = useMyPoints
      ? cartTotal + deliveryFee - point
      : cartTotal + deliveryFee;
    setTotalAmount(newTotal);
  }, [cartTotal, deliveryFee, useMyPoints, point]);

  useEffect(() => {
    if (deliveryMethod === 'Pickup delivery') {
      setDeliveryFee(0);
    } else if (address) {
      // Recalculate delivery fee if deliveryMethod is not 'pickup'
      const selectedLocation = locations.find(
        (location) => location.name === address.lga
      );
      const fee = selectedLocation ? selectedLocation.fee : 0;
      setDeliveryFee(fee);
    }
  }, [deliveryMethod, address]);

  useEffect(() => {
    const fetchWallet = async () => {
      try {
        const res = await productService.getWallet();
        if (res.status === 200 && res.data.account_no) {
          setHasWallet(true);
          setWallet(res.data);
        } else {
          setHasWallet(false);
          setWallet(null);
        }
      } catch (error) {
        console.error('Error fetching wallet:', error);
      }
    };

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
    fetchWallet();
    fetchReferral();
  }, []);

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
                  href='/wallet/my-wallet'
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
      {point && (
        <div className='h-fit rounded-[13.11px] bg-[#F4F4F4] lg:rounded-2xl'>
          <div className='relative m-4 mt-10 h-fit lg:mt-4'>
            <div className='flex items-center gap-4 py-5'>
              <Ticket color='#F68182' size={24} />
              <span className='font-clashmd text-xs text-[#2A2A2A] lg:text-[15px]'>
                Use Promo code
              </span>
            </div>
            <div className='flex items-center justify-between'>
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
                  priceInNGN={cartTotal}
                  region={region}
                />
              </div>
              <div className='flex items-center justify-between text-xs text-myGray lg:text-base'>
                <span>Delivery fee</span>
                <ProductPrice
                  priceInNGN={deliveryFee}
                  className='font-clashmd '
                  region={region}
                />
              </div>
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
      )}
    </div>
  );
};

export default OrderSummary;
