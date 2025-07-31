import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosPublic from "../../../utils/axiosPublic";


export const specialDiscountFetched = createAsyncThunk(
    "specialDiscountBooks/specialDiscountFetched",
    async () => {
        const res = await axiosPublic.get('/api/public/special_discount');
        return res.data.data
    }
)

const specialDiscount = createSlice({
    name: "discount",
    initialState: {
        discountData: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(specialDiscountFetched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(specialDiscountFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.discountData = action.payload;
            })
            .addCase(specialDiscountFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default specialDiscount.reducer