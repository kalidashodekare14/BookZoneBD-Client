import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../utils/axiosSecure";

export const writerProfileFetched = createAsyncThunk(
    'writerProfile/writerProfileData',
    async ({ email }) => {
        const res = await axiosSecure.get(`/api/writerInfo/writer_info/${email}`);
        return res.data.data
    }
)

export const writerProfileDataUpdate = createAsyncThunk(
    'writerProfile/writerProfileDataUpdate',
    async ({ email, data }) => {
        const res = await axiosSecure.patch(`/api/writerInfo/writer_info_update/${email}`, data)
        return res.data.data
    }
)




const writerProfileSlice = createSlice({
    name: 'writer_profile',
    initialState: {
        writerData: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(writerProfileFetched.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(writerProfileFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.writerData = action.payload;
            })
            .addCase(writerProfileFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // info update
            .addCase(writerProfileDataUpdate.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(writerProfileDataUpdate.fulfilled, (state, action) => {
                state.loading = false;
                state.writerData = { ...state.writerData, ...action.payload };
            })
            .addCase(writerProfileDataUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default writerProfileSlice.reducer