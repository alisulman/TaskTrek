import { IoMdAdd } from "react-icons/io";
import FormTodo from "./formTodo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setActiveSet, setDrawerShow } from "@/redux/slice/slice.app";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useDebouncedCallback } from "use-debounce";
import { RxCross2 } from "react-icons/rx";
import clsx from "clsx";
import { useEffect, useRef } from "react";

export default function SearchAdd() {

    const dispatch = useDispatch<AppDispatch>()
    const searchParams = useSearchParams()
    const pathName = usePathname()
    const { replace } = useRouter()
    const ref = useRef<HTMLInputElement | null>(null)

    const handleClick = () => dispatch(setDrawerShow(true))
    const handleSearch = useDebouncedCallback((term: string) => {
        const params = new URLSearchParams(searchParams)
        if (term) {
            params.set('query', term);
        } else {
            params.delete('query');
        }
        replace(`${pathName}?${params.toString()}`)
    }, 300)

    const handleClearSearch = () => {
        if (ref?.current) {
            ref.current.value = "";
        }
        const params = new URLSearchParams(searchParams);
        params.delete('query');
        replace(`${pathName}?${params.toString()}`);
        dispatch(setActiveSet("showall"))
    };

    useEffect(() => {
        dispatch(setActiveSet("showall"))
    }, [ref?.current?.value])

    return (
        <div className="flex gap-1 px-4">
            <div className="relative w-full">
                <input
                    ref={ref}
                    type="text"
                    className="text-sm px-4 md:px-7 py-1.5 md:py-3 w-full rounded-l-full"
                    placeholder="Search your work"
                    onChange={(e) => handleSearch(e.target.value)}
                    defaultValue={searchParams.get('query')?.toString()}
                />
                <RxCross2
                    className={clsx("absolute right-2 top-3 text-xl", {//-
                        "hidden": ref?.current?.value === ""//-
                    })}
                    onClick={handleClearSearch}
                />
            </div>
            <button
                type="button"
                className="flex items-center gap-1 font-medium bg-primary text-primary-content text-sm md:text-base px-2 md:px-4 text-nowrap rounded-r-full"
                onClick={handleClick}
            >
                <IoMdAdd />
                Add a Todo
            </button>
            <FormTodo />
        </div>
    )
}