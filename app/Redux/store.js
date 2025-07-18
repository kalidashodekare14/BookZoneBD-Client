import { configureStore } from "@reduxjs/toolkit";
import profileSlice from '../Redux/slice/profileSlice'
import publicTotalBooks from '../Redux/slice/publicTotalBooks'
import publicDetailBooks from '../Redux/slice/viewDetailsBookSlice'

const store = configureStore({
    reducer: {
        profile: profileSlice,
        totalBooks: publicTotalBooks,
        viewDetailBooks: publicDetailBooks
    }
})


export default store