// Auth feature module:
// - Redux slice (state + reducers)
// - auth actions
// - async thunks for API calls
import { createSlice } from "@reduxjs/toolkit";
import api from "@/services/api";

const initialState = {
  token: null,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setAuthLoading: (state, action) => {
      state.loading = action.payload;
    },
    setAuthError: (state, action) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.error = null;

    },
  },
});

export const { setUser, setToken, setAuthLoading, setAuthError, logout } = authSlice.actions;

/* ===========================
   LOGIN THUNK
=========================== */

export const loginUser = (data) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  dispatch(setAuthError(null)); // reset previous error
  try {
    const res = await api.post('/v1/auth/login?platform=opsapp', {
      email: data.email,
      password: data.password
    });

    const token = res.data?.data?.token;
    const user = res.data?.data?.user;

    if (!token) {
      dispatch(setAuthError('Login failed.'));
      return { success: false };
    }

    if (user?.role !== 'admin') {
      dispatch(setAuthError('You do not have authority to access this dashboard.'));
      return { success: false };
    }

    dispatch(setToken(token));
    dispatch(setUser(user));

    return { success: true };

  } catch (error) {
    const message =
      error?.response?.data?.message || 'Login Failed';

    dispatch(setAuthError(message));
    return { success: false };
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export default authSlice.reducer;