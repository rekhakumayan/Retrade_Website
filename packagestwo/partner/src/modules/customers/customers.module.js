import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null,
  totalPages: 1,
  totalDocs: 0,
};

const customersSlice = createSlice({
  name: "customers",
  initialState,

  reducers: {
    setCustomers: (state, action) => {
      state.items = action.payload;
    },

    setCustomersLoading: (state, action) => {
      state.loading = action.payload;
    },

    setCustomersError: (state, action) => {
      state.error = action.payload;
    },

    setPagination: (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.totalDocs = action.payload.totalDocs;
    },
  },
});

export const {
  setCustomers,
  setCustomersLoading,
  setCustomersError,
  setPagination,
} = customersSlice.actions;



export const getCustomers = (filters = {}) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    dispatch(setCustomersLoading(true));
    dispatch(setCustomersError(null));
    const params = {
      page: filters.page || 1,
      limit: 5,
    };
    if (filters.search && filters.search.trim() !== "") {
      params.search = filters.search.trim();
    }
    if (filters.date) {
      params.date = filters.date;
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/customers`,
      {
        params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const customers = res?.data?.data || [];
    

    dispatch(setCustomers(customers));
    return { success: true, data: customers };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to fetch customers";
    dispatch(setCustomersError(message));
    return { success: false, message };
  } finally {
    dispatch(setCustomersLoading(false));
  }

};



export default customersSlice.reducer;