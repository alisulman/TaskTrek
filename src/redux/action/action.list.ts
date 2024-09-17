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
        setCookie("AllLists", [...data, dataList], 30, "/application")
    } catch (error: any) {
        if (axios.isAxiosError(error)) {
            const errorMessage = error.response?.data?.message || "An error occurred";
            dispatch(setError(errorMessage));
        } else {
            dispatch(setError(error.message || "An unknown error occurred."));
        }
    }
}