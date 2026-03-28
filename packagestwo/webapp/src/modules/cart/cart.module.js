import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
 
const API_URL = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/cart`;
 
const getSessionId = () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("sessionId");
};

const getToken = (auth) => auth?.token || localStorage.getItem("token");

const authHeaders = (token, sessionId) => ({
  headers: {
    Authorization: token ? `Bearer ${token}` : undefined,
    "x-session-id": sessionId || undefined,
  },
});
 
const initialState = {
  items: [],
  count: 0,
  loading: false,
  error: null,
};
 
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems: (state, action) => {
      state.items = action.payload;
    },
    setCartCount: (state, action) => {
      state.count = action.payload;
    },
    setCartLoading: (state, action) => {
      state.loading = action.payload;
    },
    setCartError: (state, action) => {
      state.error = action.payload;
    },
    clearCart: (state) => {
      state.items = [];
      state.count = 0;
    },

    clearCartLocal: (state) => {
      state.items = [];
      state.summary = null;
    },
  },
});

export const {
  setCartItems,
  setCartCount,
  setCartLoading,
  setCartError,
  clearCart,
} = cartSlice.actions;
 
export const getCart = () => async (dispatch, getState) => {
  dispatch(setCartLoading(true));
  dispatch(setCartError(null));

  try {
    const sessionId = getSessionId();
    const token = getToken(getState().auth);

    const res = await axios.get(API_URL, authHeaders(token, sessionId));
    const items = res.data?.data?.items || [];

    dispatch(setCartItems(items));
    dispatch(setCartCount(items.length));
    // dispatch(
    //   setCartCount(items.reduce((sum, item) => sum + (item.quantity || 0), 0)),
    // );

    return {
      success: true,
      data: res.data?.data || { items: [], summary: {} },
    };
  } catch (error) {
    const status = error?.response?.status;
    const message = error?.response?.data?.message || "Failed to fetch cart";

    if (status === 404) {
      dispatch(setCartItems([]));
      dispatch(setCartCount(0));
      return { success: true, data: { items: [], summary: {} } };
    }

    dispatch(setCartError(message));
    return { success: false, message };
  } finally {
    dispatch(setCartLoading(false));
  }
};


//ADD TO CART 
export const addToCart =
  (product, quantity = 1) =>
  async (dispatch, getState) => {
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));

    try {
      const sessionId = getSessionId();
      const token = getToken(getState().auth);

      const res = await axios.post(
        API_URL,
        { productId: product.productId, quantity },
        authHeaders(token, sessionId),
      );

      const items = res.data?.data?.items || [];
      // dispatch(getCart());
      // console.log(items);
      dispatch(setCartItems(items));
      dispatch(setCartCount(items.length));

      return { success: true, data: res.data?.data };
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to add to cart";
      dispatch(setCartError(message));
      return { success: false, message };
    } finally {
      dispatch(setCartLoading(false));
    }
  };

export const removeCartItem = (cartItemId) => async (dispatch, getState) => {
  dispatch(setCartLoading(true));
  dispatch(setCartError(null));

  try {
    const sessionId = getSessionId();
    const token = getToken(getState().auth);

    await axios.delete(
      `${API_URL}/${cartItemId}`,
      authHeaders(token, sessionId),
    );

    dispatch(getCart());

    return { success: true };
  } catch (error) {
    const message = error?.response?.data?.message || "Failed to remove item";
    dispatch(setCartError(message));
    return { success: false, message };
  } finally {
    dispatch(setCartLoading(false));
  }
};

export const updateCartItem =
  ({ id, quantity }) =>
  async (dispatch, getState) => {
    dispatch(setCartLoading(true));
    dispatch(setCartError(null));

    try {
      const sessionId = getSessionId();
      const token = getToken(getState().auth);

      const res = await axios.patch(
        `${API_URL}/${id}`,
        { quantity },
        authHeaders(token, sessionId),
      );

      const items = res.data?.data?.items || [];

      dispatch(setCartItems(items));
      dispatch(setCartCount(items.length));
      
      return { success: true, data: res.data?.data };
    } catch (error) {
      const message = error?.response?.data?.message || "Failed to update item";
      dispatch(setCartError(message));
      return { success: false, message };
    } finally {
      dispatch(setCartLoading(false));
    }
  };
export default cartSlice.reducer;
