import { Metadata } from 'next';
import { Suspense } from 'react';

import PurchasingHistory from '@components/account/PurchasingHistory';

export const metadata: Metadata = {
  title: 'Purchasing History | Myhomeetal',
};

export interface PageProps {
  params?: any;
  searchParams: {
    tab: string;
  };
}

export default function PurchasingHistoryPage({ searchParams }: PageProps) {
  return (
    <main>
      <Suspense>
        <PurchasingHistory searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
