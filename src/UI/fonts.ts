import { Poppins, Protest_Guerrilla } from "next/font/google";

export const PG = Protest_Guerrilla({
    subsets: ["latin"],
    weight: "400",
});

export const poppins = Poppins({
    subsets: ["latin"],
    weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
    preload: true
})