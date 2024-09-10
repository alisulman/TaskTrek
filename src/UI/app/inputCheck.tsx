import { setShowInputCheck } from "@/redux/slice/slice.app";
import { AppDispatch } from "@/redux/store";
import { RxCross2 } from "react-icons/rx";
import { useDispatch } from "react-redux";

export default function InputCheck(
    { className, type }: { className: string, type: string }
) {
    const dispatch = useDispatch<AppDispatch>()
    const handleClickToClose = () => dispatch(setShowInputCheck(false))
    return (
        <div className={`relative space-y-3 ${className}`}>
            <input
                type="text"
                className="text-sm w-full px-4 pr-12 py-2"
                placeholder={type === "update" ? "Enter todo's list name for edit" : "Enter todo's list name"}
            />
            <input
                type="text"
                className={type !== "update" ? "hidden" : "text-sm w-full px-4 pr-12 py-2"}
                placeholder="Enter todo's list name"
            />
            <RxCross2
                className="absolute -top-0.5 right-2 cursor-pointer"
                onClick={handleClickToClose}
            />
            <button
                type="button"
                className="capitalize bg-neutral text-neutral-content w-full h-9"
            >
                {type}
            </button>
        </div>
    )
}