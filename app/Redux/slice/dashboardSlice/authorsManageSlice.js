import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";


export const authorManageFatched = createAsyncThunk(
    "totalAuthors/authorManageFatched",
    async ({ params }) => {
        const res = await axiosSecure.get(`/api/dashboard/total_author?${params}`);
        return res.data.data
    }
)


const dashboardAuthorsManage = createSlice({
    name: "allAuthors",
    initialState: {
        totalAuthor: [],
        totalPages: 0,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(authorManageFatched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(authorManageFatched.fulfilled, (state, action) => {
                state.loading = false;
                state.totalAuthor = action.payload.books;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(authorManageFatched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default dashboardAuthorsManage.reducer