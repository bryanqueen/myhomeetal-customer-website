import WalletBalanceCard from '@components/account/wallet/WalletBalanceCard';
import RecentTransactions from '@components/account/wallet/RecentTransactions';
import Button from '@/app/components/Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useRouter, useSearchParams } from 'next/navigation';
import StepsIndicator from './StepIndicator';
import { WalletAccountProps } from '@/types';

const WalletAccount: React.FC<WalletAccountProps> = ({ wallet, walletTrans }) => {
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
              className=' mr-[2px] mt-[-1px] lg:mr-1 lg:mt-[-3px]'
            />
            Back
          </span>
        </Button>
        <p className='text-center font-clashmd text-xs text-myGray lg:hidden'>
          My Wallet{' '}
        </p>
      </div>
      <div className='lg:mb-7 pt-5 flex flex-col justify-center gap-5 lg:relative lg:pt-0 xl:flex-row'>
        <div className='absolute left-5 hidden shrink-0 gap-3 lg:grid'>
          <h1 className='font-clashmd text-3xl text-myGray'>My Wallet</h1>
        </div>
        {funds && (
          <div className='py-5 lg:pt-0'>
            {wallet.balance.balance > 0 ? (
              <StepsIndicator currentStep={4} />
            ) : (
              <StepsIndicator currentStep={3} />
            )}
          </div>
        )}
      </div>

      <div className='lg:mt-10'>
        <WalletBalanceCard wallet={wallet} walletTrans={walletTrans} />
      </div>

      <div className='my-10'>
        <RecentTransactions walletTrans={walletTrans} />
      </div>
    </main>
  );
};

export default WalletAccount;
