import { IoMdAdd } from "react-icons/io";

export default function SearchAdd() {
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
            >
                <IoMdAdd />
                Add a Todo
            </button>
        </div>
    )
}