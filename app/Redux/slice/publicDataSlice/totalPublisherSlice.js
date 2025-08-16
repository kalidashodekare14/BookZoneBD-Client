import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPublic from "../../../utils/axiosPublic";

export const totalPublisherFetched = createAsyncThunk(
    "allPublisherData/totalPublisherFetched",
    async () => {
        const res = await axiosPublic.get('/api/public/total_publisher')
        return res.data.data
    }
)

const totalPublishers = createSlice({
    name: "publisher_data",
    initialState: {
        publisherData: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(totalPublisherFetched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(totalPublisherFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.publisherData = action.payload;
            })
            .addCase(totalPublisherFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default totalPublishers.reducer;