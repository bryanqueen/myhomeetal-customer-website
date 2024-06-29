import { Add, Minus, CardAdd } from 'iconsax-react';
import Image from 'next/image';

import AddFundDialog from './AddFundDialog';

import Button from '@components/Button';
import MyDialog from '@components/Dialog';

const WalletBalanceCard = () => {
  return (
    <div className='my-5 rounded-xl bg-primary/10 bg-[image:url(/images/account/info-bg-sm.png)] bg-contain bg-[position:110%] bg-no-repeat px-5 py-8 md:rounded-2xl lg:bg-[image:url(/images/account/my-wallet-bg.png)] lg:bg-[size:initial]'>
      <div className='flex justify-end md:hidden'>
        <Button
          className='h-16 w-16 gap-2 rounded-full bg-white px-1 text-primary'
          ariaLabel='Add Card'
        >
          <CardAdd variant='Bulk' size={30} />
        </Button>
      </div>
      <p className='text-4xl font-medium md:text-3xl'>
        <span className='hidden md:inline'>Balance:</span>
        ₦60,000.00{' '}
      </p>
      <div className='md:hidden'>
        <p className='text-gray-500'>- ₦176,900.00</p>
        <div className='flex justify-end'>
          <Button className='h-12 w-12 gap-2 rounded-xl bg-white p-4 text-primary'>
            <Image
              src='/icons/vertical-ellipsis.svg'
              width={10}
              height={16}
              alt=''
            />
          </Button>
        </div>
      </div>
      <div className='mb-3 mt-1 hidden text-gray-500 md:block'>
        <p>Total spend - ₦870,000.00</p>
        <div className='mt-5 flex min-w-fit gap-5 rounded-full p-2 text-sm'>
          <MyDialog
            trigger={
              <Button className='min-w-fit gap-2 px-3'>
                <Add variant='Broken' />
                Add Funds
              </Button>
            }
            content={<AddFundDialog />}
          />
          <Button className='min-w-fit gap-2 bg-red-900 px-3'>
            <Minus variant='Outline' />
            Withdraw Funds
          </Button>
          <Button className='gap-2 bg-white px-3 text-primary'>
            <CardAdd variant='Bulk' className='' />
            Add Card
          </Button>
        </div>
      </div>
    </div>
  );
};

export default WalletBalanceCard;
