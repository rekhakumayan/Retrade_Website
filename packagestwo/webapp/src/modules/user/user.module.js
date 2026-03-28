// User feature module:
// Stores additional user profile state separate from auth credentials.
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import UserService from "./user.service";

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (userId, { rejectWithValue }) => {
    try {
      return await UserService.getUser(userId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateUserName = createAsyncThunk(
  "user/updateName",
  async ({ userId, name }, { rejectWithValue }) => {
    try {
      return await UserService.updateName(userId, name);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const addAddress = createAsyncThunk(
  "user/addAddress",
  async ({ userId, payload }, { rejectWithValue }) => {
    try {
      return await UserService.addAddress(userId, payload);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const updateAddress = createAsyncThunk(
  "user/updateAddress",
  async ({ userId, addressId, payload }, { rejectWithValue }) => {
    try {
      return await UserService.updateAddress(userId, addressId, payload);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const deleteAddress = createAsyncThunk(
  "user/deleteAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      return await UserService.deleteAddress(userId, addressId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

export const setDefaultAddress = createAsyncThunk(
  "user/setDefaultAddress",
  async ({ userId, addressId }, { rejectWithValue }) => {
    try {
      return await UserService.setDefaultAddress(userId, addressId);
    } catch (err) {
      return rejectWithValue(err.message);
    }
  },
);

const initialState = {
  profile: null,
  addresses: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    clearUserProfile: (state) => {
      state.profile = null;
      state.addresses = [];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (s) => {
        s.loading = true;
        s.error = null;
      })
      .addCase(fetchUser.fulfilled, (s, a) => {
        s.loading = false;
        s.profile = a.payload?.data || null;
        const incoming = a.payload?.data?.addresses;
        if (incoming !== undefined) {
          s.addresses = incoming;
        }
      })
      .addCase(fetchUser.rejected, (s, a) => {
        s.loading = false;
        s.error = a.payload;
      })
      .addCase(updateUserName.fulfilled, (s, a) => {
        if (s.profile) s.profile.name = a.payload?.data?.name;
      })
      .addCase(addAddress.fulfilled, (s, a) => {
        s.addresses = a.payload?.data?.addresses || s.addresses;
      })
      .addCase(updateAddress.fulfilled, (s, a) => {
        s.addresses = a.payload?.data?.addresses || s.addresses;
      })
      .addCase(deleteAddress.fulfilled, (s, a) => {
        s.addresses = a.payload?.data?.addresses || s.addresses;
      })
      .addCase(setDefaultAddress.fulfilled, (s, a) => {
        s.addresses = a.payload?.data?.addresses || s.addresses;
      });
  },
});

export const { setUserProfile, clearUserProfile } = userSlice.actions;

export default userSlice.reducer;
