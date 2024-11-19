import type { Metadata } from 'next';
import './globals.css';
import '../public/ClashDisplay_Complete/ClashDisplay_Complete/ClashDisplay_Complete/Fonts/WEB/css/clash-display.css';
import { Toaster } from 'react-hot-toast';
import { RegionProvider } from './RegionProvider';
import { UIProvider } from './providers';
import { PopupProvider } from './PopupProvider';
import { AddressBookProvider } from './addressBookProvider';
import { CartProvider } from './CartProvider';

export const metadata: Metadata = {
  title: 'MYHOMEETAL - Your one stop shop',
  description:
    'Welcome to MyHomeEtAl - Your one-stop online shop for everything you need. Shop our extensive range of products, including the latest tech, luxury skincare, and home decor. Enjoy unbeatable prices, high-quality products, and exceptional customer service. Transform your space and indulge yourself with MyHomeEtAl.',
     // Add Google verification meta tag
  other: {
    'google-site-verification': 'xY6atIcfgkBRJeb0a4RqeJCghSo1oxL93JS1eV8GxKk',
    // 'algolia-site-verification' : '3354A70611F0C153'
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className='font-clash'>
        <AddressBookProvider>
          <PopupProvider>
            <RegionProvider>
              <UIProvider>
                <CartProvider>
                  {children}
                </CartProvider>
              </UIProvider>
            </RegionProvider>
          </PopupProvider>
        </AddressBookProvider>
        <Toaster />
      </body>
    </html>
  );
}
