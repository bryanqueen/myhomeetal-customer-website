import CollectWalletInfo from '@components/account/wallet/CollectWalletInfo';
import StepsIndicator from './StepIndicator';
import Button from '../../Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { useRouter } from 'next/navigation';

const WalletCreation = () => {
  const router = useRouter();
  return (
    <div className='px-[3%] lg:px-0'>
      <div className='sticky top-[83px] z-20 flex items-center justify-center bg-white py-5 pl-1 lg:hidden'>
        <Button
          onClick={router.back}
          className='absolute left-[2%] justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
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
      <div className='flex flex-col justify-center gap-20 lg:relative xl:flex-row'>
        <div className='absolute left-5 hidden shrink-0 gap-3 lg:grid'>
          <h1 className='font-clashmd text-3xl text-myGray'>My Wallet</h1>
          <span className='text-base text-myGray'>Lets setup your wallet</span>
        </div>
        <div className='pt-10 lg:pt-0'>
          <StepsIndicator currentStep={1} />
        </div>
      </div>
      <div className='hidden h-10 lg:block'></div>
      <CollectWalletInfo />
    </div>
  );
};

export default WalletCreation;
