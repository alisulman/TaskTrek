import { AppSliceInitialStateType } from "@/Type/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppSliceInitialStateType = {
    isLoading: false,
    isError: null,
    activeSet: "showall",
    showInputCheck: false
}

const AppSlice = createSlice({
    name: "app",
    initialState,
    reducers: {
        setLoading: (state) => {
            state.isLoading = true;
        },
        setActiveSet: (state, action) => {
            state.isLoading = false;
            state.activeSet = action.payload;
        },
        setShowInputCheck: (state, action) => {
            state.isLoading = false
            state.showInputCheck = action.payload
        }
    }
})

export const { setLoading, setActiveSet, setShowInputCheck } = AppSlice.actions;

export default AppSlice.reducer;