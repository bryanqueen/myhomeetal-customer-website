'use client';

import Link from 'next/link';
import Marquee from 'react-fast-marquee';

interface Category {
  name: string;
  _id: string;
}

const CategoryList = ({ categories }: { categories: Category[] }) => {
  return (
    <div className='hidden items-center px-[3%] pb-5 md:flex'>
      <p className='pr-2 text-sm font-clashmd'>Categories:</p>
      <ul className='flex overflow-hidden'>
        <Marquee pauseOnHover autoFill>
          {categories?.map((category) => (
            <li
              key={category._id}
              className='p-3 text-sm text-myGray font-clash'
            >
              <Link
                href={`/category/${category.name}?categoryId=${category._id}`}
                key={category._id}
              >
                My {category.name}
              </Link>
            </li>
          ))}
        </Marquee>
      </ul>
    </div>
  );
};

export default CategoryList;
