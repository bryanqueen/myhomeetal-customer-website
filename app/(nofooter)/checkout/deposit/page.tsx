'use client';
import Button from '@/app/components/Button'
import Image from 'next/image'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import emailjs from "emailjs-com";
import toast from 'react-hot-toast';
import { useCart } from '@/app/CartProvider';

export default function DepositPage() {
  const [loading, setloading] = useState(false);
  const [phoneMyAmount, setPhoneMyAmount] = useState(null);
  const [myUser, setMyUser] = useState(null);
  const { cartState } = useCart();
  const router = useRouter();
  const accountNumber = '4010011734';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(accountNumber).then(
      () => {
        toast.success('Account Number copied');
      },
      (err) => {
        toast.error('Failed to copy the account. Please try again.');
      }
    );
  };

  useEffect(() => {
    // Retrieve orderItems from local storage
    const storedPhoneAmount = localStorage.getItem('phoneAmount');
    const storedUserInfo = localStorage.getItem('myUser');
    if (storedPhoneAmount) {
      setPhoneMyAmount(JSON.parse(storedPhoneAmount));
    }
    if (storedUserInfo) {
      setMyUser(JSON.parse(storedUserInfo));
    }
  }, []);

  // Sanitize and convert price to number
  const sanitizeAndConvertPrice = (price: any): number => {
    if (typeof price === 'string') {
      // Remove commas and parse to float
      const sanitizedPrice = price.replace(/,/g, '');
      const parsedPrice = parseFloat(sanitizedPrice);
      return isNaN(parsedPrice) ? 0 : parsedPrice;
    }
    return typeof price === 'number' ? price : 0;
  };

  const validItems = cartState.items?.map(item => ({
    ...item,
    product: {
      ...item.product,
      price: sanitizeAndConvertPrice(item?.product?.price) // Convert price here
    }
  }))
    .filter(item => item?.product && !isNaN(item?.product?.price) && item?.product?.price > 0) || [];

  const payload = {
    address: phoneMyAmount?.myAddress,
    amountSent: phoneMyAmount?.totalAmount,
    fname: myUser?.fname,
    lname: myUser?.lname,
    email: myUser?.email,
    orderItems: validItems.map(item => ({
      productName: item.product?.productTitle,
      quantity: item.qty,
      price: item?.product?.price
    })),
    orderId: phoneMyAmount?.myOrder,
    //paymentMethod: selectedPayment,
    phoneNumber: phoneMyAmount?.phone // Add customer phone number here
  };

  const sendEmail = (formData) => {
    setloading(true); // Start loading

    emailjs
      .send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formData,
        process.env.NEXT_PUBLIC_EMAILJS_USER_ID
      )
      .then((result) => {
        console.log("Email sent:", result.text);
        toast.success("Order submitted. You’ll receive an email confirmation shortly!");
        router.push('/checkout/deposit-verify');
      })
      .catch((error) => {
        console.error("Error sending email:", error);
        toast.error("Failed to send order. Please try again.");
      })
      .finally(() => {
        setloading(false); // Stop loading
      });
  };


  const handleSentFund = () => {
    const formData = {
      cityTo: payload.address,
      cityFrom: payload.phoneNumber,
      quantity: payload.fname,
      weight: payload.lname,
      length: payload.email,
      postalCodeTo: payload.amountSent.toFixed(2),
      height: payload.orderId,
      countryFrom2: payload.orderItems.map(item => `
        Product: ${item.productName}
        Quantity: ${item.quantity}
        Price: ${item.price}
      `).join('\n\n')
    };

    sendEmail(formData);
  };

  return (
    <main className='px-[3%] min-h-[100vh] lg:min-h-[70vh] flex items-center'>
      <div className='lg:max-w-[50%] mx-auto grid gap-7 lg:gap-10'>
        <p className='text-center font-clashmd text-base'>
          Direct Deposit
        </p>
        <p className='max-w-[80%] lg:max-w-[482px] mx-auto text-center text-xs lg:text-base'>
          Copy the account details below and proceed to make the payment using your preferred banking method.
        </p>
        <p className='font-clashmd text-base text-center capitalize text-myGray lg:text-[25px]'>
        ₦{Number(payload?.amountSent).toFixed(2)}
        </p>
        <div>
          <div className='flex items-center gap-4 justify-center'>
            <p className='font-clashmd text-base capitalize text-myGray lg:text-[25px]'>
              Polaris Bank
              <span className='mx-1'>|</span>{' '}
              <span className='text-primary' id='accountNumber'>
                4010011734
              </span>
            </p>
            <Image
              src='/images/clip.svg'
              width={24}
              height={33}
              alt='clipboard icon'
              className='cursor-pointer'
              onClick={copyToClipboard}
            />
          </div>
          <p className='mt-1 text-black font-clashmd text-center'>My Home Et al Limited</p>
        </div>


        <Button
          disabled={loading}
          onClick={() => handleSentFund()} // Simulate a success case for testing
          className='mb-2 mt-5 w-full gap-2 rounded-full lg:min-w-[586px] border-0 p-4 font-clashmd text-base shadow-none'
        >
          {loading ? (
            <svg
              className="h-5 w-5 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          ) : "I've Sent the Money"}
        </Button>
      </div>
    </main>
  )
}
