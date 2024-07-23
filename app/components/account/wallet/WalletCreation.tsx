import CollectWalletInfo from '@components/account/wallet/CollectWalletInfo';
import StepsIndicator from './StepIndicator';
import Button from '../../Button';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';
import { headers } from 'next/headers';

const WalletCreation = () => {
  const headersList = headers();
  const previousPath = headersList.get('referer') || '';
  return (
    <div className='px-[3%] lg:px-0'>
      <div className='sticky top-[83px] z-50 flex items-center bg-white py-5 pl-1 lg:hidden'>
        <Button
          href={previousPath}
          className='justify-start font-clashmd text-xs text-myGray lg:justify-center lg:font-clash lg:text-sm'
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
      <div className='flex flex-col gap-20 xl:flex-row'>
        <div className='hidden shrink-0 gap-3 lg:grid'>
          <h1 className='font-clashmd text-3xl text-myGray'>My Wallet</h1>
          <span className='text-base text-myGray'>Lets setup your wallet</span>
        </div>
        <div className='pt-10 lg:pt-0'>
          <StepsIndicator currentStep={1} />
        </div>
      </div>
      <CollectWalletInfo />
    </div>
  );
};

export default WalletCreation;
