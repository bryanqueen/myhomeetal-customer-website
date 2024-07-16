import ReferralDashBoard from '@/app/components/account/ReferralDashBoard';
import ReferralEarningDashboard from '@/app/components/account/ReferralEarningDashboard';
import ReferralTable from '@/app/components/account/ReferralTable';
import React from 'react';

export default function ReferralPage() {
  return (
    <main>
      <section>
        <ReferralDashBoard />
      </section>
      <section>
        <ReferralEarningDashboard />
      </section>
      <section>
        <ReferralTable />
      </section>
    </main>
  );
}
