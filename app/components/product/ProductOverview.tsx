'use client';

import { Add, HeartAdd, Minus, ShoppingCart } from 'iconsax-react';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';

import ProductCarousel from './ProductCarousel';
import ProductGallery from './ProductGallery';
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/16/solid';
import ProductPrice from './ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import { notFound, useRouter } from 'next/navigation';
import productService from '@/app/services/productService';
import ClientOnly from '../ClientOnly';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { jwtVerify } from 'jose';
import { useCartActions } from '@/app/utils/helpers';
import { useCart } from '@/app/CartProvider';

type UserType = {
  _id: string;
  firstname: string;
};

type ReviewType = {
  _id: string;
  user: UserType;
  product: string;
  rating: number;
  comment: string;
  date: string;
  __v: number;
};

type Props = {
  data: any;
  reviewData: ReviewType[];
};

const ProductOverview = ({ data, reviewData }: Props) => {
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [loading2, setLoading2] = useState({ add: false, update: false });
  const router = useRouter();
  const id = data?._id;

  const handleBack = () => {
    router.back();
  };

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

  const priceInNGN = sanitizeAndConvertPrice(data?.price);

  const calculateAverageRating = (reviewData: ReviewType[]) => {
    const total = reviewData?.reduce((sum, rev) => sum + rev?.rating, 0);
    return reviewData?.length ? total / reviewData?.length : 0;
  };

  const averageRating = calculateAverageRating(reviewData);
  const reviewCount = reviewData?.length;

  //fetch all saved items
  const fetchSavedItems = async () => {
    try {
      const res = await productService.getSavedProducts();
      if (!res || !res.data) {
        console.log('id not found');
        return notFound();
      }
      setSavedItems(res?.data?.savedItems);
    } catch (error) {
      console.error('Error in ProductPage:', error);
      return notFound();
    }
  };

  useEffect(() => {
    fetchSavedItems();
  }, []);

  // Function to verify JWT token
  const verifyToken = async (token) => {
    try {
      const secret = new TextEncoder().encode(
        process.env.NEXT_PUBLIC_JWT_SECRET
      );
      await jwtVerify(token, secret);
      return true;
    } catch (error) {
      return false;
    }
  };

  const savedItem = async () => {
    setLoading(true);

    if (savedItems.includes(id)) {
      toast.error('Item already saved');
      setLoading(false);
      return;
    }

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('AUTH_TOKEN='))
        ?.split('=')[1];

      if (!token || !(await verifyToken(token))) {
        toast.error('Session expired. Redirecting to login...');

        // Redirect to login with callbackUrl parameter
        router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        setLoading(false);
        return;
      }

      const payload = { authMethod: data?._id };
      const res = await productService.saveProduct({ payload, id });

      if (res.status === 200) {
        toast.success('Item Saved');
        setLoading(false);
      } else {
        toast.error('Failed to save item. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      setLoading(false);
      console.error('Error in saving item:', error);
      toast.error('An error occurred while saving the item. Please try again.');
    }
  };


  const breadCrumb = [
    {
      title: 'Home',
      link: '/',
    },
    {
      title: data?.category?.name,
      link: `/category/${data?.category?.name}?categoryId=${data?.category?._id}`,
    },
    {
      title: data?.brand,
    },
  ];
  const priceStyle = 'text-black text-[25px] lg:text-5xl font-clashmd';
  const { cartState } = useCart();
  const itemInCart = cartState.items.find((item) => item?.product?._id === data?._id);
  const { region } = useRegion();
 
  const { addItemToCart, updateCartItem, addItemToCart1 } = useCartActions();

  const handleAddToCart = async () => {
    setLoading2(prev => ({ ...prev, add: true })); // Set loading state to true when starting the action

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('AUTH_TOKEN='))
        ?.split('=')[1];

      if (!token || !(await verifyToken(token))) {
        toast.error('Session expired. Redirecting to login...');
        router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      await addItemToCart({ id: data?._id, name: data.productTitle, price: data.price, quantity: 1 });
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading2(prev => ({ ...prev, add: false })); // Reset loading state after the action completes
    }
  };

  const handleAddToCart2 = async () => {
    setLoading2(prev => ({ ...prev, add: true })); // Set loading state to true when starting the action

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('AUTH_TOKEN='))
        ?.split('=')[1];

      if (!token || !(await verifyToken(token))) {
        toast.error('Session expired. Redirecting to login...');
        router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }

      await addItemToCart1({ id: data?._id, name: data.productTitle, price: data.price, quantity: 1 });
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading2(prev => ({ ...prev, add: false })); // Reset loading state after the action completes
    }
  };

  const handleUpdateCartItem = async () => {
    setLoading2(prev => ({ ...prev, update: true })); // Set loading state to true when starting the action

    try {
      const token = document.cookie
        .split('; ')
        .find(row => row.startsWith('AUTH_TOKEN='))
        ?.split('=')[1];

      if (!token || !(await verifyToken(token))) {
        toast.error('Session expired. Redirecting to login...');
        router.push(`/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        return;
      }
      await updateCartItem(itemInCart?.product?._id);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred. Please try again.');
    } finally {
      setLoading2(prev => ({ ...prev, update: false })); // Reset loading state after the action completes
    }
  };

  return (
    <div>
      {data && (
        <div className='lg:px-[3%]'>
          <div className='mb-5 hidden items-center gap-14 lg:flex'>
            <button
              onClick={handleBack}
              className='flex items-center text-sm text-myGray'
            >
              <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
              Back
            </button>
            <ul className='flex items-center gap-2'>
              {breadCrumb.map((item, i, items) => (
                <li key={i} className='flex items-center gap-2'>
                  {item?.link ? (
                    <Link href={item.link} className='text-sm text-myGray'>
                      {item?.title}{' '}
                    </Link>
                  ) : (
                    <p className='text-sm text-myGray'>{item.title}</p>
                  )}

                  {i < items?.length - 1 && (
                    <span className='inline-block h-1 w-1 rounded-full bg-[#d9d9d9] p-[0.2rem]'></span>
                  )}
                </li>
              ))}
            </ul>
          </div>
          <div className='mb-24 mt-16 flex w-full flex-col items-center justify-between lg:h-[500px] lg:flex-row'>
            <div className='w-full min-h-[360px] lg:h-full lg:basis-[48%] lg:pl-10'>
              <ProductCarousel data={data} />
              <ProductGallery images={data?.images} />
            </div>
            <div className='flex h-full w-full items-center px-5 lg:basis-[48%]'>
              <div className='w-full lg:h-[320px] lg:w-[537px]'>
                <div className='flex h-fit flex-col lg:w-[488px]'>
                  <div className='mb-4 font-clashmd text-xs text-black lg:font-clash lg:text-sm'>
                    Brand:{' '}
                    <span className='ml-1 font-clash text-xs text-primary lg:font-clashmd lg:text-sm'>
                      {data?.brand}
                    </span>
                  </div>
                  <p
                    className={
                      'text-base text-myGray lg:block lg:font-clashmd lg:text-2xl lg:text-black'
                    }
                  >
                    {data?.productTitle}
                  </p>

                  <div className='flex gap-3 items-center py-3 lg:hidden'>
                    <p className='mr-1 flex items-center gap-1 text-[10px] text-xs lg:text-sm lg:font-semibold'>
                      <StarIcon width={16} className='mt-[-3px] text-primary' />
                      {averageRating.toFixed(1)}
                    </p>

                    <span className='text-[10px]'>
                      {reviewCount} <span className='ml-[2px]'>{reviewCount < 2 ? 'review' : 'reviews'}</span>
                    </span>
                  </div>
                  <div className='hidden gap-2 items-center py-3 lg:flex'>
                    <p className='text-sm text-black'>
                      Ratings
                    </p>
                    <div>
                      <span className='ml-1'>{averageRating.toFixed(1)}</span>{' '}
                      <Rating
                        initialValue={averageRating}
                        readonly={true}
                        allowFraction={true}
                        size={16}
                        fillColor=''
                        className='mt-[-7px] text-primary'
                        SVGclassName='inline'
                      />
                    </div>
                    <span className='text-sm text-black'>
                      {reviewCount} {reviewCount < 2 ? 'review' : 'reviews'}
                    </span>
                  </div>

                  <ProductPrice
                    priceInNGN={priceInNGN}
                    region={region}
                    className={priceStyle}
                  />
                </div>
                <ClientOnly>
                  <div className='mt-16 flex items-center justify-between gap-4 lg:mt-10 lg:w-[537px]'>

                    {cartState && itemInCart ? (
                      <div className='flex w-[206px] items-center justify-between'>
                        <button
                          disabled={loading2.update}
                          onClick={handleUpdateCartItem}
                          className='h-[50px] flex items-center justify-center w-[50px] bg-primary text-white rounded-lg border-0'
                        >
                          {loading2.update ? (
                            <svg
                              className='h-5 w-5 animate-spin'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                            >
                              <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                              />
                              <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                              />
                            </svg>
                          ) : (
                            <Minus size={35} />
                          )}
                        </button>
                        <span className='text-2xl text-myGray'>
                          {itemInCart?.qty}
                        </span>
                        <button
                          disabled={loading2.add}
                          onClick={handleAddToCart2}
                          className='h-[50px] flex items-center justify-center bg-primary text-white w-[50px] rounded-lg border-0'
                        >
                          {loading2.add ? (
                            <svg
                              className='h-5 w-5 animate-spin'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                            >
                              <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                              />
                              <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                              />
                            </svg>
                          ) : (
                            <Add size={35} />
                          )}
                        </button>
                      </div>
                    ) : (
                      <button
                        disabled={loading2.add}
                        className='w-full flex relative items-center justify-center shadow-none border-0 rounded-full px-10 py-5 text-base font-clashmd bg-primary text-white'
                        onClick={handleAddToCart}>

                        {loading2.add ? (
                          <span className='absolute left-7'>
                            {/* You can use a spinner icon or text like "Loading..." here */}
                            <span> <svg
                              className='-me-1 ms-3 h-5 w-5 animate-spin'
                              xmlns='http://www.w3.org/2000/svg'
                              fill='none'
                              viewBox='0 0 24 24'
                            >
                              <circle
                                className='opacity-25'
                                cx='12'
                                cy='12'
                                r='10'
                                stroke='currentColor'
                                strokeWidth='4'
                              />
                              <path
                                className='opacity-75'
                                fill='currentColor'
                                d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                              />
                            </svg></span>
                          </span>
                        ) : (
                          <span className='absolute left-7'>
                            <ShoppingCart size={24} variant='Bulk' color='white' />
                          </span>
                        )}


                        Add to cart
                      </button>
                    )}
                    <button
                      onClick={savedItem}
                      className='relative flex h-[60px] min-w-[60px] items-center justify-center rounded-full bg-[#F68182]'
                    >
                      <HeartAdd size='24' color='#ffffff' variant='Bulk' />
                      {loading && (
                        <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
                      )}
                    </button>
                  </div>
                </ClientOnly>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductOverview;
