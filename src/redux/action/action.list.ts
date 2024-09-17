import { getCookie, setCookie } from "@/lib/cookies";
import { setError, setListData, setLoading } from "../slice/slice.list";
import { AppDispatch } from "../store";
import axios from "axios";
import { ListModelFullType } from "@/Type/type";

export const fetchLists = () => async (dispatch: AppDispatch) => {
    dispatch(setLoading())

    const runCookie = getCookie("Run");
    if (runCookie === true) {
        try {
            const response = await axios.get('/api/lists/fetch-all-lists')
            const dataList = response.data.data
            setCookie("Run", false, 1, "/application")
            dispatch(setListData(dataList))
            setCookie("lists", dataList, 30, "/application")
        } catch (error: any) {
            if (axios.isAxiosError(error)) {
                const errorMessage = error.response?.data?.message || "An error occurred while fetching the lists.";
                dispatch(setError(errorMessage));
            } else if (runCookie === false) {
                dispatch(setError(error.message || "An unknown error occurred."));
            }
        }
    } else {
        dispatch(setError("Data Already store in cookie"))
    }
}

export const addList = (name: string, data: ListModelFullType[]) => async (dispatch: AppDispatch) => {
    dispatch(setLoading())

    try {
        const response = await axios.post('/api/lists/add-list', { name })
        const dataList = response.data.data
        dispatch(setListData([...data, dataList]))
        setCookie("Run", true, 1, "/application")
        setCookie("lists", [...data, dataList], 30, "/application")
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            dispatch(setError(errorMessage));
        } else {
            dispatch(setError(error.message || "An unknown error occurred."));
        }
    }
}

export const deleteList = (name: string, data: ListModelFullType[]) => async (dispatch: AppDispatch) => {
    dispatch(setLoading())
    const dataForId = data.find(val => val.listName === name)
    const id = dataForId?._id
    const deletedData: ListModelFullType[] = data.filter(list => list._id !== id)

    try {
        dispatch(setListData(deletedData))
        await axios.delete(`/api/lists/delete-list/${id}`)
        setCookie("Run", true, 1, "/application")
        setCookie("lists", deletedData, 30, "/application")
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            dispatch(setError(errorMessage));
        } else {
            dispatch(setError(error.message || "An unknown error occurred."));
        }
    }
}

export const updateList = (prevname: string, name: string, data: ListModelFullType[]) => async (dispatch: AppDispatch) => {
    dispatch(setLoading())
    const dataForId = data.find(val => val.listName === prevname)
    const id = dataForId?._id

    try {
        const response = await axios.put(`/api/lists/update-list/${id}`, { name })
        const dataList = response.data.data
        const updateData = data.map(list => list._id === id ? dataList : list)
        dispatch(setListData(updateData))
        setCookie("lists", updateData, 30, "/application")
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            dispatch(setError(errorMessage));
        } else {
            dispatch(setError(error.message || "An unknown error occurred."));
        }
    }
}