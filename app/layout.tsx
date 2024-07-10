import type { Metadata } from 'next';
import './globals.css';
import "../public/ClashDisplay_Complete/ClashDisplay_Complete/ClashDisplay_Complete/Fonts/WEB/css/clash-display.css";
import { Toaster } from 'react-hot-toast';
import { RegionProvider } from './RegionProvider';
import { UIProvider } from './providers';

export const metadata: Metadata = {
  title: 'MYHOMEETAL - Your one stop shop',
  description:
    'Welcome to MyHomeEtAl - Your one-stop online shop for everything you need. Shop our extensive range of products, including the latest tech, luxury skincare, and home decor. Enjoy unbeatable prices, high-quality products, and exceptional customer service. Transform your space and indulge yourself with MyHomeEtAl.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className='font-clash'>
        <RegionProvider>
          <UIProvider>
            {children}
          </UIProvider>
        </RegionProvider>
        <Toaster />
      </body>
    </html>
  );
}
