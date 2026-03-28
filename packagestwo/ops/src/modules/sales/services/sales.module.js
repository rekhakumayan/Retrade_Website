import { createSlice } from '@reduxjs/toolkit';
import api from '@/services/api';

const initialState = {
	items: [],
	totalPages: 1,
	currentPage: 1,
	loading: false,
	error: null
};

const salesSlice = createSlice({
	name: 'sales',
	initialState,
	reducers: {
		setSales: (state, action) => {
			state.items = action.payload.docs;
			state.totalPages = action.payload.totalPages;
			state.currentPage = action.payload.page;
		},

		setLoading: (state, action) => {
			state.loading = action.payload;
		},

		setError: (state, action) => {
			state.error = action.payload;
		}
	}
});

export const { setSales, setLoading, setError } = salesSlice.actions;


// GET SALES TABLE
export const getSalesTable = ({ month, year, page =1,limit = 10} = {}) => async (dispatch, getState) => {
	dispatch(setLoading(true));
	dispatch(setError(null));

	try {

		const { token } = getState().auth;

		const res = await api.get('/v1/vendors/sales', {
			params: { month, year, page, limit },
			headers: {
				Authorization: `Bearer ${token}`
			}
		});	

		if (res?.data?.statusCode === 200) {
			dispatch(setSales(res.data.data));
		}

		return res.data;

	} catch (error) {

		const message =
			error?.response?.data?.message || 'Failed to fetch sales data';

		dispatch(setError(message));
		return { success: false, message };

	} finally {
		dispatch(setLoading(false));
	}
};

export default salesSlice.reducer;