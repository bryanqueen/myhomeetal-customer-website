import { Metadata } from 'next';

import WalletBalanceCard from '@components/account/wallet/WalletBalanceCard';
import RecentTransactions from '@components/account/wallet/RecentTransactions';
import AddCard from '@components/account/wallet/AddCard';
import WalletCreation from '@components/account/wallet/WalletCreation';

export const metadata: Metadata = {
  title: 'My Wallet | Myhomeetal',
};

function MyWalletPage() {
  const hasWallet = false;

  return <main>{hasWallet ? <WalletAccount /> : <WalletCreation />}</main>;
}

const WalletAccount = () => {
  return (
    <>
      <h1 className='text-3xl font-medium'>My Wallet</h1>
      <WalletBalanceCard />
      <div className='my-10'>
        <h2 className='text-center font-medium md:text-left'>
          Recent Transactions
        </h2>
        <div className='grid gap-5 py-3 md:grid-cols-[1fr_20rem]'>
          <RecentTransactions />
          <AddCard />
        </div>
      </div>
    </>
  );
};

export default MyWalletPage;
