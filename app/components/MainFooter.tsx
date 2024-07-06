import Link from 'next/link';
import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

import Logo from './Logo';

interface Content {
  title: string;
  items: string[];
}

const contents: Content[] = [
  {
    title: 'INFORMATION',
    items: [
      'About Us',
      'About Zip',
      'Privacy Policy',
      'Search',
      'Terms',
      'Orders and Returns',
      'Contact Us',
      'Advanced Search',
      'Newsletter Subscription',
    ],
  },
  {
    title: 'HELP & LINKS',
    items: [
      'Chat with us',
      'Help Center',
      'Contact Us',
      'Service Center',
      'How to shop on Myhomeetal?',
      'Delivery options and timelines',
      'How to return a product on Myhomeetal?',
      'Corporate and bulk purchases',
      'Report a Product',
      'Dispute Resolution Policy',
      'Returns & Refund Timeline',
      'Return Policy',
    ],
  },
  {
    title: 'PC PARTS',
    items: [
      'CPUs',
      'Add On Cards',
      'Hard Drives (Internal)',
      'Graphic Cards',
      'Keyboards / Mice',
      'Cases / Power Supplies / Cooling',
      'RAM (Memory)',
      'Software',
      'Speakers / Headsets',
      'Motherboards',
    ],
  },
  {
    title: 'PC PARTS',
    items: [
      'Everyday Use Notebooks',
      'MSI Workstation Series',
      'MSI Prestige Series',
      'Tablets and Pads',
      'Netbooks',
      'Infinity Gaming Notebooks',
    ],
  },
];

const MainFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <div className='bg-white'>
      <footer className='flex flex-wrap justify-center px-[3%] py-10 pt-16'>
        <div className='basis-[10%]'>
          <Link href='/'>
            <Logo variant={3} />
          </Link>
        </div>
        <div className='flex flex-wrap'>
          {contents.map((content, index) => (
            <div key={index} className='w-1/2 px-4 md:w-1/5'>
              <p className='mb-4 text-sm font-bold text-black/50'>
                {content.title}
              </p>
              <ul>
                {content.items.map((item, itemIndex) => (
                  <li key={itemIndex} className='mb-2 text-[13px] text-black'>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </footer>
      <div className='px-[3%] pb-5'>
        <p className='mb-3 text-sm font-bold text-black/50'>JOIN US</p>
        <div className='flex space-x-4'>
          <a href='#' aria-label='Facebook'>
            <FaFacebook />
          </a>
          <a href='#' aria-label='Instagram'>
            <FaInstagram />
          </a>
          <a href='#' aria-label='YouTube'>
            <FaYoutube />
          </a>
          <a href='#' aria-label='X'>
            <FaXTwitter />
          </a>
        </div>
      </div>

      <div className='px-[3%] py-4'>
        <div className='flex items-center justify-between'>
          <div className='text-xs'>
            &copy; {currentYear} - MyHomeetal | All Rights Reserved
          </div>
          <div className='flex space-x-4'>
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
    </div>
  );
};

export default MainFooter;
