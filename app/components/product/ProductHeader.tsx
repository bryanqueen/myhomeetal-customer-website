'use client';

import Image from 'next/image';
import { useRef, useEffect, useState } from 'react';

import QuantityInput from '@components/cart/QuantityInput';
// import Button from '@components/Button';
import AddToCartButton from '@components/cart/AddToCartButton';

const ProductHeader = ({ data }: any) => {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isStuck, setStuck] = useState(false);

  useEffect(() => {
    const el = ref.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setStuck(entry.intersectionRatio < 1);
        entry.target.classList.toggle('is-pinned', entry.intersectionRatio < 1);
      },
      { threshold: [1] }
    );

    if (el) observer.observe(el);

    return () => observer.disconnect();
  }, [ref]);

  return (
    <div
      ref={ref}
      className={`pointer-events-none sticky -top-1 z-[200] hidden opacity-0 transition-[opacity] lg:block`}
    >
      <div
        className={`flex items-center justify-between overflow-hidden bg-white px-5 pb-3 pt-20  ${isStuck ? 'pointer-events-auto' : 'pointer-events-none'}`}
      >
        <div className='flex items-center gap-4'>
          <Image src={data.image} width={45} height={45} alt='' />
          <p className='font-bold'>{data.title}</p>
        </div>
        <div className='flex gap-5'>
          <div className='flex items-center gap-2'>
            Quantity
            <QuantityInput />
          </div>
          <AddToCartButton item={data} />
        </div>
      </div>
    </div>
  );
};

export default ProductHeader;
