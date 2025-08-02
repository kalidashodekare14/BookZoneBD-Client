import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPublic from "../../../utils/axiosPublic";


export const writerDetailsFetched = createAsyncThunk(
    "viewDetailWriter/writerDetailsFetched",
    async ({ id }) => {
        const res = await axiosPublic.get(`/api/public/view_writer/${id}`);
        return res.data.data
    }
)


const writerDetails = createSlice({
    name: "viewWriterDetails",
    initialState: {
        writerData: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(writerDetailsFetched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(writerDetailsFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.writerData = action.payload;
            })
            .addCase(writerDetailsFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default writerDetails.reducer