import { configureStore } from '@reduxjs/toolkit'
import AppReducer from "./reducers/AppReducer";
import ScheduleMeetingReducer from "./reducers/ScheduleMeetingReducer";

export const store = configureStore({
    reducer: {
        AppReducer: AppReducer,
        ScheduleMeetingReducer: ScheduleMeetingReducer,
    },
})
