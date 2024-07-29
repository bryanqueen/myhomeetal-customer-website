'use client';
import React, { useEffect, useState } from 'react';
import WalletCreation from '@components/account/wallet/WalletCreation';
import WalletAccount from './WalletAccount';
import productService from '@/app/services/productService';
import { HomeSkeleton } from '../../loader';

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

export default function WalletContainer() {
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wallet, setWallet] = useState<Wallet | null>(null);

  const getWallet = async () => {
    try {
      const res = await productService.getWallet();
      if (res.status === 200 && res.data.account_no) {
        setHasWallet(true);
        setWallet(res.data);
      } else {
        setHasWallet(false);
        setWallet(null);
      }
    } catch (error) {
      console.log(error);
      setHasWallet(false); // Handle error by assuming no wallet
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWallet();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <HomeSkeleton />
        </div> // You can replace this with a skeleton component if needed
      ) : hasWallet ? (
        <WalletAccount wallet={wallet} />
      ) : (
        <WalletCreation />
      )}
    </div>
  );
}
