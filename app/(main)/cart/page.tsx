import Link from 'next/link';
import { ArrowLeft } from 'iconsax-react';

import Category from '@components/category/CategoryGrid';
import Cart from '@/app/components/cart/Cart';
import CartSummary from '@/app/components/cart/CartSummary';

export default function CartPage() {
  return (
    <main>
      <div className='px-5 lg:px-10'>
        <Link href='/' className='flex'>
          <ArrowLeft />
          Back
        </Link>
      </div>
      <div className='px-5 lg:px-10'>
        <h1 className='my-5 text-2xl font-bold'>Shopping Cart</h1>
        <div className='grid items-start gap-5 lg:grid-cols-[2fr_1fr]'>
          <Cart />
          <CartSummary />
        </div>
      </div>
      <div className='lg:mx-5'>
        <Category title='Similar products' />
        <Category title='Others you might be interested in' />
      </div>
    </main>
  );
}
