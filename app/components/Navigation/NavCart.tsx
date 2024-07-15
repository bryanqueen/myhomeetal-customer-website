import { useRegion } from '@/app/RegionProvider';
import Image from 'next/image';
import { useCart } from 'react-use-cart';
import ProductPrice from '../product/ProductPrice';

const NavCart = () => {
  const { isEmpty, items } = useCart();
  const { region } = useRegion();

  if (isEmpty)
    return (
      <div className='py-3 text-center text-xs text-[#656565] lg:mb-7 lg:text-sm'>
        <p>Your cart is empty</p>
      </div>
    );

  return (
    <div className='rounded-md border-gray-100 px-[27px] lg:max-w-4xl lg:px-0'>
      <p className='mb-6 text-center text-xs text-[#656565] lg:mb-7 lg:text-start lg:text-sm'>
        Items in cart: <span className='font-clashmd'>{items.length}</span>
      </p>
      <div className='no-scrollbar max-h-[230px] w-full overflow-scroll lg:max-h-[250px]'>
        {items.map((item) => (
          <div
            key={item.id}
            className='mb-2 flex h-[70px] w-full items-center gap-4 rounded-lg bg-[#f4f4f4] p-2 lg:h-[76px] lg:w-[211px] lg:gap-3'
          >
            <Image
              src={item?.images[0]}
              width={57}
              height={61}
              alt='product image'
              className='h-[58px] rounded-lg object-contain lg:h-[61px]'
            />
            <div className='flex h-[61px] w-[120px] flex-col justify-between py-1'>
              <p className='line-clamp-2 text-xs text-[#656565] lg:text-sm lg:leading-[15px]'>
                {item.productTitle}
              </p>
              <p className='flex items-center gap-1 text-xs text-[#656565] lg:text-base'>
                Price:{' '}
                <span>
                  <ProductPrice
                    priceInNGN={item.price}
                    region={region}
                    className='font-clashmd text-xs text-[#656565] lg:text-sm'
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
