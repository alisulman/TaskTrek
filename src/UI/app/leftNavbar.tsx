import { useDispatch, useSelector } from "react-redux";
import Accordion from "./accordion";
import { AppDispatch, RootState } from "@/redux/store";
import clsx from "clsx";
import { PG } from "../fonts";
import InputCheck from "./inputCheck";
import { FiPlus } from "react-icons/fi";
import { RiDeleteRow } from "react-icons/ri";
import { BiSolidEditAlt } from "react-icons/bi";
import { setShowInputCheck } from "@/redux/slice/slice.app";
import { Suspense, useEffect, useState } from "react";
import { ListModelFullType } from "@/Type/type";
import { getCookie, setCookie } from "@/lib/cookies";
import { fetchLists } from "@/redux/action/action.list";

const OneLefter = () => {

    const stateApp = useSelector((state: RootState) => state.APP)
    const stateList = useSelector((state: RootState) => state.LIST)
    const active = stateApp.activeSet
    const data = stateList.data
    const dispatch = useDispatch<AppDispatch>()

    useEffect(() => {
        const runCookie = getCookie("Run");
        if (runCookie === true || runCookie === false) {
            dispatch(fetchLists())
        } else {
            setCookie("Run", true, 30, "/application")
            dispatch(fetchLists())
        }
    }, [])
    return (
        <div className={`navbar-start bg-primary-content w-full rounded-xl`}>
            {data.length === 0 ? (
                <div className="space-y-3 p-4">
                    <Skeleton amount={5} />
                </div>
            ) : (
                <ul className={`md:h-[17rem] scrollbar space-y-3 p-4 ${data.length >= 5 && "overflow-y-auto"}`}>
                    {data.map((data: ListModelFullType) => (
                        <li
                            key={data._id}
                            className={clsx("flex justify-between items-center hover:bg-[#2b251e] active:bg-neutral rounded-lg px-4 py-2 cursor-pointer", {
                                "bg-neutral text-neutral-content": active === data.listName,
                            })}
                        >
                            <Accordion list={data} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    )
}
const Skeleton = (
    { amount }: { amount: number }
) => {
    return (
        <>
            {
                Array.from({ length: amount }, (_, index) => (
                    <div key={index} className="flex justify-between items-center px-4 py-2">
                        <div className="flex items-center gap-3">
                            <span className="skeleton size-2.5"></span>
                            <span className="skeleton w-28 h-2.5 "></span>
                        </div>
                        <span className="skeleton w-7 h-4"></span>
                    </div>
                ))
            }
        </>
    )
}
export default function LeftNavbar() {
    const [typeComp, setTypeComp] = useState<string>("add")
    const [showDrop, setShowDrop] = useState<boolean>(false)

    const stateApp = useSelector((state: RootState) => state.APP)
    const stateList = useSelector((state: RootState) => state.LIST)
    const showInputCheck = stateApp.showInputCheck
    const showLeft = stateApp.showLeft
    const data = stateList.data
    const dispatch = useDispatch<AppDispatch>()

    const handleClickToAdd = () => {
        dispatch(setShowInputCheck(true))
        setTypeComp("add")
        setShowDrop(false)
    }
    const handleClickToEdit = () => {
        dispatch(setShowInputCheck(true))
        setTypeComp("update")
        setShowDrop(false)
    }
    const handleClickToDelete = () => {
        dispatch(setShowInputCheck(true))
        setTypeComp("delete")
        setShowDrop(false)
    }
    const handleClickToShow = () => {
        dispatch(setShowInputCheck(false))
        setShowDrop(!showDrop)
    }
    return (
        <>

            <nav className={`${!showLeft ? "hidden" : "flex"} md:flex h-[90vh] p-5 md:w-80 md:h-svh`}>
                <div className="flex flex-col flex-grow space-y-3 md:space-y-4">
                    <h1 className={`${PG.className} antialiased hidden text-center md:block bg-base-200 text-4xl rounded-lg py-3`}>
                        TaskTrek
                    </h1>
                    <Suspense fallback={<Skeleton amount={data.length > 5 ? 5 : data.length} />}>
                        <OneLefter />
                    </Suspense>
                    <div className="flex items-center justify-between px-0.5">
                        <span
                            className="flex items-center gap-1 cursor-pointer text-lg select-none"
                            onClick={handleClickToAdd}
                        >
                            <FiPlus />
                            Add List
                        </span>
                        <div className="dropdown relative">
                            <h1
                                className="cursor-pointer select-none text-lg list-none"
                                onClick={handleClickToShow}
                            >
                                Actions
                            </h1>
                            <ul className={showDrop ? "absolute z-10" : "hidden"}>
                                <li
                                    className="flex items-center gap-1 cursor-pointer text-sm"
                                    onClick={handleClickToEdit}
                                >
                                    <BiSolidEditAlt />
                                    Edit
                                </li>
                                <li
                                    className="flex items-center gap-1 cursor-pointer text-sm"
                                    onClick={handleClickToDelete}
                                >
                                    <RiDeleteRow />
                                    Delete
                                </li>
                            </ul>
                        </div>
                    </div>
                    <InputCheck
                        type={typeComp}
                        className={!showInputCheck ? "hidden" : ""}
                    />
                    <div className="flex-grow bg-base-200 rounded-lg w-full"></div>
                    <div className="flex flex-col text-[10px] items-center bg-base-200 rounded-lg py-3">
                        <span className="text-sm">Created by: Ali Sulman</span>
                        <span>All Right Reserved</span>
                    </div>
                </div>
            </nav>
        </>
    )
}

