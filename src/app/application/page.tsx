"use client";
import { RootState } from "@/redux/store";
import { TodoModelFullType } from "@/Type/type";
import AccordionComponent from "@/UI/app/accordion.mui";
import SearchAdd from "@/UI/app/searchAdd";
import TopSection from "@/UI/app/topSection";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export default function Page() {
    const [data, setData] = useState<TodoModelFullType[]>([])
    const [expanded, setExpanded] = React.useState<string>("");

    const state = useSelector((state: RootState) => state.TODO)
    const dataTodo = state.data

    const handleChange = (panel: string) => {
        setExpanded(prev => (prev === panel ? "" : panel));
    };

    useEffect(() => {
        setData(dataTodo)
    }, [dataTodo])

    return (
        <div className="md:w-[55vw] md:h-svh">
            <TopSection />
            <SearchAdd />
            <div className="space-y-5 p-7">
                {data.map((todo: TodoModelFullType, index) => (
                    <AccordionComponent
                        key={todo._id}
                        todo={todo}
                        index={index}
                        expanded={expanded}
                        handleChange={handleChange}
                    />
                ))}
            </div>
        </div>
    );
}
