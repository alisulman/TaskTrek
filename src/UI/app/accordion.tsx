import { setActiveSet } from "@/redux/slice/slice.app";
import { AppDispatch } from "@/redux/store";
import React from "react";
import { useDispatch } from "react-redux";
import { FaCircle } from "react-icons/fa"
import { ListModelFullType } from "@/Type/type";

export default function Accordion(
    { list }: { list: ListModelFullType }
) {
    const dispatch = useDispatch<AppDispatch>()
    const handleClick = (name: string) => {
        dispatch(setActiveSet(name))
    }

    return (
        <>
            <div className="flex items-center gap-3">
                <FaCircle className="size-2.5" style={{ color: list.color }} />
                <span
                    className="text-base capitalize"
                    onClick={() => handleClick(list.listName)}
                >{list.listName}
                </span>
            </div>
            <span className="text-xs text-center w-7 h-fit bg-info text-info-content rounded-full">
                {list.todos}
            </span>
        </>
    )
}