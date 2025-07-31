import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";

export const dashboardTotalBooks = createAsyncThunk(
    "totalBooks/dashboardTotalBooks",
    async ({ paramsData }) => {
        const res = await axiosSecure.get(`/api/dashboard/total_books?${paramsData}`);
        return res.data.data
    }
)


const dashboardAllBook = createSlice({
    name: "allBook",
    initialState: {
        totalBook: [],
        totalPages: 0,
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
                state.totalBook = action.payload.books;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(dashboardTotalBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})


export default dashboardAllBook.reducer