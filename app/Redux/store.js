import { configureStore } from "@reduxjs/toolkit";
import profileSlice from '../Redux/slice/profileSlice'
import publicTotalBooks from '../Redux/slice/publicTotalBooks'
import publicDetailBooks from '../Redux/slice/viewDetailsBookSlice'
import adminVerify from '../Redux/slice/adminSlice'

const store = configureStore({
    reducer: {
        profile: profileSlice,
        totalBooks: publicTotalBooks,
        viewDetailBooks: publicDetailBooks,
        isAdmin: adminVerify
    }
})


export default store