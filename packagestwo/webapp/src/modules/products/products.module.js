// Products feature module:
// - products slice
// - CRUD thunks
// - local state mutation reducers for fast UI updates
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null,
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    addProductLocal: (state, action) => {
      state.items = [action.payload, ...state.items];
    },
    updateProductLocal: (state, action) => {
      state.items = state.items.map((product) =>
        product._id === action.payload._id ? action.payload : product
      );
    },
    removeProductLocal: (state, action) => {
      state.items = state.items.filter(
        (product) => product._id !== action.payload
      );
    },
    setProductsLoading: (state, action) => {
      state.loading = action.payload;
    },
    setProductsError: (state, action) => {
      state.error = action.payload;
    },
  },
});

export const {
  setProducts,
  addProductLocal,
  updateProductLocal,
  removeProductLocal,
  setProductsLoading,
  setProductsError,
} = productsSlice.actions;

const authHeaders = (token) => ({
  headers: {
    ...(token && { Authorization: `Bearer ${token}` }),
  },
});

export const getProducts = (params = {}) => async (dispatch, getState) => {
  dispatch(setProductsLoading(true));
  dispatch(setProductsError(null));

  try {
    const token = getState().auth.token || localStorage.getItem("token");;
    console.log("================================== I AM WITHIN GETPRODUCTS ")
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/products`,
      // `http://api.marketnest.com/v1/products`,
      {
        ...authHeaders(token),
        params: {
          // "$populate": "categories",
          limit:500,
          // maybe here we can pass vendorId
          ...params
        }
      }
    );
    
    dispatch(setProducts(res.data.data.docs));

    return res.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to fetch products";
    dispatch(setProductsError(message));
    return { success: false, message };
  } finally {
    dispatch(setProductsLoading(false));
  }
};


export default productsSlice.reducer;
