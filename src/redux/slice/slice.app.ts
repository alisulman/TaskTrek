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
    selected: new Date().getDate(),
    time: "",
    timePeriod: "",
    weekDay: "",
    monthName: "",
    date: "",
    drawerShow: false,
    indexForEdit: null,
    isComplete: false
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
        },
        setTime: (state) => {
            const daysOfWeek: string[] = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
            const monthNames: string[] = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
            const dateDay = new Date()
            const hour = dateDay.getHours()
            const minutes = dateDay.getMinutes()
            const date = dateDay.getDate() < 10 ? `0${dateDay.getDate()}` : `${dateDay.getDate()}`
            const getDate: string = `${hour}: ${minutes}`
            const period = hour < 12 ? "Morning" : hour >= 12 && hour < 17 ? "Afternoon" : hour >= 17 && hour <= 20 ? "Night" : ""
            state.isLoading = false
            state.timePeriod = period
            state.time = getDate
            state.date = date
            state.weekDay = daysOfWeek[dateDay.getDay()]
            state.monthName = monthNames[dateDay.getMonth()]
        },
        setDrawerShow: (state, action) => {
            state.isLoading = false
            state.drawerShow = action.payload
        },
        setIndexForEdit: (state, action) => {
            state.isLoading = false
            state.indexForEdit = action.payload
        },
        setIsComplete: (state, action) => {
            state.isLoading = false
            state.isComplete = action.payload
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
    setTime,
    setDrawerShow,
    setIndexForEdit,
    setIsComplete
} = AppSlice.actions;

export default AppSlice.reducer;