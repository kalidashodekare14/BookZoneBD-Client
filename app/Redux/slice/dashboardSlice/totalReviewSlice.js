import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";



export const totalReviewFetched = createAsyncThunk(
    "totalReview/totalReviewFetched",
    async () => {
        const res = await axiosSecure('/api/dashboard/total_review');
        return res.data.data
    }
)


const dashboardTotalReview = createSlice({
    name: "allReview",
    initialState: {
        reviewAllData: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(totalReviewFetched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(totalReviewFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.reviewAllData = action.payload;
            })
            .addCase(totalReviewFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default dashboardTotalReview.reducer