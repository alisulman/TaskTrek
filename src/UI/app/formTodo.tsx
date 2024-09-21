import { setDrawerShow, setIndexForEdit } from "@/redux/slice/slice.app"
import { AppDispatch, RootState } from "@/redux/store"
import clsx from "clsx"
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import InputCheck from "./inputCheck"
import { TodoModelType } from "@/Type/type"
import { addTodo, updateTodo } from "@/redux/action/todo.action"
import { convertFromSeconds } from "../../utils/time"

const Drawer = ({ className, children }: { children: React.ReactNode, className?: string }) => {
    const state = useSelector((state: RootState) => state.APP)
    const showDrawer = state.drawerShow
    const dispatch = useDispatch<AppDispatch>()
    const hanldeClick = () => {
        dispatch(setDrawerShow(false))
        dispatch(setIndexForEdit(null))
    }
    return (
        <div
            className={clsx("absolute top-0 left-0 bg-black w-svw h-svh z-30 backdrop-blur-[2px] bg-opacity-5 cursor-pointer", { "hidden": !showDrawer })} onClick={hanldeClick}>
            <div className="absolute right-0 h-svh bg-base-100 md:border-l-2 border-neutral-content w-svw md:w-[24vw] z-50" onClick={e => e.stopPropagation()}>
                <div className={className}>
                    {children}
                </div>
            </div>
        </div>
    )
}
export default function FormTodo() {
    const [values, setValues] = useState<TodoModelType>({
        title: "",
        description: "",
        dateTime: "",
        duration: "",
        listName: "",
        priority: "",
    })

    const state = useSelector((state: RootState) => state.TODO)
    const stateApp = useSelector((state: RootState) => state.APP)
    const data = state.data
    const show = stateApp.drawerShow
    const indexForEdit = stateApp.indexForEdit
    const dispatch = useDispatch<AppDispatch>()

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const handleSubmit = () => {
        if (indexForEdit != null) {
            const id = data[indexForEdit]._id
            dispatch(updateTodo(id, values, data))
        } else {
            console.log(values)
            dispatch(addTodo(values, data))
        }
        setValues({
            title: "",
            description: "",
            dateTime: "",
            duration: "",
            listName: "",
            priority: "",
        })

        dispatch(setDrawerShow(false))
    }
    const handleCancel = () => {
        dispatch(setDrawerShow(false))
        setValues({
            title: "",
            description: "",
            dateTime: "",
            duration: "",
            listName: "",
            priority: "",
        })
        dispatch(setIndexForEdit(null))
    }
    useEffect(() => {
        if (show) {
            setValues({
                title: "",
                description: "",
                dateTime: "",
                duration: "",
                listName: "",
                priority: "",
            })
        }
    }, [show])
    useEffect(() => {
        if (indexForEdit != null) {
            const dataTodo = data[indexForEdit]
            setValues({
                title: dataTodo.title,
                description: dataTodo.description,
                dateTime: dataTodo.dateTime,
                duration: convertFromSeconds(dataTodo.duration),
                listName: typeof dataTodo.listName === 'string' ? dataTodo.listName : dataTodo.listName.listName,
                priority: dataTodo.priority,
            })
        }
    }, [indexForEdit])
    return (
        <Drawer className="flex flex-col items-center gap-5 p-8">
            <h2 className="text-2xl font-semibold uppercase tracking-widest">{indexForEdit != null ? 'Update' : 'Add'} Todo</h2>
            <div className="form-control w-full max-w-xs space-y-4">
                <label htmlFor="title" className="label-text">
                    Title
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={values.title}
                        onChange={handleChange}
                        placeholder="Type title  of your work"
                        className="input input-bordered input-sm text-[#808c9c] my-1 rounded-none w-full max-w-xs"
                    />
                </label>
                <label htmlFor="Ddscription" className="label-text">
                    Description
                    <input
                        type="text"
                        id="description"
                        name="description"
                        value={values.description}
                        onChange={handleChange}
                        placeholder="Type description"
                        className="input input-bordered input-sm text-[#808c9c] my-1 rounded-none w-full max-w-xs"
                    />
                </label>
                <label htmlFor="dateTime" className="label-text">
                    Date-Time
                    <input
                        type="datetime-local"
                        id="dateTime"
                        name="dateTime"
                        value={values.dateTime}
                        onChange={handleChange}
                        className="input input-bordered input-sm text-[#808c9c] my-1 rounded-none w-full max-w-xs"
                    />
                </label>
                <label htmlFor="duration" className="label-text">
                    Duration
                    <input
                        type="text"
                        id="duration"
                        name="duration"
                        value={values.duration}
                        onChange={handleChange}
                        placeholder="type like 1h-20m or 10m minimum 24h"
                        className="input input-bordered input-sm text-[#808c9c] my-1 rounded-none w-full max-w-xs"
                    />
                </label>
                {indexForEdit === null && (
                    <label htmlFor="tag" className="label-text">
                        List-Name
                        <InputCheck type="form" setValues={setValues} />
                    </label>
                )}
                <div className="text-xs flex flex-col gap-1">
                    <span className="label-text">Priority</span>
                    <div className="flex items-center text-[#808c9c] gap-5">
                        <label htmlFor="high" className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="high"
                                name="priority"
                                value="high"
                                checked={values.priority === 'high'}
                                onChange={handleChange}
                                className="radio radio-xs"
                            />
                            <span>High</span>
                        </label>
                        <label htmlFor="medium" className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="medium"
                                name="priority"
                                value="medium"
                                checked={values.priority === 'medium'}
                                onChange={handleChange}
                                className="radio radio-xs"
                            />
                            <span>Medium</span>
                        </label>
                        <label htmlFor="low" className="flex items-center gap-2">
                            <input
                                type="radio"
                                id="low"
                                name="priority"
                                value="low"
                                checked={values.priority === 'low'}
                                onChange={handleChange}
                                className="radio radio-xs"
                            />
                            <span>Low</span>
                        </label>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={handleSubmit}
                >
                    Submit
                </button>
                <button
                    type="button"
                    className="btn btn-outline btn-primary btn-sm"
                    onClick={handleCancel}
                >
                    Cancel
                </button>
            </div>
        </Drawer>
    )
}