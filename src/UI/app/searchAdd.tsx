import { IoMdAdd } from "react-icons/io";
import FormTodo from "./formTodo";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setDrawerShow } from "@/redux/slice/slice.app";

export default function SearchAdd() {
    const dispatch = useDispatch<AppDispatch>()
    const handleClick = () => dispatch(setDrawerShow(true))
    return (
        <div className="flex gap-1 px-4">
            <input
                type="text"
                className="text-sm px-4 md:px-7 py-1.5 md:py-3 w-full rounded-l-full"
                placeholder="Search your work"
            />
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