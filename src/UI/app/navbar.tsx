import { VscLayoutSidebarLeft, VscLayoutSidebarLeftOff } from "react-icons/vsc";
import { PG } from "../fonts";
import { useState } from "react";

export default function Navbar(
    {className = ""}: {className?: string}
) {
    const [showLeft, setShowLeft] = useState<boolean>(false);
    const [showRight, setShowRight] = useState<boolean>(false);

    const handleLeftPanal = () => setShowLeft(!showLeft)
    const handleRightPanal = () => setShowRight(!showRight)

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