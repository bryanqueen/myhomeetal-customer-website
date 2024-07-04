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
      <p className='mb-5 text-gray-600'>Items in cart: {items.length}</p>
      {items.map((item) => (
        <div key={item.id} className='flex gap-3 rounded-lg bg-gray-50 mb-2 p-3'>
          <Image src={item?.images[0]} width={57} height={61} alt='product image' className='rounded-2xl object-contain' />
          <div className='grid'>
            <span className='text-xs text-gray-500 line-clamp-2'>{item.productTitle}</span>
            <span>Price: {item.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavCart;
