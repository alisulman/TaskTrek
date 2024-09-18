import { combineReducers, configureStore } from '@reduxjs/toolkit'
import APP from './slice/slice.app'
import LIST from './slice/slice.list'
import TODO from './slice/slice.todo'

const reducer = combineReducers({
    APP,
    LIST,
    TODO
})

const Store = configureStore({reducer})

export type RootState = ReturnType<typeof Store.getState>

export type AppDispatch = typeof Store.dispatch

export default Store