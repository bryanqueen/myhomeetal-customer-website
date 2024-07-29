'use client';

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

interface WalletAccountProps {
  wallet: Wallet;
}

const RecentTransactions: React.FC<WalletAccountProps> = ({ wallet }) => {
  return (
    <div>
      <p className='mb-3 text-center font-clashmd text-xs text-black lg:text-start lg:text-base lg:text-myGray'>
        Recent transactions
      </p>
      <div className='lg:hidden'>
        {wallet.transactions.length > 0 ? (
          <div className='grid max-w-full gap-5 px-3'>
            {[0, 0, 0, 0, 0, 0].map((V, i) => (
              <div
                key={i}
                className='flex justify-between gap-3 rounded-[10px] border border-[#F4F4F4] p-5'
              >
                <p className='max-w-[206px] text-xs text-black'>
                  Samsung Galaxy A14 6.6 4GB RAM/64GB ROM Android 13 - Light
                  Green
                </p>
                <div className='grid min-w-fit justify-items-end'>
                  <span className='font-clashmd text-xs text-[#B22222]'>
                    -₦ 3,850
                  </span>
                  <span className='text-[10px] text-black'>15th Nov 2023</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex min-h-[200px] items-center justify-center'>
            <p className='text-xs'>No New transactions</p>
          </div>
        )}
      </div>
      <div className='no-scrollbar hidden h-full max-h-[427px] w-full overflow-scroll rounded-2xl border border-[#F4F4F4] px-5 py-6 lg:block'>
        <div className='mb-3 flex w-full items-center justify-between'>
          <p className='font-clashmd text-base text-myGray'>Items</p>
          <p className='font-clashmd text-base text-myGray'>Amount</p>
        </div>
        {wallet.transactions.length > 0 ? (
          <div className='max-w-full'>
            {[0, 0, 0, 0, 0, 0].map((V, i) => (
              <div key={i} className='flex justify-between gap-3 py-4'>
                <p className='max-w-[475px] text-base text-myGray'>
                  Samsung Galaxy A14 6.6 4GB RAM/64GB ROM Android 13 - Light
                  Green
                </p>
                <div className='grid min-w-fit justify-items-end'>
                  <span className='font-clashmd text-xl text-[#B22222]'>
                    -₦ 3,850
                  </span>
                  <span className='text-sm text-[#989898]'>15th Nov 2023</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className='flex min-h-[300px] items-center justify-center'>
            <p className='font-clashmd text-base'>No New transactions</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentTransactions;
