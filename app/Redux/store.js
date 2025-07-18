import { configureStore } from "@reduxjs/toolkit";
import profileSlice from '../Redux/slice/profileSlice'
import publicTotalBooks from '../Redux/slice/publicTotalBooks'

const store = configureStore({
    reducer: {
        profile: profileSlice,
        totalBooks: publicTotalBooks
    }
})


export default store