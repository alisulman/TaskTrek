"use client";
import { setActiveSet, setDrawerShow } from "@/redux/slice/slice.app";
import { AppDispatch, RootState } from "@/redux/store";
import { TodoModelFullType } from "@/Type/type";
import AccordionComponent from "@/UI/app/accordion.mui";
import SearchAdd from "@/UI/app/searchAdd";
import TopSection from "@/UI/app/topSection";
import { convertDateAndTime } from "@/utils/time";
import { selectClasses } from "@mui/material";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Page({ searchParams }: { searchParams?: { query?: string } }) {
    const [data, setData] = useState<TodoModelFullType[]>([])
    const [expanded, setExpanded] = React.useState<string>("");
    const [activePri, setActivePri] = React.useState<string>("high");

    const state = useSelector((state: RootState) => state.TODO)
    const stateApp = useSelector((state: RootState) => state.APP)
    const stateList = useSelector((state: RootState) => state.LIST)
    const dataTodo = state.data
    const dataList = stateList.data
    const open = stateApp.drawerShow
    const active = stateApp.activeSet
    const selectedDate = stateApp.selected
    const dispatch = useDispatch<AppDispatch>()
    const query = searchParams?.query || '';

    const handleChange = (panel: string) => {
        setExpanded(prev => (prev === panel ? "" : panel));
    };

    useEffect(() => {
        if (selectedDate !== null) {
            const filterData = dataTodo.filter(val => {
                const fullDateTime: { date: string, time: string } = convertDateAndTime(val.dateTime);
                const fullDate = fullDateTime.date.split("-");
                const dayFromData = Number(fullDate[2]);
                const isEqual = dayFromData === selectedDate;
                return isEqual;
            });

            setData(filterData);
        } else if (active === "showall") {
            const filterData = dataTodo.filter(val => !val.completed)
            setData(filterData)
        } else if (active === "completed") {
            const filterData = dataTodo.filter(val => val.completed)
            setData(filterData)
        } else if (activePri === "high" && active === "priority") {
            const filterData = dataTodo.filter(val => val.priority === "high" && !val.completed)
            setData(filterData)
        } else if (activePri === "medium" && active === "priority") {
            const filterData = dataTodo.filter(val => val.priority === "medium" && !val.completed)
            setData(filterData)
        } else if (activePri === "low" && active === "priority") {
            const filterData = dataTodo.filter(val => val.priority === "low" && !val.completed)
            setData(filterData)
        } else {
            const filterData = dataTodo.filter(val => ((typeof val.listName === "string" ? val.listName : val.listName.listName) === active) && !val.completed)
            setData(filterData)
        }
    }, [dataTodo, active, activePri])

    useEffect(() => {
        if (!open) {
            setExpanded("")
        }
    }, [open])

    useEffect(() => {
        if(query !== ''){
            dispatch(setActiveSet('search'))
            const regx = new RegExp(query, 'i')
            const filterData = dataTodo.filter(val => {
                return regx.test(val.title)
            })
            setData(filterData)
        }
    }, [query])

    return (
        <div className="md:w-[55vw] md:h-svh">
            <TopSection />
            <SearchAdd />
            {data.length === 0 && active !== "priority" ? (
                <div className="h-[70vh] flex flex-col justify-center items-center">
                    <span className="text-sm text-slate-400">No work added yet</span>
                    <button
                        type="button"
                        className="btn btn-sm my-2"
                        onClick={() => dispatch(setDrawerShow(true))}
                    >
                        Add new todo
                    </button>
                </div>
            ) : (
                <div className="space-y-5 p-7">
                    {active === "priority" && (<div className="space-x-3">
                        <button
                            type="button"
                            className={clsx("btn btn-xs btn-primary px-6 rounded", {
                                "btn-neutral": activePri === "high"
                            })}
                            onClick={() => setActivePri("high")}
                        >
                            High
                        </button>
                        <button
                            type="button"
                            className={clsx("btn btn-xs btn-primary px-6 rounded", {
                                "btn-neutral": activePri === "medium"
                            })}
                            onClick={() => setActivePri("medium")}
                        >
                            Medium
                        </button>
                        <button
                            type="button"
                            className={clsx("btn btn-xs btn-primary px-6 rounded", {
                                "btn-neutral": activePri === "low"
                            })}
                            onClick={() => setActivePri("low")}
                        >
                            Low
                        </button>
                    </div>)}
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
            )
            }

        </div >
    );
}
