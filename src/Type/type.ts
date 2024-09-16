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
    selected: number
}

export interface ListSliceInitialStateType {
    isLoading: boolean
    isError: string | null
    data: ListModelFullType[]
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