import {createSlice} from '@reduxjs/toolkit'

export const tokenSlicer = createSlice({
    name: 'token',
    initialState: {
        value: localStorage.getItem('token') ?? null
    },
    reducers: {
        setToken: (state, action) => {
            state.value = action.payload
            localStorage.setItem('token', state.value)
        },

        removeToken: (state) => {
            state.value = null
            localStorage.removeItem('token')
        }
    }
})

export const {setToken, removeToken} = tokenSlicer.actions

export default tokenSlicer.reducer