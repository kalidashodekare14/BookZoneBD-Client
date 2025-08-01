import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPublic from "../../../utils/axiosPublic";

export const totalWriterFetched = createAsyncThunk(
    "allWriterData/totalWriterFetched",
    async () => {
        const res = await axiosPublic.get('/api/public/total_authors')
        return res.data.data
    }
)

const totalWriters = createSlice({
    name: "writer_data",
    initialState: {
        writerData: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(totalWriterFetched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(totalWriterFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.writerData = action.payload;
            })
            .addCase(totalWriterFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})

export default totalWriters.reducer;