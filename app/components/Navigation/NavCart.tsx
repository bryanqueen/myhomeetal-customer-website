import Image from 'next/image';
import { useCart } from 'react-use-cart';

const NavCart = () => {
  const { isEmpty, items } = useCart();

  if (isEmpty)
    return (
      <div className='py-3'>
        <p>Your cart is empty</p>
      </div>
    );

  return (
    <div className='rounded-md border-gray-100 lg:max-w-4xl'>
      <p className='mb-7 text-[#656565] text-sm'>Items in cart: {items.length}</p>
      <div className='no-scrollbar max-h-[250px] w-full overflow-scroll'>
        {items.map((item) => (
          <div
            key={item.id}
            className='mb-2 flex w-[211px] h-[76px] items-center gap-2 rounded-lg bg-[#f4f4f4] p-2'
          >
            <Image
              src={item?.images[0]}
              width={57}
              height={61}
              alt='product image'
              className='h-[61px] rounded-lg object-contain'
            />
            <div className='w-[120px] h-[61px] py-1 flex flex-col justify-between'>
              <p className='line-clamp-2 text-sm text-[#656565]'>
                {item.productTitle}
              </p>
              <p className='text-[#656565]'>Price: <span className='font-clashmd'>{item.price}</span></p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavCart;
