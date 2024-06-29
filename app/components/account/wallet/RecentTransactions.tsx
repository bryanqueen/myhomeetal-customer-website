const RecentTransactions = () => {
  return (
    <div className='rounded-xl border px-3'>
      <div className='flex justify-between py-3 font-medium'>
        <span>Items</span>
        <span>Amount</span>
      </div>
      <div>
        {[0, 0, 0, 0].map((V, i) => (
          <div key={i} className='flex justify-between gap-3 border-b py-4'>
            <p className='text-sm'>
              Samsung Galaxy A14 6.6 4GB RAM/64GB ROM Android 13 - Light Green
            </p>
            <div className='grid min-w-fit justify-items-end'>
              <span className='text-lg text-red-700'>-₦ 3,850</span>
              <span className='text-xs text-gray-500'>15th Nov 2023</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTransactions;
