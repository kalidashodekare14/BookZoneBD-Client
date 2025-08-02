import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";


export const orderDetailsFetched = createAsyncThunk(
    "viewOrderDetails/orderDetailsFetched",
    async ({ id }) => {
        const res = await axiosSecure.get(`/api/dashboard/order_details/${id}`);
        return res.data.data
    }
)


const viewDetailOrder = createSlice({
    name: "orderDetails",
    initialState: {
        orderDetails: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderDetailsFetched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(orderDetailsFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.orderDetails = action.payload;
            })
            .addCase(orderDetailsFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default viewDetailOrder.reducer