import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../utils/axiosSecure";

export const writerBooksFetched = createAsyncThunk(
    'writerBooks/writerBooksFetched',
    async ({ id }) => {
        const res = await axiosSecure.get(`/api/writerInfo/writer_my_book/${id}`);
        return res.data.data
    }
)

export const writerBooksDataCreate = createAsyncThunk(
    'writerBooks/writerBooksDataCreate',
    async ({ data }) => {
        const res = await axiosSecure.post(`/api/writerInfo/writer_book_create`, data)
        return res.data.data
    }
)


const writerProfileSlice = createSlice({
    name: 'writer_profile',
    initialState: {
        writerBook: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(writerBooksFetched.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(writerBooksFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.writerBook = action.payload;
            })
            .addCase(writerBooksFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // info update
            .addCase(writerBooksDataCreate.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(writerBooksDataCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.writerBook.unshift(action.payload);
            })
            .addCase(writerBooksDataCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default writerProfileSlice.reducer