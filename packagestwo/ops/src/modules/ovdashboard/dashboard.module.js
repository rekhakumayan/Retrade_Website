import { createSlice } from '@reduxjs/toolkit';
import api from '@/services/api';

const initialState = {
  stats: null,
  loading: false,
  error: null,
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setStats: (state, action) => {
      state.stats = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setStats, setLoading, setError } = dashboardSlice.actions;

export const getDashboard = () => async (dispatch, getState) => {
  dispatch(setLoading(true));
  dispatch(setError(null));

  try {
    const { token } = getState().auth;

    const res = await api.get('/v1/vendors/dashboard/count', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    console.log("API RESPONSE:", res.data);

    if (res?.data?.statusCode === 200) {
      console.log("DISPATCHED STATS:", res.data.data);
      dispatch(setStats(res.data.data[0]));
    }

    return res.data;

  } catch (error) {
    const message =
      error?.response?.data?.message || 'Failed to fetch dashboard';

    dispatch(setError(message));
    return { success: false, message };

  } finally {
    dispatch(setLoading(false));
  }
};

export default dashboardSlice.reducer;