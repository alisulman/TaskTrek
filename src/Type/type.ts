import mongoose from "mongoose"
import { Document } from "mongoose"

export interface AppSliceInitialStateType {
    isLoading: boolean
    isError: string | null
    activeSet: string
    showInputCheck: boolean
    showLeft: boolean
    showRight: boolean
    currentMonth: number
    currentYear: number
    selected: number | null
    time: string | ""
    timePeriod: string | ""
    weekDay: string | ""
    monthName: string | ""
    date: string | ""
    drawerShow: boolean
    indexForEdit: number | null
    isComplete: boolean
}

export interface ListSliceInitialStateType {
    isLoading: boolean
    isError: string | null
    data: ListModelFullType[]
}
export interface TodoSliceInitialStateType {
    isLoading: boolean
    isError: string | null
    data: TodoModelFullType[]
}

export interface ListModalType extends Document {
    listName: string
    color: string
    todos: number
    listType: "default" | "temporary"
}

export interface ListModelFullType extends ListModalType {
    _id: string
}

export interface TodoModelType {
    title: string
    description: string
    dateTime: string
    duration: string
    listName: string | ListModelFullType
    completed?: boolean
    priority: string
}
export interface TodoModelFullType extends TodoModelType {
    _id: string
}

export interface TodoModelSchemaType extends Document {
    title: string
    description: string
    dateTime: string
    duration: string
    listName: mongoose.Schema.Types.ObjectId
    priority: "low" | "medium" | "high"
    completed: boolean
}