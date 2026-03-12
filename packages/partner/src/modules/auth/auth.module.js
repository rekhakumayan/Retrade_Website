import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
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

//LOGIN 
export const loginUser = (data) => async (dispatch) => {
  dispatch(setAuthLoading(true));
  dispatch(setAuthError(null));
  console.log("=========================== i am in login ")
  const { platform, ...body } = data;

  try {
    const res = await api.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/auth/login?platform=${platform}`,
      body
    );

    const token = res.data?.data?.token;
    const user = res.data?.data?.user;
   console.log("==================================token is ")
   console.log(token)
    if (!token) {
      dispatch(setAuthError("Login failed."));
      return { success: false };
    }

    const decoded = jwtDecode(token);

    const tokenPlatform = decoded.platform;
    const tokenRole = decoded.role;

    if (tokenRole !== "partner" || tokenPlatform !== "partnerapp") {
      dispatch(setAuthError("You are not allowed to access partner dashboard"));
      return { success: false };
    }

    dispatch(setToken(token));
    dispatch(setUser(user));
    return { success: true };

  } catch (error) {
    let message = "Login Failed";

    if (error?.response?.status === 401) {
      message = "Invalid credentials";
    }

    if (error?.response?.status === 403) {
      message = "Access denied";
    }

    dispatch(setAuthError(message));
    return { success: false };
  } finally {
    dispatch(setAuthLoading(false));
  }
};

//LOGOUT
export const logoutUser = () => async(dispatch) => {
  
  localStorage.removeItem("persist:root"); 
  dispatch(setToken(null));
  dispatch(setUser(null));
};

export default authSlice.reducer;

