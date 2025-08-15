import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";


export const publisherManageFatched = createAsyncThunk(
    "totalPublisher/publisherManageFatched",
    async ({ params }) => {
        const res = await axiosSecure.get(`/api/dashboard/total_publisher?${params}`);
        return res.data.data
    }
)


const dashboardAuthorsManage = createSlice({
    name: "allPublishers",
    initialState: {
        totalpublisher: [],
        totalPages: 0,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(publisherManageFatched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publisherManageFatched.fulfilled, (state, action) => {
                state.loading = false;
                state.totalpublisher = action.payload.books;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(publisherManageFatched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default dashboardAuthorsManage.reducer