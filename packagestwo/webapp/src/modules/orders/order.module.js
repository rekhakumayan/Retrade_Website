import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import OrderService from "./order.service";

export const fetchOrders = createAsyncThunk(
  "order/fetchAll",
  async ({ userId, page = 1 }, { rejectWithValue }) => {
    try {
      const res = await OrderService.getByUser(userId, page);
      return { data: res.data, page };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const orderSlice = createSlice({
  name: "order",
  initialState: {
    list: [],
    loading: false,
    error: null,
    currentPage: 1,
    totalPages: 1, 
    totalDocs: 0,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchOrders.fulfilled, (s, a) => {
        s.loading = false;
        const { data, page } = a.payload;
        s.totalDocs = data?.totalDocs || 0;
        s.list = data?.docs || []; 
        s.currentPage = data?.page || 1;
        s.totalPages = data?.totalPages || 1; 
      })
      .addCase(fetchOrders.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      });
  },
});

export default orderSlice.reducer;
