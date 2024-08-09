'use client';

import CartItem from './CartItem';
import MobileCartItem from './MobileCartItem';
import ClientOnly from '../ClientOnly';
import { useCart } from '@/app/CartProvider';

function Cart() {
  //const { items } = useCart();
  const { cartState } = useCart();

  return (
    <div>
      <ClientOnly>
        <div className='lg:max-w-4xl lg:rounded-2xl lg:border lg:border-[#F4F4F4] lg:p-3'>
          <div className='hidden lg:block'>
            {cartState?.items?.map((item, index) => (
              <div key={item?.product._id}>
                <CartItem item={item} isLast={index === cartState.items?.length - 1} />
              </div>
            ))}
          </div>
          
        </div>
      </ClientOnly>
    </div>
  );
}

export default Cart;
