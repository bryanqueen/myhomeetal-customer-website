'use client';
import { Add } from 'iconsax-react';

import AddFundDialog from './AddFundDialog';

import Button from '@components/Button';
import MyDialog from '@components/Dialog';
import ProductPrice from '../../product/ProductPrice';
import { useRegion } from '@/app/RegionProvider';
import ClientOnly from '../../ClientOnly';
import { WalletAccountProps } from '@/types';

const WalletBalanceCard: React.FC<WalletAccountProps> = ({ wallet, walletTrans }) => {
  const { region } = useRegion();
  const totalSpent = walletTrans
    .filter(transaction => transaction.type === "Purchase" && transaction.amount < 0)
    .reduce((sum, transaction) => sum + Math.abs(transaction.amount), 0);

  return (
    <ClientOnly>
      <div className='flex flex-col items-center justify-center rounded-[10px] bg-[#FFE8E8] py-[38px] lg:hidden'>
        <div className='grid w-fit gap-3'>
          <p className='text-[10px]'>Available Balance:</p>
          <p className='text-end font-clashmd text-[25px]'>
            {wallet.balance.balance === 0 ? '0.00' : <ProductPrice priceInNGN={wallet.balance.balance} region={region} />}
          </p>
          <p className='text-[10px] text-myGray'>
            Total Spent: - <span className='text-black'>{totalSpent === 0 ? '0.00' : <ProductPrice priceInNGN={totalSpent} region={region} />}</span>
          </p>
        </div>

        <div className='mt-5 flex min-w-fit gap-5 rounded-full p-2 text-sm'>
          <MyDialog
            trigger={
              <Button className='h-[32px] min-w-[152px] rounded-[10px] border-0 text-[10px] shadow-none'>
                <span className='flex items-center gap-2'>
                  <Add variant='Broken' size={15} />
                  Add Funds
                </span>
              </Button>
            }
            content={<AddFundDialog wallet={wallet} />}
          />
        </div>
      </div>
      <div className='my-5 hidden rounded-3xl bg-[#FFF1F1] bg-[image:url(/images/account/info-bg-sm.png)] bg-contain bg-[position:110%] bg-no-repeat px-5 py-8 md:rounded-2xl lg:block lg:bg-[image:url(/images/account/my-wallet-bg.png)] lg:bg-[size:initial]'>
        <p className='font-clashmd text-[39px] text-myGray'>
          <span className='mr-4 inline'>Balance:</span>
          <span> {wallet.balance.balance === 0 ? '0.00' : <ProductPrice priceInNGN={wallet.balance.balance} region={region} />}</span>
        </p>
        <div className='mb-3 mt-1 hidden text-gray-500 lg:block'>
          <p className='text-base text-myGray'>Total spent - {totalSpent === 0 ? '0.00' : <ProductPrice priceInNGN={totalSpent} region={region} />}</p>
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
              content={<AddFundDialog wallet={wallet} />}
            />
          </div>
        </div>
      </div>
    </ClientOnly>
  );
};

export default WalletBalanceCard;
