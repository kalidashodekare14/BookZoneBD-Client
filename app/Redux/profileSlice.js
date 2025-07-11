import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../utils/axiosSecure";

export const profileData = createAsyncThunk(
    'profile/fetchedProfileData',
    async ({ email }) => {
        const res = await axiosSecure.get(`/api/userInfo/profile/${email}`);
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
                state.loading = false;
            })
            .addCase(profileData.fulfilled, (state, action) => {
                state.userData = action.payload;
            })
            .addCase(profileData.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default profileSlice.reducer