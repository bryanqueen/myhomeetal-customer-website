'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';
import { HomeSkeleton } from '../loader';
import StarRating from './starRating';
import Button from '../Button';
import toast from 'react-hot-toast';

export default function Reviews() {
  const [loading, setLoading] = useState(true);
  const [reviewLoading, setReviewLoading] = useState(false);
  const [isReview, setIsReview] = useState(false);
  const [isReviewSuccess, setIsReviewSuccess] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [productsWithStatus, setProductsWithStatus] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');


  const handleRateProductClick = (product) => {
    setSelectedProduct(product);
    setIsReview(true);
  };

  //list only completed orders here
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await productService.getAllOrders();

        if (!res || !res.data) {
          console.log('id not found');
          setLoading(false);
          return notFound();
        }

        if (res.status === 200) {
          const orders = res.data;
          // Reverse the order to show latest orders first
          const reversedOrders = orders.reverse();

          // Extract products with statuses of 'Pending' and 'Completed'
          const extractedProducts = reversedOrders.flatMap((order) =>
            order.orderItems
              .filter((item) =>
                order.status === 'Delivered'
              )
              .map((item) => ({
                productId: order.orderId,
                id: item.product?._id,
                qty: item.qty,
                productName: item?.product?.productTitle,
                productImage: item?.product?.images[0],
                price: item.price,
                orderStatus: order.status,
              }))
          );
          setProductsWithStatus(extractedProducts);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchOrders();
  }, []);

  const handleReviewSubmit = async (id: string) => {
    if (!comment) {
      toast.error('Please add a comment.');
    } else {
      setReviewLoading(true);
      try {
        const payload = {
          rating: rating,
          comment: comment
        }
        const res = await productService.createReview({ payload, id });

        if (!res || !res.data) {
          console.log('id not found');
          return notFound();
        }

        if (res.status === 200) {
          setIsReviewSuccess(true);
          setIsReview(false);
          setReviewLoading(false);
        }
      } catch (error) {
        console.log(error);
        setReviewLoading(false);
        toast.error('An error occured. Please try again');
      }
    }


  };

  if (loading) {
    return <HomeSkeleton />;
  }
  return (
    <div>
      {isReviewSuccess && (
        <div
          onClick={() => setIsReviewSuccess(false)}
          className='fixed bottom-0 left-0 right-0 top-0 z-20 flex min-h-screen flex-col items-center justify-center gap-9 bg-black/50 pb-10 lg:min-w-[552px]'
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className='flex max-w-[458px] flex-col items-center justify-center gap-5 rounded-2xl bg-white p-6'
          >
            <Image
              src='/images/success2.svg'
              width={75}
              height={75}
              alt='success icon'
            />
            <p className='text-center font-clashmd text-base text-myGray lg:text-[25px]'>
              Product reviewed <br /> successfully!
            </p>
            <p className='text-center text-xs lg:text-base'>
              Thank you for submitting your review! Your feedback <br /> helps
              others make informed decisions.
            </p>
          </div>
        </div>
      )}
      {productsWithStatus.length < 1 ? (
        <div className='flex h-[70vh] items-center justify-center'>
          <div className='m-auto grid max-w-xs justify-items-center gap-3 lg:max-w-[420px] lg:gap-6'>
            <div className='h-16 w-16 rounded-full bg-[#FFC5C6]' />
            <p className='text-center font-clashmd text-[25px] text-myGray lg:text-2xl'>
              You haven&rsquo;t Placed any Orders!
            </p>
            <p className='w-[80%] text-center text-xs text-myGray lg:w-full lg:text-sm'>
              It looks like you don&rsquo;t have any notifications right now.
              Check back soon for updates, alerts, and important messages!
            </p>
          </div>
        </div>
      ) : (
        <div>
          {isReview ? (
            <div className='mt-10 w-full rounded-2xl lg:bg-[#F4F4F4] lg:px-6 py-8'>
              <div className='flex flex-col lg:flex-row items-center justify-between'>
                <div className='flex flex-col lg:flex-row items-center gap-2'>
                  <Image
                    className='h-[45px] w-[45px] rounded-[10px] object-contain lg:h-[67px] lg:w-[67px] lg:rounded-[10px]'
                    src={selectedProduct.productImage}
                    alt=''
                    width={67}
                    height={67}
                  />
                  <p className='mb-1 max-w-[475px] text-xs text-black'>
                    {selectedProduct.productName}
                  </p>
                </div>
                <div className='flex w-fit flex-col items-center justify-center gap-3 lg:pr-[4%]'>
                  <StarRating onRate={setRating} width={30.5} />
                  <p className='text-xs text-black'>
                    Select the stars to rate the product
                  </p>
                </div>
              </div>
              <div className='mt-10 grid gap-2'>
                <label className='text-xs font-clashmd lg:font-clash text-black pl-4 lg:pl-0'>Detailed Review</label>
                <textarea
                  className='input-box w-full bg-[#f4f4f4] lg:bg-white resize-none rounded-2xl p-5 text-sm placeholder:text-[#5E5E5E] focus:outline-primary'
                  rows={6}
                  placeholder='Tell us about your experience with the product.'
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                ></textarea>
              </div>
              <div className='mt-10 flex items-center justify-center mx-[5%] lg:mx-0'>
                <Button
                  loading={reviewLoading}
                  disabled={reviewLoading}
                  onClick={() => handleReviewSubmit(selectedProduct.id)}
                  className='h-[50px] w-full max-w-[391px] rounded-full border-0 font-clashmd text-base shadow-none'
                >
                  Submit your review
                </Button>
              </div>
            </div>
          ) : (
            <div className='grid gap-5 pt-3 lg:mt-10 lg:pt-0'>
              {productsWithStatus.map((order, i) => (
                <div
                  key={i}
                  className='flex max-w-[957px] items-center gap-4 rounded-[20px] bg-[#F4F4F4]/95 px-3 py-4 lg:gap-10 lg:rounded-[17px] lg:bg-[#F4F4F4] lg:px-[15px] lg:py-[15px]'
                >
                  <Image
                    className='h-[75px] w-[75px] rounded-[15px] object-contain lg:h-[95px] lg:w-[95px] lg:rounded-3xl'
                    src={order.productImage}
                    alt=''
                    width={95}
                    height={95}
                  />
                  <div className='grid w-full gap-1 lg:hidden'>
                    <p className='mb-1 max-w-[475px] text-xs text-black'>
                      {order.productName}
                    </p>
                    <div className='flex items-center justify-between'>
                      <p className='text-[10px] text-black'>
                        Order ID : #{order.productId}
                      </p>
                      <button
                        onClick={() => handleRateProductClick(order)}
                        className='font-clashmd text-[8px] text-primary'
                      >
                        Rate this product
                      </button>
                    </div>
                  </div>
                  <div className='hidden w-full justify-between lg:flex'>
                    <div>
                      <p className='mb-1 max-w-[475px] text-base text-black'>
                        {order.productName}
                      </p>
                      <div className='flex items-center gap-5'>
                        <p className='text-sm text-black'>
                          Order ID : #{order.productId}
                        </p>
                      </div>
                    </div>
                    <div className='flex items-center'>
                      <button
                        onClick={() => handleRateProductClick(order)}
                        className='font-clashmd text-base text-primary'
                      >
                        Rate this product
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
