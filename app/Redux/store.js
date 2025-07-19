import { configureStore } from "@reduxjs/toolkit";
import profileSlice from '../Redux/slice/profileSlice'
import publicTotalBooks from '../Redux/slice/publicTotalBooks'
import publicDetailBooks from '../Redux/slice/viewDetailsBookSlice'
import adminVerify from '../Redux/slice/adminSlice'
import dashboardTotalBooks from '../Redux/slice/dashboardSlice/allBookSlice'
import dashboardTotalUsers from '../Redux/slice/dashboardSlice/allUserSlice'
import dashboardTotalInfo from '../Redux/slice/dashboardSlice/totalInfoSlice'

const store = configureStore({
    reducer: {
        profile: profileSlice,
        totalBooks: publicTotalBooks,
        viewDetailBooks: publicDetailBooks,
        isAdmin: adminVerify,
        // dashboard
        totalInfo: dashboardTotalInfo,
        totalBooks: dashboardTotalBooks,
        totalUser: dashboardTotalUsers
    }
})


export default store