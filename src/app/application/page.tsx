"use client";
import { AccordionTodo } from "@/UI/app/accordion";
import SearchAdd from "@/UI/app/searchAdd";
import TopSection from "@/UI/app/topSection";
import React from "react";

export default function Page() {



    return (
        <div className="md:w-[55vw] md:h-svh">
            <TopSection />
            <SearchAdd />
        </div>
    );
}
