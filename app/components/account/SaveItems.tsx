'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { CloseSquare, Trash } from 'iconsax-react';
import ClientOnly from '@/app/components/ClientOnly';
import Button from '@/app/components/Button';
import ProductPrice from '@/app/components/product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import productService from '@/app/services/productService';
import { notFound } from 'next/navigation';
import NoHistory from './NoHistory';
import { HomeSkeleton } from '../loader';
import Dialog from '@components/Dialog';
import { Close as CloseDialog } from '@radix-ui/react-dialog';
import toast from 'react-hot-toast';

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

  const fetchSavedItems = async () => {
    try {
      const res = await productService.getSavedProducts();
      if (!res || !res.data) {
        console.log('id not found');
        setLoading(false);
        return notFound();
      }
      console.log(res);
      setSavedItems(res?.data?.savedItems.reverse());
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

  const deleteItem = async (id: string) => {
    setLoading(true);
    try {
      const payload = { productId: id };
      const res = await productService.removeSavedProduct(payload);
      if (res.status === 200) {
        toast.success('Item deleted');
        await fetchSavedItems();
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      toast.error('Error deleting item. Please try again');
    } finally {
      setLoading(false);
    }
  };

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
          <div className='grid gap-6 lg:my-10 pt-8 lg:gap-9 lg:py-5'>
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
                        priceInNGN={sanitizeAndConvertPrice(item.price)}
                        region={region}
                        className='ml-2 font-clashmd text-xs text-myGray'
                      />
                    </div>
                    <div className='absolute bottom-[-8px] right-1 flex items-end justify-end gap-5 '>
                      <Link
                        href={`/item/${item._id}`}
                        className='text-xs text-primary'
                      >
                        See details
                      </Link>
                      <Dialog
                        trigger={
                          <button className='flex h-[25px] w-[25px] items-center justify-center rounded-full bg-[#FF0003]'>
                            <Trash size={13} variant='Bold' color='white' />
                          </button>
                        }
                        content={
                          <Delete id={item._id} deleteItem={deleteItem} />
                        }
                      />
                    </div>
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
                        priceInNGN={sanitizeAndConvertPrice(item.price)}
                        region={region}
                        className='text-end font-clashmd text-xl text-myGray'
                      />
                      <div className='flex items-end justify-end gap-3'>
                        <Link
                          href={`/item/${item._id}`}
                          className='text-sm text-primary'
                        >
                          See details
                        </Link>
                        <Dialog
                          trigger={
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
                          }
                          content={
                            <Delete id={item._id} deleteItem={deleteItem} />
                          }
                        />
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

interface LogoutCardProps {
  id: string;
  deleteItem: (id: string) => void; // Define the function type here
}

const Delete: React.FC<LogoutCardProps> = ({ id, deleteItem }) => {
  return (
    <div className='flex w-[full] max-w-[400px] flex-col items-center gap-4 px-0 py-5 text-center lg:w-[70vw] lg:px-3'>
      <div className='h-16 w-16 rounded-full bg-[#FFC5C6]' />
      <div className=''>
        <p className='mb-3 text-center font-clashmd text-xl text-myGray lg:text-2xl'>
          Are you sure you want to <br /> delete this item?
        </p>
        <p className='text-sm text-myGray'>
          Ensure you&apos;ve saved all your actions <br /> before proceeding.
        </p>
      </div>
      <div className='w-full'>
        <CloseDialog asChild>
          <Button
            className='mb-2 h-[44px] w-full gap-2 border-0 p-3 shadow-none'
            onClick={() => deleteItem(id)}
          >
            <span className='flex items-center gap-3 text-base'>
              <Trash variant='Bulk' />
              Yes, Delete
            </span>
          </Button>
        </CloseDialog>
        <CloseDialog asChild>
          <Button className='font-base h-[44px] w-full gap-2 border-0 bg-[#FFF1F1] text-myGray shadow-none'>
            <span className='flex items-center gap-3'>
              <CloseSquare variant='Bold' />
              No, Cancel
            </span>
          </Button>
        </CloseDialog>
      </div>
    </div>
  );
};
