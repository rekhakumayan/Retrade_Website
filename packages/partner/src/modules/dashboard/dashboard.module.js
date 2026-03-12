import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {
    grossSales: 0,
    commission: 0,
    netEarnings: 0,
    totalProducts: 0,
    lowStockProducts: [],
    revenue: []
  },
  loading: false,
  error: null
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDashboardData: (state, action) => {
      state.data = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setLoading, setDashboardData, setError } = dashboardSlice.actions;


// GET DASHBOARD DATA
export const getDashboard = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/dashboard`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    );
    dispatch(setDashboardData(res.data.data));
   return res;
  } catch (error) {

    const message =
      error?.response?.data?.message || "Failed to fetch dashboard";
    dispatch(setError(message));
    return { success: false, message };

  } finally {
    dispatch(setLoading(false));
  }
};

export default dashboardSlice.reducer;