import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    pins: [],
    isReloadPin: false,
    isReloadToDay: false,
    isReloadUpcoming: false,
}

export const ScheduleMeetingManager = createSlice({
    name: 'ScheduleMeetingManager',
    initialState,
    reducers: {
        setPin: (state, action) => {
            state.pins = action.payload;
        },
        setIsReloadPin: (state, action) => {
            state.isReloadPin = action.payload;
        },
        setIsReloadToDay: (state, action) => {
            state.isReloadToDay = action.payload;
        },
        setIsReloadUpcoming: (state, action) => {
            state.isReloadUpcoming = action.payload;
        }
    },
})

export const { setPin, setIsReloadPin, setIsReloadToDay, setIsReloadUpcoming } = ScheduleMeetingManager.actions

export default ScheduleMeetingManager.reducer
