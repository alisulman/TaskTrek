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