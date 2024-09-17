import { setTime } from '@/redux/slice/slice.app'
import { AppDispatch, RootState } from '@/redux/store'
import { convertTimeIntoAMPM } from '@/utils/time'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TopSection = () => {
    const state = useSelector((state: RootState) => state.APP)
    const time: string = state.time
    const timePeriod = state.timePeriod
    const currentDate = state.date
    const weekday = state.weekDay
    const month = state.monthName
    const dispatch = useDispatch<AppDispatch>()

    setInterval(() => {
        dispatch(setTime())
    }, 1000);

    return (
        <div className='flex items-center gap-3 md:gap-6 py-4 md:p-4 select-none'>
            {
                time ? (
                    <div className='flex items-center -space-x-4 md:-space-x-5  -ml-4 md:ml-0 text-nowrap'>
                        <h6 className='text-sm md:text-base -rotate-90 underline underline-offset-4 uppercase'>{weekday}</h6>
                        <div>
                            <h4 className='underline underline-offset-4 text-sm md:text-base'>
                                {convertTimeIntoAMPM(time)}
                            </h4>
                            <h2 className='text-2xl md:text-3xl font-medium tracking-wider uppercase'>
                                {month.slice(0, 3)}
                            </h2>
                            <h3 className='text-xl md:text-2xl font-medium -mt-1'>{currentDate}</h3>
                        </div>
                    </div>
                ) : (
                    <div className='skeleton size-24 rounded-md'></div>
                )
            }
            <div>
                {timePeriod ? (
                    <h1 className='text-4xl md:text-6xl font-bold tracking-wide md:my-2'>
                        Good {timePeriod}!
                    </h1>
                ) : (
                    <div className='skeleton h-12 md:w-[30rem] md:h-20 rounded-lg'></div>
                )}

                <h3 className='text-2xl md:text-4xl text-neutral-content font-medium'>
                    What’s your plan today?
                </h3>
            </div>
        </div>
    )
}

export default TopSection
