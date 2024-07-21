import { Box1, Shop } from 'iconsax-react';

export default function SelectLocation() {
  return (
    <div className='h-[355px] w-full rounded-[20px] bg-[#f4f4f4] px-6'>
      <h2 className='py-5 text-center text-xs text-black'>
        Select your Location
      </h2>
      <div>
        <select
          name=''
          id=''
          className='h-[60px] w-full rounded-[10px] border border-[#E4E7EC] px-2'
        >
          <option value=''>Lekki Ajah, Lagos</option>
          <option value=''>Lekki Ajah, Lagos</option>
          <option value=''>Lekki Ajah, Lagos</option>
        </select>
        <div className='mt-5 h-[200px] w-full'>
          <div className='mb-2 flex h-[92px] w-full gap-3 px-2'>
            <div className='flex w-[36px] '>
              <div className='flex h-[36px] w-[36px] items-center justify-center rounded-[5px] border border-[#DCDCDC]'>
                <Shop size='16' color='#292D32' variant='Bulk' />
              </div>
            </div>
            <div className='flex w-[80%] flex-col'>
              <h2 className='font-clashmd text-sm text-black'>
                Pickup Station
              </h2>

              <p className='my-1 text-xs text-black'>Delivery Fees ₦ 0</p>
              <p className='text-xs text-black'>
                Available for pickup now. Order within the next 24hrs to secure
                your item.
              </p>
            </div>
          </div>
          <div className='flex h-[92px] w-full gap-3 px-2'>
            <div className='flex w-[36px] '>
              <div className='flex h-[36px] w-[36px] items-center justify-center rounded-[5px] border border-[#DCDCDC]'>
                <Box1 size='16' color='#292D32' variant='Bulk' />
              </div>
            </div>
            <div className='flex w-[80%] flex-col'>
              <h2 className='font-clashmd text-sm text-black'>Door Delivery</h2>

              <p className='my-1 text-xs text-black'>Delivery Fees ₦ 250</p>
              <p className='text-xs text-black'>
                Arriving at pickup station between 27 June & 28 June when you
                order within next 3hrs 51mins
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
