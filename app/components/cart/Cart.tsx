'use client';

import { useCart } from 'react-use-cart';
import CartItem from './CartItem';
import MobileCartItem from './MobileCartItem';
import ClientOnly from '../ClientOnly';

function Cart() {
  const { items } = useCart();

  return (
    <div>
      <ClientOnly>
        <div className='lg:max-w-4xl lg:rounded-2xl lg:border lg:border-[#F4F4F4] lg:p-3'>
          <div className='hidden lg:block'>
            {items?.map((item, index) => (
              <div key={item?._id}>
                <CartItem item={item} isLast={index === items?.length - 1} />
              </div>
            ))}
          </div>
          <div className='grid gap-5 lg:hidden'>
            {items?.map((item) => (
              <div key={item?._id}>
                <MobileCartItem item={item} />
              </div>
            ))}
          </div>
        </div>
      </ClientOnly>
    </div>
  );
}

export default Cart;
