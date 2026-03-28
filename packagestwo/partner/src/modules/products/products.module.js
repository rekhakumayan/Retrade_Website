import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  items: [],
  loading: false,
  error: null,
  totalPages: 1,
  totalDocs: 0,
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
    setPagination: (state, action) => {
      state.totalPages = action.payload.totalPages;
      state.totalDocs = action.payload.totalDocs;
    },
  },
});

export const {
  setProducts,
  setPagination,
  addProductLocal,
  updateProductLocal,
  removeProductLocal,
  setProductsLoading,
  setProductsError,
} = productsSlice.actions;

export const getProducts = (filters = {}) => async (dispatch, getState) => {

  const token = getState().auth.token;
  dispatch(setProductsLoading(true));
  dispatch(setProductsError(null));
 
  try {
    const params = {
      page: filters.page || 1,
      limit: 5,
    };

    if (filters.search) {
      params.search = filters.search;
    }

    if (filters.stock === "inStock") {
      params["stock[$gt]"] = 0;
    }

    if (filters.stock === "lowStock") {
      params["stock[$gt]"] = 0;
      params["stock[$lte]"] = 5;
    }
    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/vendors/products`,
      {
        params: params,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  
    const result =
      res?.data?.data ||
      [];

    dispatch(setProducts(result.docs || []));
    dispatch(
      setPagination({
        page: result.page,
        totalPages: result.totalPages,
        totalDocs: result.totalDocs,
      })
    )

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to fetch products";
    dispatch(setProductsError(message));
    return { success: false, message };
  } finally {
    dispatch(setProductsLoading(false));
  }
};

//ADD PRODUCTS
export const addProduct = (data) => async (dispatch, getState) => {
  const token = getState().auth.token;
  dispatch(setProductsError(null));

  try {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/products`,
      data,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    await dispatch(getProducts());

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to add product";
    dispatch(setProductsError(message));
    return { success: false, message };
  }
};

export const editProduct = ({ id, data }) => async (dispatch) => {
  dispatch(setProductsError(null));

  try {
    console.log("Body SENt is here- ", data);
    const res = await axios.patch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/products/${id}`,
      data
    );

    await dispatch(getProducts());

    return res.data;
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to edit product";
    dispatch(setProductsError(message));
    return { success: false, message };
  }
};

//DELETE PRODUCT
export const deleteProduct = (id) => async (dispatch, getState) => {
  const token = getState().auth.token;
  dispatch(setProductsError(null));

  try {
    const res = await axios.delete(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/products/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );

    await dispatch(getProducts());

    return { statusCode: 200 };
  } catch (error) {
    const message =
      error?.response?.data?.message || "Failed to delete product";
    dispatch(setProductsError(message));
    return { statusCode: 500, message };
  }
};


export default productsSlice.reducer;