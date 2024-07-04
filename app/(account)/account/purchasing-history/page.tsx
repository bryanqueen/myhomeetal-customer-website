import { Metadata } from 'next';
import { Suspense } from 'react';

import PurchasingHistory from '@components/account/PurchasingHistory';
import { PageProps } from '@/app/utils/types';

export const metadata: Metadata = {
  title: 'Purchasing History | Myhomeetal',
};



export default function PurchasingHistoryPage({ searchParams }: PageProps) {
  return (
    <main>
      <Suspense>
        <PurchasingHistory searchParams={searchParams} />
      </Suspense>
    </main>
  );
}
