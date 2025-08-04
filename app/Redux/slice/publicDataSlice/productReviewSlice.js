import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";

export const totalReviews = createAsyncThunk(
    'productReviews/totalReviews',
    async ({ id }) => {
        const res = await axiosSecure.get(`/api/public/total_review/${id}`);
        return res.data.data
    }
)

export const reviewCreate = createAsyncThunk(
    'productReviews/reviewCreate',
    async ({ data }) => {
        const res = await axiosSecure.post(`/api/public/product_review`, data)
        return res.data.data
    }
)




const reviewSlice = createSlice({
    name: 'review',
    initialState: {
        reviewsData: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(reviewCreate.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(reviewCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.reviewsData.unshift(action.payload);
            })
            .addCase(reviewCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // total reviews
            .addCase(totalReviews.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(totalReviews.fulfilled, (state, action) => {
                state.loading = false;
                state.reviewsData = action.payload
            })
            .addCase(totalReviews.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default reviewSlice.reducer