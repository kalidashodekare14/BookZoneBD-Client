import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../utils/axiosSecure";

export const profileData = createAsyncThunk(
    'profile/profileData',
    async ({ email }) => {
        const res = await axiosSecure.get(`/api/userInfo/profile/${email}`);
        console.log('checking data', res);
        return res.data.data
    }
)

export const profileDataUpdate = createAsyncThunk(
    'profile/profileDataUpdate',
    async ({ email, data }) => {
        const res = await axiosSecure.patch(`/api/userInfo/user_information_update/${email}`, data)
        return res.data.data
    }
)




const profileSlice = createSlice({
    name: 'profile',
    initialState: {
        userData: null,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(profileData.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(profileData.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = action.payload;
            })
            .addCase(profileData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // info update
            .addCase(profileDataUpdate.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(profileDataUpdate.fulfilled, (state, action) => {
                state.loading = false;
                state.userData = { ...state.userData, ...action.payload };
            })
            .addCase(profileDataUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default profileSlice.reducer