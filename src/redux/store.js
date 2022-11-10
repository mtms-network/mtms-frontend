import { configureStore } from '@reduxjs/toolkit'
import AppReducer from "./reducers/AppReducer";

export const store = configureStore({
    reducer: {
        AppReducer: AppReducer,
    },
})
