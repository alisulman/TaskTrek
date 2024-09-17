import { setActiveSet } from "@/redux/slice/slice.app";
import { AppDispatch } from "@/redux/store";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { FaCircle } from "react-icons/fa"
import { ListModelFullType } from "@/Type/type";
import clsx from "clsx";

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

const AccordionComponent = ({ value }) => {
    const [checkedValues, setCheckedValues] = useState<string[]>([]);
    const handleCheck = (value: string) => {
        setCheckedValues((prev) => {
            if (prev.includes(value)) {
                return prev.filter((v) => v !== value);
            } else {
                return [value];
            }
        });
    };
    return (
        <>
            <input
                type="checkbox"
                value={value}
                className="hidden"
            />
            <div className={clsx("bg-base-200 w-full h-20 cursor-pointer rounded-lg", {
                "h-40": checkedValues.includes(value)
            })} onClick={() => handleCheck(value)}></div>
        </>
    )
}

export const AccordionTodo = () => {
    return (
        <></>
    )
}