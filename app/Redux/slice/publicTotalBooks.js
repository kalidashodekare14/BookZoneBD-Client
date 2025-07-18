import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPublic from "../../utils/axiosPublic";


export const totalPublicBook = createAsyncThunk(
    "totalBooks/totalPublicBook",
    async () => {
        const res = await axiosPublic.get('/api/public/all_books')
        return res.data.data
    }
)


const publicTotalBooks = createSlice({
    name: "books",
    initialState: {
        totalBook: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(totalPublicBook.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(totalPublicBook.fulfilled, (state, action) => {
                state.loading = false;
                state.totalBook = action.payload;
            })
            .addCase(totalPublicBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default publicTotalBooks.reducer