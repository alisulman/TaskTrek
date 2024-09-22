import axios from "axios";
import { setError, setLoading, setTodoData } from "../slice/slice.todo";
import { AppDispatch } from "../store";
import { TodoModelFullType, TodoModelType } from "@/Type/type";
import { setListData } from "../slice/slice.list";
import { setCookie } from "@/lib/cookies";

export const addTodo = (values: TodoModelType, data: TodoModelFullType[]) => async (dispatch: AppDispatch) => {
    dispatch(setLoading())

    try {
        const response = await axios.post('/api/todo/add-todo', values)
        const responseList = await axios.get('/api/lists/fetch-all-lists')
        const dataTodo = response.data.data
        const dataList = responseList.data.data
        dispatch(setTodoData([...data, dataTodo]))
        dispatch(setListData(dataList))
        setCookie("todos", [...data, dataTodo], 30, "/application")
        setCookie("RunT", true, 1, "/application")
        setCookie("lists", dataList, 30, "/application")
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            dispatch(setError(errorMessage));
        } else {
            dispatch(setError(error.message || "An unknown error occurred."));
        }
    }
}

export const updateTodo = (id: string, values: TodoModelType, data: TodoModelFullType[]) => async (dispatch: AppDispatch) => {
    dispatch(setLoading())

    try {
        const response = await axios.put(`/api/todo/update-todo/${id}`, values)
        const dataTodo = response.data.data
        const updateData = data.map(todo => todo._id === id ? dataTodo : todo)
        dispatch(setTodoData(updateData))
        setCookie("todos", updateData, 30, "/application")

    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            dispatch(setError(errorMessage));
        } else {
            dispatch(setError(error.message || "An unknown error occurred."));
        }
    }
}

export const deleteTodo = (id: string, data: TodoModelFullType[]) => async (dispatch: AppDispatch) => {
    dispatch(setLoading())

    const deletedData: TodoModelFullType[] = data.filter(list => list._id !== id)
    try {
        dispatch(setTodoData(deletedData))
        await axios.delete(`/api/todo/delete-todo/${id}`)
        const responseList = await axios.get('/api/lists/fetch-all-lists')
        const dataList = responseList.data.data
        dispatch(setListData(dataList))
        setCookie("todos", deletedData, 30, "/application")
        setCookie("lists", dataList, 30, "/application")
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            dispatch(setError(errorMessage));
        } else {
            dispatch(setError(error.message || "An unknown error occurred."));
        }
    }
}

export const updateComplete = (id: string) => async (dispatch: AppDispatch) => {
    dispatch(setLoading())

    try {
        const response = await axios.put(`/api/todo/update-status/${id}`)
        const data = response.data
        if (data.success) {
            const response = await axios.get(`/api/todo/fetch-all-todos`)
            const responseList = await axios.get('/api/lists/fetch-all-lists')
            const data = response.data.data
            const dataList = responseList.data.data
            dispatch(setTodoData(data))
            dispatch(setListData(dataList))
            setCookie("todos", data, 30, "/application")
            setCookie("lists", dataList, 30, "/application")
        }
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            dispatch(setError(errorMessage));
        } else {
            dispatch(setError(error.message || "An unknown error occurred."));
        }
    }
}