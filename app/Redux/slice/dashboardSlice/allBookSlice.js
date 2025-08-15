import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";

export const dashboardTotalBooks = createAsyncThunk(
    "totalBooks/dashboardTotalBooks",
    async ({ paramsData }) => {
        const res = await axiosSecure.get(`/api/dashboard/total_books?${paramsData}`);
        return res.data.data
    }
)


export const dashboardBookUpdate = createAsyncThunk(
    "totalBooks/dashboardBookUpdate",
    async ({ id, data }) => {
        const res = await axiosSecure.patch(`/api/dashboard/book_update/${id}`, data);
        return res.data.data
    }
)


export const dashboardBookDelete = createAsyncThunk(
    "totalBooks/dashboardBookDelete",
    async ({ id }) => {
        const res = await axiosSecure.delete(`/api/dashboard/book_delete/${id}`);
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
                state.totalBook = action.payload.books;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(dashboardTotalBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })


            // Book update
            .addCase(dashboardBookUpdate.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(dashboardBookUpdate.fulfilled, (state, action) => {
                const updateBook = action.payload;
                const index = state.totalBook.findIndex(book => book._id === updateBook._id);
                if (index !== -1) {
                    state.totalBook[index] = { ...state.totalBook[index], ...updateBook };
                }
                state.loading = false;
            })
            .addCase(dashboardBookUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })

            // delete book

            .addCase(dashboardBookDelete.pending, (state, action) => {
                state.loading = true;
                state.error = null
            })
            .addCase(dashboardBookDelete.fulfilled, (state, action) => {
                const updateBook = action.payload;
                const index = state.totalBook.findIndex(book => book._id === updateBook._id);
                if (index !== -1) {
                    state.totalBook.splice(index, 1);
                }
                state.loading = false;
            })
            .addCase(dashboardBookDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload
            })
    }
})


export default dashboardAllBook.reducer