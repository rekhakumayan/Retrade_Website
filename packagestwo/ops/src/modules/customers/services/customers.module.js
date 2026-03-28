import { createSlice } from '@reduxjs/toolkit';
import api from '@/services/api';

const initialState = {
  items: [],
  stats: {},
  loading: false,
  error: null,
  page: 1,
  totalPages: 1,
  hasNextPage: false,
  hasPrevPage: false
};

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomers: (state, action) => {
      state.items = action.payload.docs;
      state.page = action.payload.page;
      state.totalPages = action.payload.totalPages;
      state.hasNextPage = action.payload.hasNextPage;
      state.hasPrevPage = action.payload.hasPrevPage;
    },

    setCustomerStats: (state, action) => {
      state.stats = action.payload;
    },

    setLoading: (state, action) => {
      state.loading = action.payload;
    },

    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setCustomers, setCustomerStats, setLoading, setError } =
  customersSlice.actions;


/* ---------------- GET CUSTOMERS LIST ---------------- */

export const getCustomers = ({ page = 1, limit = 10 } = {}) => async (dispatch, getState) => {

  dispatch(setLoading(true));
  dispatch(setError(null));

  try {

    const { token } = getState().auth;

    const res = await api.get(`/v1/vendors/customers?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res?.data?.statusCode === 200) {
      dispatch(setCustomers(res.data.data));
    }

    return res.data;

  } catch (error) {

    const message =
      error?.response?.data?.message || 'Failed to fetch customers';

    dispatch(setError(message));
    return { success: false, message };

  } finally {
    dispatch(setLoading(false));
  }
};


/* ---------------- GET CUSTOMER STATS ---------------- */

export const getCustomerStats = () => async (dispatch, getState) => {

  try {

    const { token } = getState().auth;

    const res = await api.get('/v1/vendors/customers/stats', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    if (res?.data?.statusCode === 200) {
      dispatch(setCustomerStats(res.data.data));
    }

    return res.data;

  } catch (error) {

    const message =
      error?.response?.data?.message || 'Failed to fetch customer stats';

    dispatch(setError(message));
    return { success: false, message };

  }
};
// Get Customer Details
export const getCustomerById = (id) => async (dispatch, getState) => {

  try {

    const { token } = getState().auth;

    const res = await api.get(`/v1/vendors/customers/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    return res.data;

  } catch (error) {

    const message =
      error?.response?.data?.message || 'Failed to fetch customer details';

    return { success: false, message };
  }
};

// Block / Unblock Customer

export const updateCustomerStatus = (id, status) => async (dispatch, getState) => {

  try {

    const { token } = getState().auth;

    const res = await api.patch(
      `/v1/vendors/customers/${id}/status`,
      { status },
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );

    dispatch(getCustomers());
    dispatch(getCustomerStats());

    return res.data;

  } catch (error) {

    const message =
      error?.response?.data?.message || 'Failed to update customer status';

    return { success: false, message };
  }
};
export default customersSlice.reducer;