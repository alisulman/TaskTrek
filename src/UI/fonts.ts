import { Poppins, Protest_Guerrilla } from "next/font/google";
import localFont from "next/font/local";

export const PG = localFont({
    src: "../app/fonts/ProtestGuerrilla-Regular.ttf",
    weight: "100 900",
});

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true
})

export const geistSans = localFont({
    src: "../app/fonts/GeistVF.woff",
    weight: "100 900",
});
export const geistMono = localFont({
    src: "../app/fonts/GeistMonoVF.woff",
    weight: "100 900"
});