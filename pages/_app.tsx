import type { AppProps } from 'next/app';
import '../app/globals.css';
import '../public/ClashDisplay_Complete/ClashDisplay_Complete/ClashDisplay_Complete/Fonts/WEB/css/clash-display.css';
import { Toaster } from 'react-hot-toast';
import { AddressBookProvider } from '@/app/addressBookProvider';
import { PopupProvider } from '@/app/PopupProvider';
import { RegionProvider } from '@/app/RegionProvider';
import { UIProvider } from '@/app/providers';
import { CartProvider } from '@/app/CartProvider';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AddressBookProvider>
      <PopupProvider>
        <RegionProvider>
          <UIProvider>
            <CartProvider>
              <Component {...pageProps} />
            </CartProvider>
          </UIProvider>
        </RegionProvider>
      </PopupProvider>
      <Toaster />
    </AddressBookProvider>
  );
}

export default MyApp;
