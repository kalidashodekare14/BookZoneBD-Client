import { configureStore } from "@reduxjs/toolkit";
import profileSlice from '../Redux/slice/profileSlice'
import publicTotalBooks from '../Redux/slice/publicDataSlice/publicTotalBooks'
import publicDetailBooks from '../Redux/slice/publicDataSlice/viewDetailsBookSlice'
import specialDiscount from '../Redux/slice/publicDataSlice/specialDiscountSlice'
import trendingBooksData from '../Redux/slice/publicDataSlice/trendingBooksSlice'
import academicBooksData from '../Redux/slice/publicDataSlice/academicBooksSlice'
import adminVerify from '../Redux/slice/adminSlice'
import dashboardTotalBooks from '../Redux/slice/dashboardSlice/allBookSlice'
import dashboardTotalUsers from '../Redux/slice/dashboardSlice/allUserSlice'
import dashboardTotalInfo from '../Redux/slice/dashboardSlice/totalInfoSlice'

const store = configureStore({
    reducer: {
        profile: profileSlice,
        publicAllBooks: publicTotalBooks,
        viewDetailBooks: publicDetailBooks,
        specialDiscountBooks: specialDiscount,
        trendingBooks: trendingBooksData,
        academicBooks: academicBooksData,
        isAdmin: adminVerify,
        // dashboard
        totalInfo: dashboardTotalInfo,
        totalBooks: dashboardTotalBooks,
        totalUser: dashboardTotalUsers
    }
})


export default store