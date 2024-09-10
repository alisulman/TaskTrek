"use client"
import Store from "@/redux/store";
import LeftNavbar from "@/UI/app/leftNavbar";
import Navbar from "@/UI/app/navbar";
import { poppins } from "@/UI/fonts";
import React from "react";
import { Provider } from "react-redux";

export default function Layout(
    { children }: { children: React.ReactNode }
) {
    return (
        <Provider store={Store}>
            <header className={`${poppins.className} antialiased md:flex`}>
                <Navbar className="md:hidden" />
                <LeftNavbar />
                <div>{children}</div>
            </header>
        </Provider>
    )
}