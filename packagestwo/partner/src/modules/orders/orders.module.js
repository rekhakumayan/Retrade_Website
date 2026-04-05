import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  loading: false,
  error: null,
  totalPages: 1
};

export const fetchOrders = createAsyncThunk(
  "orders/fetchOrders",
  async (params) => {
     const persistedToken = localStorage.getItem("persist:token");

    const parsedToken = JSON.parse(persistedToken);

    const auth = JSON.parse(parsedToken.auth);

    const token = auth.token;

     const cleanParams = Object.fromEntries(
      Object.entries(params || {}).filter(([_, v]) => v && v !== "all")
    );

    const query = new URLSearchParams(cleanParams).toString();
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/orders?${query}`,{
       headers: {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json"
  }
    });

    const data = await response.json();
    return data.data;
  }
);

const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.docs;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default ordersSlice.reducer;