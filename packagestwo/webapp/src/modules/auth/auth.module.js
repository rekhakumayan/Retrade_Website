// Auth feature module:
// - Redux slice (state + reducers)
// - auth actions
// - async thunks for API calls
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { getCart } from "@/modules/cart/cart.module";
import { getVendorId } from "@/utils/helperFunction";

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
      if (typeof window !== "undefined") {
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
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

      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setToken, setAuthLoading, setAuthError, logout } =
  authSlice.actions;

export const userLogin = (data) => async (dispatch) => {
  // Track request lifecycle in module state for UI feedback.
  dispatch(setAuthLoading(true));
  dispatch(setAuthError(null));

  try {
    const vendorId = getVendorId();
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login?platform=webapp`,
      {
        email: data.email,
        password: data.password,
        vendorId : vendorId || "test",
      }, 
      
    );

    const token = res?.data?.data?.token;
    const user = res?.data?.data?.user;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    dispatch(setUser(user));
    dispatch(setToken(token));

    const sessionId = localStorage.getItem("sessionId");

    if (sessionId) {
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/cart/merge`,
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "x-session-id": sessionId,
            },
          }
        );
        dispatch(getCart());
      } catch (err) {
        console.error("Cart merge failed", err);
      }
    }


    return res.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Login failed";
    dispatch(setAuthError(message));
    return { success: false, message };
  } finally {
    dispatch(setAuthLoading(false));
  }
};

export const userSignup = (data) => async (dispatch) => {

  dispatch(setAuthLoading(true));
  dispatch(setAuthError(null));
  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/signup`,
      {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
        allowedVendors: [data.vendorId],
      },
    );
    return { success: true, data: res.data };
  } catch (error) {
    const message = error?.response?.data?.message || "Signup failed";
    dispatch(setAuthError(message));
    return { success: false, message };
  } finally {
    dispatch(setAuthLoading(false));
  }

};

export default authSlice.reducer;
