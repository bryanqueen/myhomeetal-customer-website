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
interface WalletTrans {
  _id: string;
  amount: number;
  type: string;
  date: string;
  order: string;
}

export default function WalletContainer() {
  const [hasWallet, setHasWallet] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wallet, setWallet] = useState<Wallet | null>(null);
  const [walletTrans, setWalletTrans] = useState<WalletTrans[]>([]);

  const getWalletTran = async () => {
    try {
      const [walletRes, walletTransRes] = await Promise.allSettled([
        productService.getWallet(),
        productService.getWalletTrans(),
      ])

      if (walletRes.status === 'fulfilled') {
        if (walletRes.value.data.account_no) {
          setHasWallet(true);
          setWallet(walletRes.value.data);
        } else {
          setHasWallet(false);
          setWallet(null);
        }
      } else {
        console.error('Wallet fetch failed:', walletRes.reason);
      }

      if (walletTransRes.status === 'fulfilled') {
        setWalletTrans(walletTransRes.value.data.reverse());
      } else {
        console.error('Wallet fetch failed:', walletTransRes.reason);
      }

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getWalletTran();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div>
          <HomeSkeleton />
        </div> // You can replace this with a skeleton component if needed
      ) : hasWallet ? (
        <WalletAccount wallet={wallet} walletTrans={walletTrans} />
      ) : (
        <WalletCreation />
      )}
    </div>
  );
}
