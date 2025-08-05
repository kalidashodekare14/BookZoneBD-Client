import { configureStore } from "@reduxjs/toolkit";
import profileSlice from '../Redux/slice/profileSlice'
import publicTotalBooks from '../Redux/slice/publicDataSlice/publicTotalBooks'
import publicDetailBooks from '../Redux/slice/publicDataSlice/viewDetailsBookSlice'
import productReviewSlice from '../Redux/slice/publicDataSlice/productReviewSlice'
import publicDetailWriter from '../Redux/slice/publicDataSlice/writerDetailsSlice'
import specialDiscount from '../Redux/slice/publicDataSlice/specialDiscountSlice'
import trendingBooksData from '../Redux/slice/publicDataSlice/trendingBooksSlice'
import academicBooksData from '../Redux/slice/publicDataSlice/academicBooksSlice'
import totalWriterData from '../Redux/slice/publicDataSlice/totalWritersSlice'
import adminVerify from '../Redux/slice/adminSlice'
import dashboardTotalBooks from '../Redux/slice/dashboardSlice/allBookSlice'
import dashboardTotalUsers from '../Redux/slice/dashboardSlice/allUserSlice'
import dashboardTotalInfo from '../Redux/slice/dashboardSlice/totalInfoSlice'
import dashboardTotalAuthor from '../Redux/slice/dashboardSlice/authorsManageSlice'
import dashboardTotalOrder from '../Redux/slice/dashboardSlice/orderManageSlice'
import dashboardOrderDetils from '../Redux/slice/dashboardSlice/orderDetailsSlice'
import dashboardTotalReview from '../Redux/slice/dashboardSlice/totalReviewSlice';

const store = configureStore({
    reducer: {
        profile: profileSlice,
        publicAllBooks: publicTotalBooks,
        viewDetailBooks: publicDetailBooks,
        productReviews: productReviewSlice,
        viewDetailWriter: publicDetailWriter,
        specialDiscountBooks: specialDiscount,
        trendingBooks: trendingBooksData,
        academicBooks: academicBooksData,
        allWriterData: totalWriterData,
        isAdmin: adminVerify,
        // dashboard
        totalInfo: dashboardTotalInfo,
        totalBooks: dashboardTotalBooks,
        totalUser: dashboardTotalUsers,
        totalAuthors: dashboardTotalAuthor,
        totalOrders: dashboardTotalOrder,
        viewOrderDetails: dashboardOrderDetils,
        totalReview: dashboardTotalReview
    }
})


export default store