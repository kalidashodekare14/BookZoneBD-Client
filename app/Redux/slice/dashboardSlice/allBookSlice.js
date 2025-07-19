import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";

export const dashboardTotalBooks = createAsyncThunk(
    "totalBooks/dashboardTotalBooks",
    async () => {
        const res = await axiosSecure.get('/api/dashboard/total_books');
        return res.data.data
    }
)


const dashboardAllBook = createSlice({
    name: "allBook",
    initialState: {
        totalBook: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(dashboardTotalBooks.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(dashboardTotalBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.totalBook = action.payload;
            })
            .addCase(dashboardTotalBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})


export default dashboardAllBook.reducer