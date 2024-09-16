import { VscLayoutSidebarLeft, VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { PG } from "../fonts";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { setShowLeft, setShowRight } from "@/redux/slice/slice.app";

export default function Navbar(
    { className }: { className?: string }
) {
    const state = useSelector((state: RootState) => state.APP)
    const showLeft = state.showLeft
    const showRight = state.showRight
    const dispatch = useDispatch<AppDispatch>()

    const handleLeftPanal = () => {
        if (!showRight) {
            dispatch(setShowLeft(!showLeft))
        } else {
            dispatch(setShowLeft(!showLeft))
            dispatch(setShowRight(!showRight))
        }
    }
    const handleRightPanal = () => {
        if (!showLeft) {
            dispatch(setShowRight(!showRight))
        } else {
            dispatch(setShowRight(!showRight))
            dispatch(setShowLeft(!showLeft))
        }
    }

    return (
        <nav className={`navbar bg-primary-content flex justify-between items-center ${className}`}>
            <div className="flex flex-col items-start -space-y-1.5">
                <h1 className={`${PG.className} antialiased text-2xl`}>
                    TaskTrek
                </h1>
                <button
                    type="button"
                    className="font-bold"
                >
                    Enter your assistant name
                </button>
            </div>
            <div className="text-2xl space-x-1">
                <VscLayoutSidebarLeftOff
                    className={!showLeft ? "cursor-pointer" : "hidden"}
                    onClick={handleLeftPanal}
                />
                <VscLayoutSidebarLeft
                    className={showLeft ? "cursor-pointer" : "hidden"}
                    onClick={handleLeftPanal}
                />
                <VscLayoutSidebarLeftOff
                    className={!showRight ? "scale-[-1] cursor-pointer" : "hidden"}
                    onClick={handleRightPanal}
                />
                <VscLayoutSidebarLeft
                    className={showRight ? "scale-[-1] cursor-pointer" : "hidden"}
                    onClick={handleRightPanal}
                />
            </div>
        </nav>
    )
}