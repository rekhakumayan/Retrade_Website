import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  data: {
    totalOrders: 0,
    grossSales: 0,
    commissionDeducted: 0,
    netEarnings: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    revenue: [],
    recentOrders: [],
    totalProducts: 0,
  },
  loading: false,
  error: null,
  notifications: []
};

const dashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setDashboardData: (state, action) => {
      state.data = {
        ...state.data,
        ...action.payload
      };
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload
    },
    setError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { setLoading, setDashboardData, setError, setNotifications } = dashboardSlice.actions;

// GET DASHBOARD DATA
export const getDashboard = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    dispatch(setLoading(true));
    dispatch(setError(null));

    const res = await axios.get(
      `http://localhost:8000/v1/orders/vendor-dashboard`,
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

// GET NOTIFICATIONS
export const getNotifications = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    const res = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/notifications`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }
    )
    dispatch(setNotifications(res.data.data.data))
    return res.data.data.data
  }
  catch (error) {
    const message =
      error?.response?.data?.message || "Failed to fetch dashboard";
    dispatch(setError(message));
    return { success: false, message };
  }
}

export const markRead = (id = null) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;

    const url = id
      ? `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/notifications/read?id=${id}`
      : `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/notifications/read`;

    await axios.patch(
      url,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await dispatch(getNotifications());

    return { success: true };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to mark notification(s)";

    dispatch(setError(message));

    return { success: false, message };
  }
};


export default dashboardSlice.reducer;