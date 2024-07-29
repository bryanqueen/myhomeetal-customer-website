import WalletBalanceCard from '@components/account/wallet/WalletBalanceCard';
import RecentTransactions from '@components/account/wallet/RecentTransactions';
import { headers } from 'next/headers';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

interface Wallet {
  _id: string;
  user: string;
  account_no: string;
  bvn: string;
  mobile_number: string;
  bank_name: string;
  balance: number;
  transactions: string[];
  __v: number;
}

interface WalletAccountProps {
  wallet: Wallet;
}

const WalletAccount: React.FC<WalletAccountProps> = ({ wallet }) => {
  //const headersList = headers();
  //const previousPath = headersList.get('referer') || '';
  return (
    <main className='px-[3%] pb-20 lg:px-0'>
      <div className='sticky top-[83px] z-20 flex items-center justify-center bg-white py-5 pl-1 lg:hidden'>
        <Button
          className='absolute left-[2%] justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
          linkType='rel'
          variant='ghost'
        >
          <ArrowLeftIcon
            width={17}
            className=' mr-[2px] mt-[-1px] lg:mr-1 lg:mt-[-3px]'
          />
          Back
        </Button>
        <p className='text-center font-clashmd text-xs text-myGray lg:hidden'>
          My Wallet{' '}
        </p>
      </div>
      <h1 className='hidden font-clashmd text-3xl text-myGray lg:block'>
        My Wallet
      </h1>
      <WalletBalanceCard wallet={wallet} />
      <div className='my-10'>
        <RecentTransactions wallet={wallet} />
      </div>
    </main>
  );
};

export default WalletAccount;
