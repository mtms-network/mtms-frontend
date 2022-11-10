import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: null
}

export const AppReducerManger = createSlice({
    name: 'AppReducerManger',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
})

export const {  } = AppReducerManger.actions

export default AppReducerManger.reducer
