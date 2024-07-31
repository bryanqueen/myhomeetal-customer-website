'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Trash } from 'iconsax-react';
import ClientOnly from '@/app/components/ClientOnly';
import Button from '@/app/components/Button';
import ProductPrice from '@/app/components/product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';
import NoHistory from './NoHistory';
import { HomeSkeleton } from '../loader';

interface Product {
  _id: string;
  productTitle: string;
  brand: string;
  price: number;
  images: string[];
  reviewsCount: number;
  rating: number;
  isProductNew: boolean;
}

export default function SaveItems() {
  const { region } = useRegion();
  const [savedItems, setSavedItems] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSavedItems = async () => {
    try {
      const res = await productService.getSavedProducts();
      if (!res || !res.data) {
        console.log('id not found');
        setLoading(false);
        return notFound();
      }
      console.log(res);
      setSavedItems(res.data.savedItems);
      setLoading(false);
    } catch (error) {
      console.error('Error in ProductPage:', error);
      setLoading(false);
      return notFound();
    }
  };

  useEffect(() => {
    fetchSavedItems();
  }, []);

  if (loading) {
    return <HomeSkeleton />;
  }

  return (
    <div>
      {savedItems.length < 1 ? (
        <div className='py-32'>
          <NoHistory title='No Saved Item Yet' />
        </div>
      ) : (
        <ClientOnly>
          <div className='hidden lg:block'>
            <h1 className='font-clashmd text-3xl text-myGray'>Saved Items</h1>
            <p className='mt-2 text-base text-[#7C7C7C]'>
              Our robust measures ensure your data remains protected, giving you
              a worry-free browsing and shopping experience.
            </p>
          </div>
          <div className='grid gap-6 lg:my-10 lg:gap-9 lg:py-5'>
            {savedItems.map((item) => (
              <div
                key={item._id}
                className='flex h-[100px] items-center px-2 lg:block lg:h-[95px] lg:max-w-[833px] lg:px-0'
              >
                <div className='flex w-full gap-7 lg:gap-5'>
                  <Image
                    className='h-[62px] w-[58px] rounded-[12.63px] object-contain lg:h-[95px] lg:w-[95px] lg:rounded-3xl'
                    src={item.images[0]}
                    alt=''
                    width={95}
                    height={95}
                  />
                  <div className='relative flex min-h-full w-full items-center lg:hidden'>
                    <div className='h-[50px]'>
                      <p className='mb-1 text-xs text-myGray'>
                        {item.productTitle}
                      </p>
                      <ProductPrice
                        priceInNGN={item.price}
                        region={region}
                        className='ml-2 font-clashmd text-xs text-myGray'
                      />
                    </div>
                    <button className='absolute bottom-[-8px] right-1 flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FF0003]'>
                      <Trash size={13} variant='Bold' color='white' />
                    </button>
                  </div>

                  <div className='hidden w-full items-center justify-between lg:flex'>
                    <div className='grid max-w-[475px] gap-2'>
                      <p className='text-base text-myGray '>
                        {item.productTitle}
                      </p>
                      <div className='flex gap-1'>
                        <span className='text-sm text-myGray'>Brand: </span>
                        <span className='font-clashmd text-sm text-primary'>
                          {item.brand}
                        </span>
                      </div>
                    </div>
                    <div className='flex h-full w-fit flex-col justify-between'>
                      <ProductPrice
                        priceInNGN={item.price}
                        region={region}
                        className='text-end font-clashmd text-xl text-myGray'
                      />
                      <div className='flex items-end justify-end gap-3'>
                        <Link href='' className='text-sm text-primary'>
                          See details
                        </Link>
                        <Button
                          className='max-w-fit items-end p-0 text-sm text-myGray'
                          variant='ghost'
                        >
                          <span className='flex items-center gap-[2px]'>
                            {' '}
                            <Trash
                              size={20}
                              className='text-[#B22222]'
                              variant='Bold'
                            />
                            Remove
                          </span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ClientOnly>
      )}
    </div>
  );
}
