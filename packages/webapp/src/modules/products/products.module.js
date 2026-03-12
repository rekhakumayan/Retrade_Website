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
  // Centralized auth header helper for products API calls.
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export const getProducts = (params = {}) => async (dispatch, getState) => {
  dispatch(setProductsLoading(true));
  dispatch(setProductsError(null));
 console.log("============================ i am within get products ")
  try {
    const token = getState().auth.token || localStorage.getItem("token");;
    console.log("token is ",token)  
    const res = await axios.get(
      // `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/products`,
      "http://localhost:8001/v1/products",
      {
        ...authHeaders(token),
        params: {
          "$populate": "categories",
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

// export const addProduct = (data) => async (dispatch, getState) => {
//   try {
//     const token = getState().auth.token;
//     const res = await axios.post(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/products`,
//       data,
//       authHeaders(token)
//     );

//     if (res?.data?.data) {
//       dispatch(addProductLocal(res.data.data));
//     }

//     return res.data;
//   } catch (error) {
//     const message = error?.response?.data?.message || "Failed to add product";
//     dispatch(setProductsError(message));
//     return { success: false, message };
//   }
// };

// export const editProduct = (data) => async (dispatch, getState) => {
//   try {
//     const token = getState().auth.token;
//     const res = await axios.put(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/products/${data._id}`,
//       data,
//       authHeaders(token)
//     );

//     if (res?.data?.data) {
//       dispatch(updateProductLocal(res.data.data));
//     }

//     return res.data;
//   } catch (error) {
//     const message = error?.response?.data?.message || "Failed to edit product";
//     dispatch(setProductsError(message));
//     return { success: false, message };
//   }
// };

// export const deleteProduct = (id) => async (dispatch, getState) => {
//   try {
//     const token = getState().auth.token;
//     const res = await axios.delete(
//       `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/products/${id}`,
//       authHeaders(token)
//     );

//     dispatch(removeProductLocal(id));
//     return res.data;
//   } catch (error) {
//     const message = error?.response?.data?.message || "Failed to delete product";
//     dispatch(setProductsError(message));
//     return { success: false, message };
//   }
// };

export default productsSlice.reducer;
