'use client'
import Link from 'next/link';
import React from 'react';
import Intercom from '@intercom/messenger-js-sdk';
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

import Logo from './Logo';
import Newsletter from './Newsletter';

interface Content {
  title: string;
  items: string[];
}

const contents: Content[] = [
  {
    title: 'User Information',
    items: [
      'About Us',
      'FAQs',
      'Contact Us',
      'Newsletter Signup',
      'Returns and Refunds',
      'Shipping & Delivery',
      'Store Locator',
      'Privacy Policy',
    ],
  },
  {
    title: 'Help & Support',
    items: [' Chat with us', 'Help Center', 'Contact Us', 'Newsletter Signup'],
  },
  {
    title: 'Useful Links',
    items: [
      'Experience Center',
      ' How to shop on Myhomeetal?',
      'Myhomeetal?',
      'Corporate and bulk purchases',
      'Report a Product',
      'Dispute Resolution Policy',
      'Returns & Refund Timeline',
    ],
  },
  {
    title: 'Partners & Shops',
    items: [
      'Anker',
      'Apple',
      'Hisense',
      'Lontor',
      'Samsung',
      'Hewellet Packard',
      'See All',
    ],
  },
  {
    title: 'Blog & Articles',
    items: [
      'Everyday Use Notebooks',
      'Apple',
      'Hisense',
      'Lontor',
      'Samsung',
      'Hewellet Packard',
      'See All',
    ],
  },
];

const MainFooter: React.FC = () => {
  Intercom({
    app_id: 'l4tx2a9y',
  });
  const currentYear = new Date().getFullYear();

  return (
    <div className='bg-black px-[3%] py-6 lg:py-10 lg:pb-8'>
      <Newsletter />
      <footer className='mt-6 bg-white px-[3%] py-10'>
        <div className='flex flex-col lg:flex-row'>
          <div className='flex basis-[10%] items-center justify-center lg:block'>
            <Link href='/'>
              <Logo variant={4} />
            </Link>
          </div>
          <div className='grid max-h-fit max-w-[992.3px] grid-cols-2 gap-5 px-[2%] pt-10 lg:grid-cols-5 lg:px-0'>
            {contents.map((content) => (
              <div key={content.title}>
                <h2 className='font-clashmd text-sm text-[#989898]'>
                  {content.title}
                </h2>
                <ul className='mt-3'>
                  {content.items.map((item, i) => (
                    <li className='mb-1 text-sm' key={i}>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className='mx-auto mt-20 w-fit'>
          <p className='mb-3 text-center font-clashmd text-xs text-black/50 lg:text-sm'>
            JOIN US
          </p>
          <div className='flex space-x-4'>
            <a href='#' aria-label='Facebook'>
              <FaFacebook size={20} />
            </a>
            <a href='#' aria-label='Instagram'>
              <FaInstagram size={20} />
            </a>
            <a href='#' aria-label='YouTube'>
              <FaYoutube size={20} />
            </a>
            <a href='#' aria-label='X'>
              <FaXTwitter size={20} />
            </a>
          </div>
        </div>
        <div className='mt-10'>
          <div className='flex flex-col-reverse gap-10 lg:flex-row lg:items-center lg:justify-between lg:gap-0'>
            <div className='mx-auto text-xs lg:mx-0'>
              &copy; {currentYear} - MyHomeetal | All Rights Reserved
            </div>
            <div className='mx-auto flex min-w-[296px] items-center justify-between lg:mx-0 lg:min-w-0 lg:space-x-4'>
              <Link href='#' className='text-xs'>
                Privacy Policy
              </Link>
              <Link href='#' className='text-xs'>
                Term Of Use
              </Link>
              <Link href='#' className='text-xs'>
                Cookie Settings
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainFooter;
