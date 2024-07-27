'use client';

import { Add, HeartAdd, Minus } from 'iconsax-react';
import Link from 'next/link';
import { Rating } from 'react-simple-star-rating';

import ProductCarousel from './ProductCarousel';
import ProductGallery from './ProductGallery';
import { ArrowLeftIcon, StarIcon } from '@heroicons/react/16/solid';
import AddToCartButton from '../cart/AddToCartButton';
import ProductPrice from './ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import { useCart } from 'react-use-cart';
import CartHandler from '../cart/CartHandler';
import { notFound, useRouter } from 'next/navigation';
import productService from '@/app/services/productService';
import ClientOnly from '../ClientOnly';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

const ProductOverview = ({ data }: any) => {
  const [savedItems, setSavedItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const id = data?._id;

  const handleBack = () => {
    router.back();
  };

  //fetch all saved items
  const fetchSavedItems = async () => {
    try {
      const res = await productService.getSavedProducts();
      if (!res || !res.data) {
        console.log('id not found');
        return notFound();
      }
      setSavedItems(res.data.savedItems);
    } catch (error) {
      console.error('Error in ProductPage:', error);
      return notFound();
    }
  };

  useEffect(() => {
    fetchSavedItems();
  }, []);

  const savedItem = async () => {
    setLoading(true);
    // Check if the item is already saved
    if (savedItems.includes(id)) {
      toast.error('Item already saved');
      setLoading(false);
      return;
    }
  
    try {
      const payload = { authMethod: data?._id };
      const res = await productService.saveProduct({ payload, id });
  
      // Check the response status
      if (res.status === 200) {
        toast.success('Saved item');
        setLoading(false);
      } else {
        // Handle unexpected response status
        toast.error('Failed to save item. Please try again.');
        setLoading(false);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        // JWT expired or unauthorized, redirect to login page
        setLoading(false);
        router.push('/login');
      } else {
        // Handle other errors
        setLoading(false);
        console.error('Error in saving item:', error);
        toast.error('An error occurred while saving the item. Please try again.');
      }
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
  const { items } = useCart();
  const itemInCart = items.find((item) => item.id === data?._id);
  const itemForCart = { ...data, id: data._id };
  const { region } = useRegion();
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
            <div className='w-full lg:h-full lg:basis-[48%] lg:pl-10'>
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

                  <div className='flex items-center py-3 lg:hidden'>
                    <p className='mr-1 flex items-center gap-1 text-[10px] text-xs lg:text-sm lg:font-semibold'>
                      <StarIcon width={16} className='mt-[-3px] text-primary' />
                      {data?.rating?.rate}
                    </p>

                    <span className='text-[10px]'>
                      ({data?.rating?.count} Reviews)
                    </span>
                  </div>
                  <div className='hidden items-center py-3 lg:flex'>
                    <p className='text-sm text-black'>
                      Ratings <span className='ml-1'>{data?.rating?.rate}</span>{' '}
                    </p>
                    <Rating
                      initialValue={data?.rating?.rate}
                      readonly={true}
                      allowFraction={true}
                      size={16}
                      fillColor=''
                      className='ml-2 mt-[-7px] text-primary'
                      SVGclassName='inline'
                    />
                    <span className='px-3' />
                    <span className='text-sm text-black'>
                      {data?.rating?.count} Reviews
                    </span>
                  </div>

                  <ProductPrice
                    priceInNGN={data?.price}
                    region={region}
                    className={priceStyle}
                  />
                </div>
                <ClientOnly>
                  <div className='mt-16 flex items-center justify-between gap-4 lg:mt-10 lg:w-[537px]'>
                    {itemInCart ? (
                      <div className='flex w-[206px] items-center justify-between'>
                        <CartHandler
                          cart
                          item={itemInCart}
                          variant='UPDATE_MINUS'
                          className='h-[50px] w-[50px] rounded-lg border-0'
                        >
                          <Minus size={35} />
                        </CartHandler>
                        <span className='text-2xl text-myGray'>
                          {itemInCart?.quantity}
                        </span>
                        <CartHandler
                          item={itemInCart}
                          variant='UPDATE_PLUS'
                          className='h-[50px] w-[50px] rounded-lg border-0'
                        >
                          <Add size={35} />
                        </CartHandler>
                      </div>
                    ) : (
                      <AddToCartButton item={itemForCart} />
                    )}

                    <button
                      onClick={savedItem}
                      className='flex h-[60px] relative min-w-[60px] items-center justify-center rounded-full bg-[#F68182]'
                    >
                      <HeartAdd size='24' color='#ffffff' variant='Bulk' />
                      {loading && (
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
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
