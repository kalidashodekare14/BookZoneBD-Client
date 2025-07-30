import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPublic from "../../utils/axiosPublic";


export const totalPublicBook = createAsyncThunk(
    "totalBooks/totalPublicBook",
    async ({ params }) => {
        const res = await axiosPublic.get(`/api/public/all_books?${params}`)
        console.log('checking recent books data', res.data.data.books)
        return res.data.data
    }
)


const publicTotalBooks = createSlice({
    name: "books",
    initialState: {
        allBooks: [],
        filteringData: [],
        totalPages: 0,
        totalItems: 0,
        currentPage: 0,
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
                state.allBooks = action.payload.books;
                state.filteringData = action.payload.filteringData;
                state.totalPages = action.payload.totalPages;
                state.totalItems = action.payload.totalItems;
                state.currentPage = action.payload.currentPage;
            })
            .addCase(totalPublicBook.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default publicTotalBooks.reducer