import { AppSliceInitialStateType } from "@/Type/type";
import { createSlice } from "@reduxjs/toolkit";

const initialState: AppSliceInitialStateType = {
    isLoading: false,
    isError: null,
    activeSet: "showall",
    showInputCheck: false,
    showLeft: false,
    showRight: false,
    currentMonth: new Date().getMonth(),
    currentYear: new Date().getFullYear(),
    selected: new Date().getDate()
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
        },
        setShowLeft: (state, action) => {
            state.isLoading = false
            state.showLeft = action.payload
        },
        setShowRight: (state, action) => {
            state.isLoading = false
            state.showRight = action.payload
        },
        setCurrentMonth: (state, action) => {
            state.isLoading = false
            state.currentMonth = action.payload
        },
        setCurrentYear: (state, action) => {
            state.isLoading = false
            state.currentYear = action.payload
        },
        setSelected: (state, action) => {
            state.isLoading = false
            state.selected = action.payload
        }
    }
})

export const {
    setLoading,
    setActiveSet,
    setShowInputCheck,
    setShowLeft,
    setShowRight,
    setCurrentMonth,
    setCurrentYear,
    setSelected,
} = AppSlice.actions;

export default AppSlice.reducer;