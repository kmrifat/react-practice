import {createSlice} from "@reduxjs/toolkit";

export const activeUserSlicer = createSlice({
    name: 'activeUser',
    initialState: {
        value: localStorage.getItem('activeUser') ?? null
    },
    reducers: {
        setActiveUser: (state, action) => {
            state.value = action.payload
            localStorage.setItem('activeUser', JSON.stringify(state.value))
        },

        removeActiveUser: (state) => {
            state.value = null
            localStorage.removeItem('activeUser')
        }
    }
})

export const {setActiveUser, removeActiveUser} = activeUserSlicer.actions

export default activeUserSlicer.reducer