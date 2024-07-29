import WalletBalanceCard from '@components/account/wallet/WalletBalanceCard';
import RecentTransactions from '@components/account/wallet/RecentTransactions';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import StepsIndicator from './StepIndicator';

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
  const searchParams = useSearchParams();
  const funds = decodeURIComponent(searchParams.get('fund') || '');
  const router = useRouter();
  return (
    <main className='px-[3%] pb-20 lg:px-0'>
      <div className='sticky top-[83px] z-20 flex items-center justify-center bg-white py-5 pl-1 lg:hidden'>
        <Button
          className='absolute left-[2%] justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
          onClick={router.back}
          variant='ghost'
        >
        <span className='flex items-center'>
          <ArrowLeftIcon
          width={17}
          className=' mr-[2px] mt-[-1px] lg:mr-1 lg:mt-[-3px]'/>
          Back
        </span>
          
        </Button>
        <p className='text-center font-clashmd text-xs text-myGray lg:hidden'>
          My Wallet{' '}
        </p>
      </div>
      <div className='mb-10 flex flex-col justify-center gap-5 pt-10 lg:relative lg:pt-0 xl:flex-row'>
        <div className='absolute left-5 hidden shrink-0 gap-3 lg:grid'>
          <h1 className='font-clashmd text-3xl text-myGray'>My Wallet</h1>
        </div>
        {funds && <StepsIndicator currentStep={3} />}
      </div>

      <WalletBalanceCard wallet={wallet} />
      <div className='my-10'>
        <RecentTransactions wallet={wallet} />
      </div>
    </main>
  );
};

export default WalletAccount;
