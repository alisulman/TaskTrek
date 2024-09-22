import React from "react";
import { FaCircle } from "react-icons/fa"
import { ListModelFullType} from "@/Type/type";

export default function Accordion(
    { list }: { list: ListModelFullType }
) {

    return (
        <>
            <div className="flex items-center gap-3" >
                <FaCircle className="size-2.5" style={{ color: list.color }} />
                <span
                    className="text-base capitalize"
                >{list.listName}
                </span>
            </div>
            <span className="text-xs text-center w-7 h-fit bg-info text-info-content rounded-full">
                {list.todos}
            </span>
        </>
    )
}