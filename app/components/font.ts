// font.ts
import { Nunito, Montserrat } from "next/font/google";

export const nunito = Nunito({ 
  weight: ["400", "700"], 
  subsets: ["latin"],
});

export const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
});
