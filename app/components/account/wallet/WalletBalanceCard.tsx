'use client';
import { Add, Minus, CardAdd } from 'iconsax-react';
import Image from 'next/image';

import AddFundDialog from './AddFundDialog';

import Button from '@components/Button';
import MyDialog from '@components/Dialog';
import ProductPrice from '../../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../../ClientOnly';

const WalletBalanceCard = () => {
  const { region } = useRegion();
  return (
    <ClientOnly>
      <div className='rounded-[10px] bg-[#FFE8E8] py-[38px] flex items-center justify-center flex-col lg:hidden'>
        <div className='w-fit grid gap-3'>
          <p className='text-[10px]'>Available Balance:</p>
          <p className='text-[25px] font-clashmd text-end'>0.00</p>
          <p className='text-[10px] text-myGray'>Total Spend: - <span className='text-black'>0.00</span></p>
        </div>

        <div className='mt-5 flex min-w-fit gap-5 rounded-full p-2 text-sm'>
          <MyDialog
            trigger={
              <Button className='min-w-[152px] rounded-[10px] text-[10px] border-0 h-[32px] shadow-none'>
                <span className='flex items-center gap-2'>
                  <Add variant='Broken' size={15} />
                  Add Funds
                </span>
              </Button>
            }
            content={<AddFundDialog />}
          />
        </div>
      </div>
      <div className='my-5 hidden rounded-3xl bg-[#FFF1F1] bg-[image:url(/images/account/info-bg-sm.png)] bg-contain bg-[position:110%] bg-no-repeat px-5 py-8 md:rounded-2xl lg:block lg:bg-[image:url(/images/account/my-wallet-bg.png)] lg:bg-[size:initial]'>
        <p className='font-clashmd text-[39px] text-myGray'>
          <span className='mr-4 inline'>Balance:</span>
          <span>0.00</span>
        </p>
        <div className='mb-3 mt-1 hidden text-gray-500 lg:block'>
          <p className='text-base text-myGray'>
            Total spend - <ProductPrice region={region} priceInNGN={0.0} />
          </p>
          <div className='mt-5 flex min-w-fit gap-5 rounded-full p-2 text-sm'>
            <MyDialog
              trigger={
                <Button className='min-w-fit rounded-[8px] border-0 px-6 py-3 shadow-none'>
                  <span className='flex items-center gap-2'>
                    <Add variant='Broken' />
                    Add Funds
                  </span>
                </Button>
              }
              content={<AddFundDialog />}
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default WalletBalanceCard;
