// modules/shop/shopSetting.module.js

import axios from "axios";
import { jwtDecode } from "jwt-decode";

const initialState = {
   logoLink: null,
  primaryColor: null,
  headerColor: null,
  ctaColor: null,

  loading: false,
  error: null,
  success: false,
};

const SET_LOADING = "shopSetting/SET_LOADING";
const SET_ERROR = "shopSetting/SET_ERROR";
const SET_SUCCESS = "shopSetting/SET_SUCCESS";
const SET_SETTINGS = "shopSetting/SET_SETTINGS";
const RESET_STATE = "shopSetting/RESET_STATE";


export default function shopSettingReducer(
  state = initialState,
  action
) {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.payload };

    case SET_ERROR:
      return { ...state, error: action.payload };

    case SET_SUCCESS:
      return { ...state, success: action.payload };

    case SET_SETTINGS:
      return {
        ...state,
        ...action.payload,
      };

    case RESET_STATE:
      return {
        ...state,
        loading: false,
        error: null,
        success: false,
      };

    default:
      return state;
  }
}

export const setLoading = (payload) => ({
  type: SET_LOADING,
  payload,
});

export const setError = (payload) => ({
  type: SET_ERROR,
  payload,
});

export const setSuccess = (payload) => ({
  type: SET_SUCCESS,
  payload,
});

export const setSettings = (payload) => ({
  type: SET_SETTINGS,
  payload,
});

export const resetState = () => ({
  type: RESET_STATE,
});

// FETCH SHOP SETTING 
export const fetchShopSettings = () => async (dispatch, getState) => {
  try {
    const token = getState().auth.token
    dispatch(setLoading(true));
    dispatch(setError(null));

    const decoded = jwtDecode(token)
    const userId = decoded.userId

    const res = await axios.get(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/vendors/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch(setSettings(res.data.data.theme));
  } catch (error) {
    dispatch(
      setError(
        error.response?.data?.message ||
        "Failed to fetch shop settings"
      )
    );
  } finally {
    dispatch(setLoading(false));
  }
};

//UPDATE THEMES
export const updateShopSettings =
  (payload) => async (dispatch, getState) => {
    try {
      dispatch(setLoading(true));
      dispatch(setError(null));
      dispatch(setSuccess(false));

      const token = getState().auth.token;

      const response = await axios.patch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/vendors/theme`,
        payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      );
      dispatch(setSettings(response.data));
      dispatch(setSuccess(true));
    } catch (error) {
      dispatch(
        setError(
          error.response?.data?.message ||
          "Failed to update shop settings"
        )
      );
    } finally {
      dispatch(setLoading(false));
    }
  };