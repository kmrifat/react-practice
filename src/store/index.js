import {createSlice, configureStore} from '@reduxjs/toolkit'

export const tokenSlice = createSlice({
    name: 'token',
    initialState: {
        value: 0
    },
    reducers: {
        setToken: (state, payload) => {
            state.value = payload
        },

        getToken: (state) => {
            return state.value
        },

        removeToken: state => {
            state.value = null
        }
    }
})


export const {setToken, removeToken} = tokenSlice.actions
export default tokenSlice.reducer