import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../utils/axiosSecure";


export const isAdminVerify = createAsyncThunk(
    "isAdmin/isAdminVerify",
    async ({ email }) => {
        const res = await axiosSecure.get(`/api/user_verify/isAdmin/${email}`)
        return res.data.admin
    }
)


const adminVerify = createSlice({
    name: "admin",
    initialState: {
        admin: false,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(isAdminVerify.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(isAdminVerify.fulfilled, (state, action) => {
                state.loading = false;
                state.admin = action.payload;
            })
            .addCase(isAdminVerify.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default adminVerify.reducer