import {configureStore} from '@reduxjs/toolkit'
import tokenSlicer from "./auth/token";
import activeUserSlicer from "./auth/activeUser";

export default configureStore({

    reducer: {
        token: tokenSlicer,
        activeUser: activeUserSlicer
    },
})