import { combineReducers, configureStore } from '@reduxjs/toolkit'
import APP from './slice/slice.app'
import LIST from './slice/slice.list'

const reducer = combineReducers({
    APP,
    LIST,
})

const Store = configureStore({reducer})

export type RootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch

export default Store