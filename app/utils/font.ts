// font.ts
import { Nunito, Montserrat, Bricolage_Grotesque } from 'next/font/google';

export const nunito = Nunito({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const montserrat = Montserrat({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export const bricolage = Bricolage_Grotesque({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
});
