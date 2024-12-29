'use client';
import Link from 'next/link';
import React from 'react';
import {
  FaFacebook,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6';

import Logo from './Logo';
import Newsletter from './Newsletter';

interface Item {
  title: string;
  link: string;
}

interface Content {
  title: string;
  items: Item[];
}

const contents: Content[] = [
  {
    title: 'User Information',
    items: [
      {
        title: 'About Us',
        link: '/about',
      },
      {
        title: 'FAQs',
        link: '/faqs',
      },
      {
        title: 'Meet the Devs',
        link: '/meet-the-devs',
      },
      {
        title: 'Newsletter Signup',
        link: '#newsletter',
      },
      {
        title: 'Returns and Refunds',
        link: '/help-center',
      },
      {
        title: 'Shipping & Delivery',
        link: '/help-center',
      },
      {
        title: 'Store Locator',
        link: '/experience-center',
      },
      {
        title: 'Privacy Policy',
        link: '/privacy-policy',
      },
    ],
  },
  {
    title: 'Help & Support',
    items: [
      {
        title: 'Chat with us',
        link: '/help-center',
      },
      {
        title: 'Help Center',
        link: '/help-center',
      },
      {
        title: 'Contact Us',
        link: '/contact',
      },
    ],
  },
  {
    title: 'Useful Links',
    items: [
      {
        title: 'How to shop on Myhomeetal?',
        link: '/help-center',
      },
      {
        title: 'Myhomeetal?',
        link: '/help-center',
      },
      {
        title: 'Corporate and bulk purchases',
        link: '/help-center',
      },
      {
        title: 'Report a Product',
        link: '/help-center',
      },
      {
        title: 'Dispute Resolution Policy',
        link: '/help-center',
      },
      {
        title: 'Returns & Refund Timeline',
        link: '/help-center',
      },
    ],
  },
  {
    title: 'Partners & Shops',
    items: [
      {
        title: 'Anker',
        link: '/shop',
      },
      {
        title: 'Hisense',
        link: '/shop',
      },
      {
        title: 'Lontor',
        link: '/shop',
      },
      {
        title: 'Samsung',
        link: '/shop',
      },
      {
        title: 'Hewellet Packard',
        link: '/shop',
      },
      {
        title: 'See All',
        link: '/shop',
      },
    ],
  },
  {
    title: 'Blog & Articles',
    items: [
      {
        title: 'Everyday Use Notebooks',
        link: '/blog/Everyday Use Notebooks',
      },
      {
        title: 'Revolutionizing Online Shopping',
        link: '/blog/Revolutionizing Online Shopping',
      },
      {
        title: 'The Rise of Myhomeetal',
        link: '/blog/The Rise of Myhomeetal',
      },
      {
        title: "Exploring Myhomeetal's Impact ",
        link: "/blog/Exploring Myhomeetal's Impact",
      },
      {
        title: "MyHomeEtal's Vision for E-commerce",
        link: "/blog/MyHomeEtal's Vision for E-commerce",
      },
      {
        title: 'Why MyHomeetal is the Next Big Thing',
        link: '/blog/Why MyHomeetal is the Next Big Thing',
      },
    ],
  },
];

const MainFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();
  const handleScroll = (event, targetId) => {
    event.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div id='newsletter' className='bg-black px-[3%] py-6 lg:py-10 lg:pb-8'>
      <div>
        <Newsletter />
      </div>

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
                    <li className='mb-2 text-sm hover:text-primary' key={i}>
                      {item.title === "Newsletter Signup" ? (
                        <a href="#newsletter" onClick={(e) => handleScroll(e, "newsletter")}>
                          {item.title}
                        </a>
                      ) : (
                        <Link href={item.link}>{item.title}</Link>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className='mx-auto mt-20 w-fit'>
          <p className='mb-3 text-center font-clashmd text-xs text-black/50 lg:text-sm'>
            FOLLOW US
          </p>
          <div className='flex space-x-4'>
            <a href='#' aria-label='Facebook'>
              <FaFacebook size={20} />
            </a>
            <a href='https://www.instagram.com/myhomeetal?igsh=MTJmaGh4OHBvaHdOaw=='
             target='_blank'
              rel='noopener noreferrer' aria-label='Instagram'>
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
              <Link href='/privacyPolicy' className='text-xs hover:text-primary'>
                Privacy Policy
              </Link>
              <Link href='/termsOfUse' className='text-xs hover:text-primary'>
                Term Of Use
              </Link>
              <p className='text-xs hover:text-primary'>
                Cookie Settings
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MainFooter;
