import { Poppins, Ribeye_Marrow } from "next/font/google";
import localFont from "next/font/local";

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true
})

export const RMFont = Ribeye_Marrow({
    subsets: ["latin"],
    weight: ["400"],
    preload: true
})

export const geistSans = localFont({
    src: "../app/fonts/GeistVF.woff",
    variable: "--font-geist-sans",
    weight: "100 900",
  });
  export const geistMono = localFont({
    src: "../app/fonts/GeistMonoVF.woff",
    variable: "--font-geist-mono",
    weight: "100 900",
  });