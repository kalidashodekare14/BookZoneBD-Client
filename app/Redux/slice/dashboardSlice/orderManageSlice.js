import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../../utils/axiosSecure";


export const orderManageFatched = createAsyncThunk(
    "totalOrders/orderManageFatched",
    async () => {
        const res = await axiosSecure.get(`/api/dashboard/order_manage`);
        return res.data.data
    }
)

export const orderStatusUpdate = createAsyncThunk(
    "totalOrders/orderStatusUpdate",
    async ({ id, data }) => {
        const res = await axiosSecure.patch(`/api/dashboard/order_status/${id}`, data);
        return res.data.data
    }
)


const dashboardOrderManage = createSlice({
    name: "allAuthors",
    initialState: {
        totalOrder: [],
        totalPages: 0,
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(orderManageFatched.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(orderManageFatched.fulfilled, (state, action) => {
                state.loading = false;
                state.totalOrder = action.payload;
                state.totalPages = action.payload.totalPages;
            })
            .addCase(orderManageFatched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // update
            .addCase(orderStatusUpdate.pending, (state, action) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(orderStatusUpdate.fulfilled, (state, action) => {
                state.loading = false;
                const updateOrder = action.payload;
                const index = state.totalOrder.findIndex(order => order._id === updateOrder._id);
                if (index !== -1) {
                    state.totalOrder[index] = updateOrder
                }

            })
            .addCase(orderStatusUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default dashboardOrderManage.reducer