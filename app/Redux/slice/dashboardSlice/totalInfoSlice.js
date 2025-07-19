import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";


export const totalInformation = createAsyncThunk(
    "totalInfo/totalInformation",
    async () => {
        const res = await axiosSecure('/api/dashboard/total_info');
        return res.data.data
    }
)


const dashboardTotalInfo = createSlice({
    name: "totalInfos",
    initialState: {
        allInfo: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(totalInformation.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(totalInformation.fulfilled, (state, action) => {
                state.loading = false;
                state.allInfo = action.payload;
            })
            .addCase(totalInformation.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default dashboardTotalInfo.reducer