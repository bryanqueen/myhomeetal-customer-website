'use client';

interface WalletTrans {
  _id: string;
  amount: number;
  type: string;
  date: string;
}

interface WalletAccountProps {
  walletTrans: WalletTrans[];
}

const RecentTransactions: React.FC<WalletAccountProps> = ({ walletTrans }) => {
  function formatDate(dateString) {
    const date = new Date(dateString);

    // Extract the day, month, and year
    const day = date.getUTCDate();
    const month = date.toLocaleString('default', { month: 'short' });
    const year = date.getUTCFullYear();

    // Function to get the ordinal suffix for the day
    function getOrdinalSuffix(day) {
      if (day > 3 && day < 21) return 'th';
      switch (day % 10) {
        case 1: return 'st';
        case 2: return 'nd';
        case 3: return 'rd';
        default: return 'th';
      }
    }

    // Combine the parts into the desired format
    return `${day}${getOrdinalSuffix(day)} ${month} ${year}`;
  }

  return (
    <div>
      <p className='mb-3 text-center font-clashmd text-xs text-black lg:text-start lg:text-base lg:text-myGray'>
        Recent transactions
      </p>
      <div className='lg:hidden'>
        {walletTrans.length > 0 ? (
          <div className='grid max-w-full gap-5 px-3'>
            {walletTrans.map((tran, i) => (
              <div
                key={i}
                className='flex justify-between gap-3 rounded-[10px] border border-[#F4F4F4] p-5'
              >
                <p className='max-w-[206px] text-xs text-black'>
                  {tran._id}
                </p>
                <div className='grid min-w-fit justify-items-end'>
                  <span className='font-clashmd text-xs text-[#B22222]'>
                    {tran.amount}
                  </span>
                  <span className='text-[10px] text-black'>{formatDate(tran.date)}</span>
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
        {walletTrans.length > 0 ? (
          <div className='max-w-full'>
            {walletTrans.map((tran, i) => (
              <div key={i} className='flex justify-between gap-3 py-4'>
                <p className='max-w-[475px] text-base text-myGray'>
                  {tran._id}
                </p>
                <div className='grid min-w-fit justify-items-end'>
                  <span className='font-clashmd text-xl text-[#B22222]'>
                    {tran.amount}
                  </span>
                  <span className='text-sm text-[#989898]'>{formatDate(tran.date)}</span>
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
