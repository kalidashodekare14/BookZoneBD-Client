import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPublic from "../../utils/axiosPublic";


export const totalPublicBook = createAsyncThunk(
    "totalBooks/totalPublicBook",
    async () => {
        const res = await axiosPublic.get('/api/public/all_books')
        console.log('checking books data', res.data.data)
        return res.data.data
    }
)


const publicTotalBooks = createSlice({
    name: "books",
    initialState: {
        allBooks: [],
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
                state.allBooks = action.payload;
            })
            .addCase(totalPublicBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default publicTotalBooks.reducer