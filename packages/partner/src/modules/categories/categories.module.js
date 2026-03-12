import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null,
  isModalOpen: false,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setCategories: (state, action) => {
      state.items = action.payload;
    },
    openModal: (state) => {
      state.isModalOpen = true;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const {
  setLoading,
  setCategories,
  openModal,
  closeModal,
  setError
} = categoriesSlice.actions;

//GET CATEGORIES
export const getCategories = (search="", page="1", limit="10") => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    dispatch(setLoading(true));
    dispatch(setError(null));
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/categories?$isearch=name|${search}&page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    dispatch(setCategories(res.data.data.docs));
    return res;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to fetch categories";
    dispatch(setError(message));
    return { success: false, message };
  } finally {
    dispatch(setLoading(false));
  }
};

// CREATE CATEGORY
export const createCategory = (data) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    dispatch(setLoading(true));
    dispatch(setError(null));
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/categories`,
      data, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    return { success: true };
  } catch (error) {
    const message =
      error?.response?.data?.error || "Failed to create category";
    dispatch(setError(message));
    return { success: false, message };
  } finally {
    dispatch(setLoading(false));
  }
};

// DELETE CATEGORY
export const deleteCategory = (id) => async (dispatch, getState) => {
  try {
    const token = getState().auth.token;
    dispatch(setLoading(true));
    dispatch(setError(null));
    await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/categories/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );
    return { success: true };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to delete category";
    dispatch(setError(message));
    return { success: false, message };
  } finally {
    dispatch(setLoading(false));
  }
};

export default categoriesSlice.reducer;