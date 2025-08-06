import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../utils/axiosSecure";

export const userOrderFetched = createAsyncThunk(
    'allUserOrder/userOrderFetched',
    async ({ email }) => {
        const res = await axiosSecure.get(`/api/userInfo/user_order/${email}`);
        return res.data.data
    }
)



const userOrderSlice = createSlice({
    name: 'user_order',
    initialState: {
        userOrder: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(userOrderFetched.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(userOrderFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.userOrder = action.payload;
            })
            .addCase(userOrderFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default userOrderSlice.reducer