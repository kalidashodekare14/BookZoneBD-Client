import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";


export const publisherManageFatched = createAsyncThunk(
    "totalPublisher/publisherManageFatched",
    async ({ params }) => {
        const res = await axiosSecure.get(`/api/dashboard/total_publisher?${params}`);
        return res.data.data
    }
)

export const publisherDataUpdate = createAsyncThunk(
    "totalPublisher/publisherDataUpdate",
    async ({ id, data }) => {
        const res = await axiosSecure.patch(`/api/dashboard/publisher_info_update/${id}`, data);
        return res.data.data
    }
)


export const publisherDataDelete = createAsyncThunk(
    "totalPublisher/publisherDataDelete",
    async ({ id }) => {
        const res = await axiosSecure.delete(`/api/dashboard/publisher_delete/${id}`);
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
                state.totalpublisher = action.payload.books;
                state.totalPages = action.payload.totalPages;
                state.loading = false;
            })
            .addCase(publisherManageFatched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // Publisher data update
            .addCase(publisherDataUpdate.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publisherDataUpdate.fulfilled, (state, action) => {
                const publisherData = action.payload
                const index = state.totalpublisher.findIndex(publisher => publisher._id === publisherData._id);
                if (index !== -1) {
                    state.totalpublisher[index] = { ...state.totalpublisher[index], ...publisherData }
                }
                state.loading = false;
            })
            .addCase(publisherDataUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })


            // Publisher data delete
            .addCase(publisherDataDelete.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(publisherDataDelete.fulfilled, (state, action) => {
                const publisherData = action.payload
                const index = state.totalpublisher.findIndex(publisher => publisher._id === publisherData._id);
                if (index !== -1) {
                    state.totalpublisher.splice(index, 1);
                }
                state.loading = false;
            })
            .addCase(publisherDataDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default dashboardAuthorsManage.reducer