import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPublic from "../../../utils/axiosPublic";

export const academicBooksFetched = createAsyncThunk(
    "academicBooks/academicBooksFetched",
    async () => {
        const res = await axiosPublic.get('/api/public/trending_books');
        return res.data.data
    }
)

const academicBooks = createSlice({
    name: "academic_books",
    initialState: {
        academicBook: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(academicBooksFetched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(academicBooksFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.academicBook = action.payload;
            })
            .addCase(academicBooksFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default academicBooks.reducer;