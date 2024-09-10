import { getCookie } from "@/lib/cookies";
import { ListModelFullType, ListSliceInitialStateType } from "@/Type/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: ListSliceInitialStateType = {
    isLoading: false,
    isError: null,
    data: (getCookie("lists") as ListModelFullType[]) || []
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
        setListData: (state, action) => {
            state.isLoading = false
            state.data = action.payload
        },
    }
})

export const { setLoading, setError, setListData } = ListSlice.actions;

export default ListSlice.reducer;