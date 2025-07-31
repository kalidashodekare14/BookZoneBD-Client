import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPublic from "../../../utils/axiosPublic";

export const trendingBooksFetched = createAsyncThunk(
    "trendingBooks/trendingBooksFetched",
    async () => {
        const res = await axiosPublic.get('/api/public/trending_books');
        return res.data.data
    }
)

const specialDiscount = createSlice({
    name: "trending_books",
    initialState: {
        trendingBook: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(trendingBooksFetched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(trendingBooksFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.trendingBook = action.payload;
            })
            .addCase(trendingBooksFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default specialDiscount.reducer;