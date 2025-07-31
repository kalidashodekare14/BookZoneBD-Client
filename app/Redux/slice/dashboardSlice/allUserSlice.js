import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";


export const dashboardAllUser = createAsyncThunk(
    "totalUser/dashboardAllUser",
    async ({ params }) => {
        const res = await axiosSecure(`/api/dashboard/total_user?${params}`);
        return res.data.data
    }
)


const dashboardAllBook = createSlice({
    name: "allUsers",
    initialState: {
        totalUser: [],
        totalPages: 0,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(dashboardAllUser.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dashboardAllUser.fulfilled, (state, action) => {
                state.loading = false;
                state.totalUser = action.payload.users;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(dashboardAllUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default dashboardAllBook.reducer