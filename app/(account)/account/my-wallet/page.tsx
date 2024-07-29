import { Metadata } from 'next';
import WalletContainer from '@/app/components/account/wallet/WalletContainer';

export const metadata: Metadata = {
  title: 'My Wallet | Myhomeetal',
};

async function MyWalletPage() {

  return <main>
    <WalletContainer />
  </main>;
}



export default MyWalletPage;
