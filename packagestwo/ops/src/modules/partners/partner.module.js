// Partners feature module
// Full production-ready Redux logic

import { createSlice } from '@reduxjs/toolkit';
import api from '@/services/api';

const initialState = {
    items: [],
    loading: false,
    error: null,

    createLoading: false,
    createError: null,
    createSuccess: false,

    updateLoadingId: null,
    updateError: null,

    pagination: {
        page: 1,
        totalPages: 1,
        totalDocs: 0,
    },
};

const partnersSlice = createSlice({
    name: 'partners',
    initialState,
    reducers: {
        setPartners: (state, action) => {
            state.items = action.payload;
        },

        addPartnerLocal: (state, action) => {
            state.items = [action.payload, ...state.items];
        },

        updatePartnerLocal: (state, action) => {
            state.items = state.items.map((partner) =>
                partner._id === action.payload._id ? action.payload : partner
            );
        },

        setLoading: (state, action) => {
            state.loading = action.payload;
        },

        setError: (state, action) => {
            state.error = action.payload;
        },

        setCreateLoading: (state, action) => {
            state.createLoading = action.payload;
        },

        setCreateError: (state, action) => {
            state.createError = action.payload;
        },

        setCreateSuccess: (state, action) => {
            state.createSuccess = action.payload;
        },

        setUpdateLoadingId: (state, action) => {
            state.updateLoadingId = action.payload;
        },

        setUpdateError: (state, action) => {
            state.updateError = action.payload;
        },

        resetCreateState: (state) => {
            state.createLoading = false;
            state.createError = null;
            state.createSuccess = false;
        },

        resetUpdateState: (state) => {
            state.updateLoadingId = null;
            state.updateError = null;
        },

        setPagination: (state, action) => {
            state.pagination = action.payload;
        },
    },
});

export const {
    setPartners,
    addPartnerLocal,
    updatePartnerLocal,
    setLoading,
    setError,
    setCreateLoading,
    setCreateError,
    setCreateSuccess,
    setUpdateLoadingId,
    setUpdateError,
    resetCreateState,
    resetUpdateState,
    setPagination
} = partnersSlice.actions;


export const getPartners = (page = 1, limit = 10) => async (dispatch, getState) => {
    dispatch(setLoading(true));
    dispatch(setError(null));

    try {
        const { token } = getState().auth;
        const res = await api.get(`/v1/vendors?page=${page}&limit=${limit}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        console.log('PARTNERS API RESPONSE:', res.data);

        if (res?.data?.statusCode === 200) {
            dispatch(setPartners(res.data.data.docs));

            dispatch(setPagination({
                page: res.data.data.page,
                totalPages: res.data.data.totalPages,
                totalDocs: res.data.data.totalDocs,
            }));
        }

        return res.data;
    } catch (error) {
        const message =
            error?.response?.data?.message || 'Failed to fetch partners';
        dispatch(setError(message));
        return { success: false, message };
    } finally {
        dispatch(setLoading(false));
    }
};


//    CREATE PARTNER

export const addPartner = (data) => async (dispatch, getState) => {
    dispatch(setCreateLoading(true));
    dispatch(setCreateError(null));
    dispatch(setCreateSuccess(false));

    try {
        const { token } = getState().auth;
        const res = await api.post('/v1/vendors', data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }
        );

        if (res?.data?.statusCode === 201 || res?.data?.data) {
            dispatch(addPartnerLocal(res.data.data));
            dispatch(setCreateSuccess(true));
        }

        return res.data;
    } catch (error) {
        const message =
            error?.response?.data?.message || 'Failed to create partner';
        dispatch(setCreateError(message));
        return { success: false, message };
    } finally {
        dispatch(setCreateLoading(false));
    }
};


//    UPDATE STATUS

export const updatePartnerStatus = (id, status) => async (dispatch, getState) => {
    dispatch(setUpdateLoadingId(id));
    dispatch(setUpdateError(null));

    try {
        const { token } = getState().auth;
        const res = await api.patch(`/v1/vendors/${id}/status`, { status },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },

            }
        );

        if (res?.data?.data) {
            dispatch(updatePartnerLocal(res.data.data));
        }

        return res.data;
    } catch (error) {
        const message =
            error?.response?.data?.message || 'Status update failed';
        dispatch(setUpdateError(message));
        return { success: false, message };
    } finally {
        dispatch(setUpdateLoadingId(null));
    }
};


//    UPDATE COMMISSION

export const updatePartnerCommission = (id, commissionRate) => async (dispatch, getState) => {
    dispatch(setUpdateLoadingId(true));
    dispatch(setUpdateError(null));

    try {
        const { token } = getState().auth;
        const res = await api.patch(`/v1/vendors/${id}/commission`, {
            commissionRate
        },
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

        if (res?.data?.data) {
            dispatch(updatePartnerLocal(res.data.data));
        }

        return res.data;
    } catch (error) {
        const message =
            error?.response?.data?.message || 'Commission update failed';
        dispatch(setUpdateError(message));
        return { success: false, message };
    } finally {
        dispatch(setUpdateLoadingId(null));
    }
};

export default partnersSlice.reducer;