import Link from 'next/link';
import Category from '@components/category/CategoryGrid';
import Cart from '@/app/components/cart/Cart';
import CartSummary from '@/app/components/cart/CartSummary';
import { ArrowLeftIcon } from '@heroicons/react/16/solid';

export default function CartPage() {
  return (
    <main>
      <div className='px-5 lg:px-[3%]'>
        <Link href='/' className='flex items-center text-sm text-myGray'>
          <ArrowLeftIcon width={17} className='mr-1 mt-[-3px]' />
          Back
        </Link>
      </div>
      <div className='px-5 lg:px-[3%]'>
        <h1 className='my-5 text-3xl font-bold'>Shopping Cart</h1>
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
