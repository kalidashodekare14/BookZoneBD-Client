import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../utils/axiosSecure";


export const publicViewBooks = createAsyncThunk(
    "viewDetailBooks/publicViewBooks",
    async ({ id }) => {
        const res = await axiosSecure.get(`/api/public/view_details/${id}`);
        return res.data.data
    }
)


const viewDetailBooks = createSlice({
    name: "viewDetail",
    initialState: {
        bookDetails: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(publicViewBooks.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publicViewBooks.fulfilled, (state, action) => {
                state.loading = false;
                state.bookDetails = action.payload;
            })
            .addCase(publicViewBooks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default viewDetailBooks.reducer