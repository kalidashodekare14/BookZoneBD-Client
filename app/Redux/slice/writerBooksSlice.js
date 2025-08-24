import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axiosSecure from "../../utils/axiosSecure";

export const writerBooksFetched = createAsyncThunk(
    'writerBooks/writerBooksFetched',
    async ({ id }) => {
        const res = await axiosSecure.get(`/api/writerInfo/writer_my_book/${id}`);
        return res.data.data
    }
)

export const writerBooksDataCreate = createAsyncThunk(
    'writerBooks/writerBooksDataCreate',
    async ({ data }) => {
        const res = await axiosSecure.post(`/api/writerInfo/writer_book_create`, data)
        return res.data.data
    }
)

export const writerBooksDataUpdate = createAsyncThunk(
    'writerBooks/writerBooksDataUpdate',
    async ({ id, data }) => {
        const res = await axiosSecure.patch(`/api/writerInfo/writer_book_update/${id}`, data)
        return res.data.data
    }
)

export const writerBookDelete = createAsyncThunk(
    'writerBooks/writerBookDelete',
    async ({ id }) => {
        const res = await axiosSecure.delete(`/api/writerInfo/writer_book_delete/${id}`)
        return res.data.data
    }
)




const writerProfileSlice = createSlice({
    name: 'writer_profile',
    initialState: {
        writerBook: [],
        loading: false,
        error: null
    },
    extraReducers: (builder) => {
        builder
            .addCase(writerBooksFetched.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(writerBooksFetched.fulfilled, (state, action) => {
                state.loading = false;
                state.writerBook = action.payload;
            })
            .addCase(writerBooksFetched.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // book add
            .addCase(writerBooksDataCreate.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(writerBooksDataCreate.fulfilled, (state, action) => {
                state.loading = false;
                state.writerBook.unshift(action.payload);
            })
            .addCase(writerBooksDataCreate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            
            // update book
            .addCase(writerBooksDataUpdate.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(writerBooksDataUpdate.fulfilled, (state, action) => {
                state.loading = false;
                const updateBook = action.payload;
                const index = state.writerBook.findIndex(role => role._id === updateBook._id);
                if (index !== -1) {
                    state.writerBook[index] = { ...state.writerBook[index], ...updateBook }
                }

            })
            .addCase(writerBooksDataUpdate.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })

            // Book delete


            .addCase(writerBookDelete.pending, (state, action) => {
                state.loading = true;
            })
            .addCase(writerBookDelete.fulfilled, (state, action) => {
                const deleteBook = action.payload;
                const index = state.writerBook.findIndex(book => book._id === deleteBook._id);
                if (index !== -1) {
                    state.writerBook.splice(index, 1);
                }
                state.loading = false;

            })
            .addCase(writerBookDelete.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
    }
})


export default writerProfileSlice.reducer