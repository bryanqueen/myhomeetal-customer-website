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
        <div key={item.id} className='flex gap-3 rounded-lg bg-gray-50 p-3'>
          <div className='h-16 w-16 shrink-0 rounded-lg bg-gray-400' />
          <div className='grid'>
            <span className='text-xs text-gray-500'>{item.title}</span>
            <span>Price: {item.price}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NavCart;
