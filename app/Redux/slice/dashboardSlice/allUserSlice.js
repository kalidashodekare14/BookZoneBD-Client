import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";


export const dashboardAllUser = createAsyncThunk(
    "totalUser/dashboardAllUser",
    async ({ params }) => {
        const res = await axiosSecure.get(`/api/dashboard/total_user?${params}`);
        return res.data.data
    }
)

export const dashboardUserRole = createAsyncThunk(
    "totalUser/dashboardUserRole",
    async ({ id, data }) => {
        const res = await axiosSecure.patch(`/api/dashboard/user_role/${id}`, data);
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
            // User Role Update
            .addCase(dashboardUserRole.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(dashboardUserRole.fulfilled, (state, action) => {
                state.loading = false;
                const updateRole = action.payload;
                const index = state.totalUser.findIndex(role => role._id === updateRole._id);
                if (index !== -1) {
                    state.totalUser[index] = updateRole
                }
            })
            .addCase(dashboardUserRole.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default dashboardAllBook.reducer