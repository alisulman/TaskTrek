import { getCookie } from "@/lib/cookies";
import { TodoModelFullType, TodoSliceInitialStateType } from "@/Type/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: TodoSliceInitialStateType = {
    isLoading: false,
    isError: null,
    data: (getCookie("todos") as TodoModelFullType[]) || []
}

const ListSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        setError: (state, action) => {
            state.isLoading = false
            state.isError = action.payload
        },
        setTodoData: (state, action) => {
            state.isLoading = false
            state.data = action.payload
        },
    }
})

export const { setLoading, setError, setTodoData } = ListSlice.actions;

export default ListSlice.reducer;