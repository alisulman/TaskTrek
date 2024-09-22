import { setShowInputCheck } from "@/redux/slice/slice.app";
import { AppDispatch, RootState } from "@/redux/store";
import { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";
import { useDebounce } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import clsx from "clsx";
import { addList, deleteList, fetchLists, updateList } from "@/redux/action/action.list";
import { ListModelFullType, TodoModelType } from "@/Type/type";

interface Messages {
    add: string;
    update: string;
    delete: string;
}
export default function InputCheck(
    { className, type, setValues }: { className?: string, type: string, setValues?: React.Dispatch<React.SetStateAction<TodoModelType>> }
) {
    const [value, setValue] = useState<string>("")
    const [spInpValue, setSpInpValue] = useState<string>("")
    const [spInpMsg, setSpInpMsg] = useState<string>("")
    const [msg, setMsg] = useState<Messages>({ add: "", update: "", delete: "" })
    const [proceed, setProceed] = useState<boolean>(false)
    const [load, setLoad] = useState<boolean>(false)
    const [goAhead, setGoAhead] = useState<boolean>(false)
    const [debounceValue] = useDebounce(value, 2000)
    const [debounceValueTwo] = useDebounce(spInpValue, 2000)

    const state = useSelector((state: RootState) => state.LIST)
    const stateApp = useSelector((state: RootState) => state.APP)
    const data = state.data
    const show = stateApp.showInputCheck
    const showDrawer = stateApp.drawerShow
    const dispatch = useDispatch<AppDispatch>()

    const handleClickToClose = () => {
        dispatch(setShowInputCheck(false))
        setValue("")
        setSpInpValue("")
        setSpInpMsg("")
        setGoAhead(false)
        setMsg({ add: "", update: "", delete: "" })
    }
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoad(true)
        setValue(e.target.value)
    }
    const handleSpInpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoad(true)
        setSpInpValue(e.target.value)
    }
    const handleClick = () => {
        if (type === "add") {
            dispatch(addList(debounceValue, data))
        }
        if (type === "delete") {
            dispatch(deleteList(value, data))
        }
        if (type === "update") {
            dispatch(updateList(debounceValue, debounceValueTwo, data))
        }
        setValue("")
        setSpInpValue("")
        setSpInpMsg("")
        setGoAhead(false)
        setMsg({ add: "", update: "", delete: "" })
        dispatch(setShowInputCheck(false))
        dispatch(fetchLists())
    }
    useEffect(() => {
        const checking = () => {
            const match = data.find((val: ListModelFullType) => val.listName === debounceValue)
            if (match) {
                if (type === "add" || type === "form") {
                    setMsg({ add: `${type === "form" ? "List exists" : "List already exist choose different"}`, update: "", delete: "" })
                    if (setValues) {
                        setValues((prevValues: TodoModelType) => ({
                            ...prevValues,
                            listName: debounceValue,
                        }));
                    }
                }
                if (type === "update") {
                    if (match.listName === "professional" || match.listName === "personal") {
                        setMsg({ add: "", update: "this list neither delete nor edit", delete: "" })
                    } else {
                        setMsg({ add: "", update: "List exist now update", delete: "" })
                        setGoAhead(true)
                        if (goAhead) {
                            const matchTwo = data.find((val: ListModelFullType) => val.listName === debounceValueTwo)
                            if (match.listName === matchTwo?.listName) {
                                setSpInpMsg("Same name is not allowed")
                                setMsg({ add: "", update: "Same name is not allowed", delete: "" })
                            } else {
                                setMsg({ add: "", update: "List exist now update", delete: "" })
                                setSpInpMsg("Nice One!")
                                setProceed(true)
                            }
                        }
                    }
                } else setProceed(false)
                if (type === "delete") {
                    if (match.listName === "professional" || match.listName === "personal") {
                        setMsg({ add: "", update: "", delete: "this list neither delete nor edit" })
                        setProceed(false)
                    } else {
                        setMsg({ add: "", update: "", delete: "List exist now delete" })
                        setProceed(true)
                    }
                }

            } else {
                if (type === "add" || type === "form") {
                    setMsg({ add: "Nice one!", update: "", delete: "" })
                    if (setValues) {
                        setValues((prevValues: TodoModelType) => ({
                            ...prevValues,
                            listName: debounceValue,
                        }));
                    }
                    setProceed(true)
                } else setProceed(false)
                if (type === "update") setMsg({ add: "", update: "List is not exist", delete: "" })
                if (type === "delete") setMsg({ add: "", update: "", delete: "List is not exist" })
            }
            setLoad(false)
        }
        if (debounceValue !== "") {
            checking()
        } else {
            setLoad(false)
            setProceed(false)
            setMsg({ add: "", update: "", delete: "" })
        }
    }, [debounceValue, debounceValueTwo])
    useEffect(() => {
        setValue("")
        setSpInpValue("")
        setSpInpMsg("")
        setGoAhead(false)
        setMsg({ add: "", update: "", delete: "" })
        if (type === "form" && setValues) {
            setValues((prevValues: TodoModelType) => ({
                ...prevValues,
                listName: "",
            }))
        }
    }, [show, type, showDrawer])

    return (
        <div className={`relative ${msg ? "space-y-2" : "space-y-3"} ${className}`}>
            <input
                type="text"
                value={value.toLowerCase()}
                onChange={handleChange}
                className={type === "form" ? "input input-bordered input-sm text-[#808c9c] my-1 rounded-none w-full max-w-xs" : "text-sm w-full px-4 pr-12 py-2"}
                placeholder={type === "update" ? "Enter todo's list name for edit" : "Enter todo's list name"}
            />
            <h5 className={clsx("text-xs", { "hidden": !msg })}>
                {
                    type === "add" || type === "form"
                        ? msg.add
                        : type === "update"
                            ? msg.update
                            : type === "delete"
                                ? msg.delete
                                : ""
                }
            </h5>
            <input
                type="text"
                value={spInpValue.toLowerCase()}
                onChange={handleSpInpChange}
                className={type !== "update" ? "hidden" : !goAhead ? "hidden" : "text-sm w-full px-4 py-2"}
                placeholder="Enter todo's list name"
            />
            <h5 className={clsx("text-xs", { "hidden": !spInpMsg })}>{spInpMsg}</h5>
            <div className="flex items-center gap-1.5 absolute top-0.5 right-2 ">
                {load && (
                    <span className="select-none loading loading-spinner loading-xs"></span>
                )}
                <RxCross2
                    className={type === "form" ? "hidden" : "cursor-pointer"}
                    onClick={handleClickToClose}
                />
            </div>
            <button
                type="button"
                className={
                    clsx(`capitalize bg-neutral text-neutral-content ${proceed
                        ? "cursor-pointer"
                        : "cursor-not-allowed"} w-full h-9`,
                        { "opacity-25": !proceed },
                        { "hidden": type === "form" },
                    )
                }
                disabled={!proceed}
                onClick={handleClick}
            >
                {type}
            </button>
        </div>
    )
}