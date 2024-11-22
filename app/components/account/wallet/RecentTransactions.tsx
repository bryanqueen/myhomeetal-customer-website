'use client';

import { useRegion } from "@/app/RegionProvider";
import ProductPrice from "../../product/ProductPrice";
import { WalletAccountProps } from "@/types";
import { formatDate } from "@/app/utils/helpers";

const RecentTransactions: React.FC<WalletAccountProps> = ({ walletTrans }) => {
  const { region } = useRegion();

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
                  {tran.type === 'Purchase' ? <span>Order ID: <br />#{tran?.order}</span> : 'Funds Deposited'}
                </p>
                <div className='grid min-w-fit justify-items-end'>
                  <span className={`font-clashmd text-xs ${tran.type === 'Purchase' ? 'text-[#B22222]' : 'text-[#1B691B]'}`}>
                    {tran.type === 'Purchase' ? (
                      <>
                        - <ProductPrice priceInNGN={tran.amount} region={region} />
                      </>
                    ) : (
                      <>
                        + <ProductPrice priceInNGN={tran.amount} region={region} />
                      </>
                    )}
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
                  {tran.type === 'Purchase' ? `Order ID:#${tran?.order}` : 'Funds Deposited'}
                </p>
                <div className='grid min-w-fit justify-items-end'>
                  <span className={`font-clashmd text-xl ${tran.type === 'Purchase' ? 'text-[#B22222]' : 'text-[#1B691B]'} `}>
                    {tran.type === 'Purchase' ? (
                      <>
                        - <ProductPrice priceInNGN={tran.amount} region={region} />
                      </>
                    ) : (
                      <>
                        + <ProductPrice priceInNGN={tran.amount} region={region} />
                      </>
                    )}

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
