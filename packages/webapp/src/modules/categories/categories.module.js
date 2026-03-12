import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories: (state, action) => {
      state.items = action.payload;
    },
    setCategoriesLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCategoriesError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const { setCategories, setCategoriesLoading, setCategoriesError } =
  categoriesSlice.actions;

const authHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

// 🔥 SAME STYLE AS getProducts
export const getCategories =
  (params = {}) =>
  async (dispatch, getState) => {
    dispatch(setCategoriesLoading(true));
    dispatch(setCategoriesError(null));

    try {
      const token = getState().auth.token || localStorage.getItem("token");
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/categories`,
        {
          ...authHeaders(token),
          params: {
            ...params
          },
        },
      );

      dispatch(setCategories(res.data.data.docs));

      return res.data;
    } catch (error) {
      const message =
        error?.response?.data?.message || "Failed to fetch categories";

      dispatch(setCategoriesError(message));
      return { success: false, message };
    } finally {
      dispatch(setCategoriesLoading(false));
    }
  };

export default categoriesSlice.reducer;
