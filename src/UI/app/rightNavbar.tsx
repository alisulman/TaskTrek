import { setActiveSet, setCurrentMonth, setCurrentYear, setSelected } from "@/redux/slice/slice.app"
import { AppDispatch, RootState } from "@/redux/store"
import clsx from "clsx"
import { useEffect, useState } from "react"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"

const Calender = () => {
    const [updater, setUpdater] = useState<Date>(new Date())

    const state = useSelector((state: RootState) => state.APP)
    const currentMonth = state.currentMonth
    const currentYear = state.currentYear
    const selected = state.selected
    const dispatch = useDispatch<AppDispatch>()

    const getDaysInMonth = (month: number, year: number): number => new Date(year, month + 1, 0).getDate()

    const daysOfWeek: string[] = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
    const firstDayOfMonth: number = new Date(currentYear, currentMonth, 1).getDay()
    const daysInCurrentMonth: number = getDaysInMonth(currentMonth, currentYear)

    const handleClick = (date: number) => {
        dispatch(setSelected(date))
        dispatch(setActiveSet(date))
    }

    const renderCalenderDays = (): JSX.Element[] => {
        const totalCells = firstDayOfMonth + daysInCurrentMonth
        const rows: JSX.Element[] = []
        let cells: JSX.Element[] = []

        for (let i = 0; i < totalCells; i++) {
            if (i < firstDayOfMonth) {
                cells.push(<td key={i}></td>)
            } else {
                const day = i - firstDayOfMonth + 1
                const isToday = day === updater.getDate() && currentMonth === updater.getMonth() && currentYear === updater.getFullYear()
                cells.push(
                    <td
                        scope='col'
                        key={i}
                        className={clsx(
                            'w-full aspect-auto p-2 text-center cursor-pointer',
                            {
                                'bg-neutral text-neutral-content': isToday,
                                'bg-slate-700': selected !== updater.getDate() && selected === day,
                                'hover:bg-slate-600': !isToday && selected !== day,
                            }
                        )}
                        onClick={() => handleClick(day)}
                    >
                        {day}
                    </td>
                )
            }

            if ((i + 1) % 7 === 0 || i === totalCells - 1) {
                rows.push(<tr key={i}>{cells}</tr>)
                cells = []
            }
        }

        return rows
    }

    useEffect(() => {
        const updaterId = setInterval(() => {
            setUpdater(new Date())
        }, 1000)
        return () => clearInterval(updaterId)
    }, [])

    return (
        <table className='w-full h-[14rem] table-fixed border-collapse select-none'>
            <thead>
                <tr>
                    {daysOfWeek.map((day, idx) => (
                        <th
                            key={idx}
                            className='text-sm p-2 text-gold text-center'
                        >
                            {day}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {renderCalenderDays()}
            </tbody>
        </table>
    )
}

export default function RightNavbar() {


    const state = useSelector((state: RootState) => state.APP)
    const currentMonth = state.currentMonth
    const currentYear = state.currentYear
    const active = state.activeSet
    const month = state.monthName
    const open = state.showRight
    const dispatch = useDispatch<AppDispatch>()

    const handleClick = (click: "next" | "prev") => {
        if (click === "next") {
            if (currentMonth === 11) {
                dispatch(setCurrentYear(currentYear + 1))
                dispatch(setCurrentMonth(0))
            } else {
                dispatch(setCurrentMonth(currentMonth + 1))
            }
            dispatch(setSelected(new Date().getDate()))
        }
        if (click === "prev") {
            if (currentMonth === 0) {
                dispatch(setCurrentYear(currentYear - 1))
                dispatch(setCurrentMonth(11))
            } else {
                dispatch(setCurrentMonth(currentMonth - 1))
            }
            dispatch(setSelected(new Date().getDate()))
        }
    }
    return (
        <nav className={`${!open ? "hidden" : "flex"} absolute md:static top-16 md:flex flex-col items-center gap-3 h-[90vh] md:w-96 md:h-svh p-5 bg-base-100`}>
            <div className="flex items-center justify-center bg-base-200 w-full rounded-xl py-3">
                <FaCaretLeft
                    className="text-2xl cursor-pointer"
                    onClick={() => handleClick("prev")}
                />
                <div className="flex flex-col items-center w-32 select-none">
                    <span>{month}</span>
                    <span className="text-sm">{currentYear}</span>
                </div>
                <FaCaretRight
                    className="text-2xl cursor-pointer"
                    onClick={() => handleClick("next")}
                />
            </div>
            <div className="flex justify-center items-center bg-base-200 rounded-xl w-full h-72 px-4 py-2">
                <Calender />
            </div>
            <div className="w-full bg-base-200 h-full rounded-xl p-8">
                <div className="flex justify-between w-full">
                    <button
                        type="button"
                        className={clsx("btn btn-sm btn-primary border-2 border-primary !rounded px-9", {
                            "btn-neutral": active === "showall"
                        })}
                        onClick={() => {
                            dispatch(setActiveSet("showall"))
                            dispatch(setSelected(null))
                        }}
                    >
                        Show All
                    </button>
                    <button
                        type="button"
                        className={clsx("btn btn-sm btn-primary border-2 border-primary !rounded px-9", {
                            "btn-neutral": active === "search"
                        })}
                        onClick={() => {
                            dispatch(setActiveSet("search"))
                            dispatch(setSelected(null))
                        }}
                    >
                        Search
                    </button>
                </div>
                <button
                    type="button"
                    className={clsx("btn btn-sm btn-primary border-2 border-primary !rounded w-full my-3", {
                        "btn-neutral": active === "completed"
                    })}
                    onClick={() => {
                        dispatch(setActiveSet("completed"))
                        dispatch(setSelected(null))
                    }}
                >
                    Completed
                </button>
                <button
                    type="button"
                    className={clsx("btn btn-sm btn-primary border-2 border-primary !rounded w-full", {
                        "btn-neutral": active === "priority"
                    })}
                    onClick={() => {
                        dispatch(setActiveSet("priority"))
                        dispatch(setSelected(null))
                    }}
                >
                    Priority
                </button>
            </div>
        </nav>
    )
}
