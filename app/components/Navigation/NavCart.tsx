import { useRegion } from '@/app/RegionProvider';
import Image from 'next/image';
import { useCart } from 'react-use-cart';
import ProductPrice from '../product/ProductPrice';

const NavCart = () => {
  const { isEmpty, items } = useCart();
  const { region } = useRegion();

  if (isEmpty)
    return (
      <div className='py-3'>
        <p>Your cart is empty</p>
      </div>
    );

  return (
    <div className='rounded-md border-gray-100 lg:max-w-4xl'>
      <p className='mb-7 text-sm text-[#656565]'>
        Items in cart: {items.length}
      </p>
      <div className='no-scrollbar max-h-[250px] w-full overflow-scroll'>
        {items.map((item) => (
          <div
            key={item.id}
            className='mb-2 flex h-[76px] w-[211px] items-center gap-2 rounded-lg bg-[#f4f4f4] p-2'
          >
            <Image
              src={item?.images[0]}
              width={57}
              height={61}
              alt='product image'
              className='h-[61px] rounded-lg object-contain'
            />
            <div className='flex h-[61px] w-[120px] flex-col justify-between py-1'>
              <p className='line-clamp-2 text-sm text-[#656565]'>
                {item.productTitle}
              </p>
              <p className='text-[#656565] flex gap-1 items-center'>
                Price:{' '}
                <span>
                  <ProductPrice
                    priceInNGN={item.price}
                    region={region}
                    className='font-clashmd text-sm text-[#656565]'
                  />
                </span>
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavCart;
