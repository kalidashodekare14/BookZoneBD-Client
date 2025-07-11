import { configureStore } from "@reduxjs/toolkit";
import profileSlice from '../Redux/profileSlice'

const store = configureStore({
    reducer: {
        profile: profileSlice
    }
})


export default store