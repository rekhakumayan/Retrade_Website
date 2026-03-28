import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setUser } from "@/modules/auth/auth.module";

const initialState = {
    profile: null,
    loading: false,
    error: null,
};

const partnerProfileSlice = createSlice({
    name: "partnerProfile",
    initialState,
    reducers: {
        setProfile: (state, action) => {
            state.profile = action.payload;
        },
        setProfileLoading: (state, action) => {
            state.loading = action.payload;
        },
        setProfileError: (state, action) => {
            state.error = action.payload;
        },
    },
});

export const {
    setProfile,
    setProfileLoading,
    setProfileError,
} = partnerProfileSlice.actions;


export const getPartnerProfile = () => async (dispatch, getState) => {
    const token = getState().auth.token;
    const user = getState().auth.user;
    const userId = user?.userId || user?._id;
    if (!userId) return;

    dispatch(setProfileLoading(true));
    dispatch(setProfileError(null));

    try {
        const res = await axios.get(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/vendors/${userId}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const vendor = res?.data?.data || {};

        const profileData = {
            name: user?.name || "",
            email: user?.email || "",
            role: user?.role || "",
            avatar: user?.avatar || "",

            contactName: vendor?.contactName || "",
            businessName: vendor?.businessName || "",
            businessEmail: vendor?.email || "",
            commissionRate: vendor?.commissionRate || "",
        }
        dispatch(setProfile(profileData));

        return profileData;
    } catch (error) {
        const message =
            error?.response?.data?.message || "Failed to fetch profile";

        dispatch(setProfileError(message));
        return { success: false, message };
    } finally {
        dispatch(setProfileLoading(false));
    }
};

export const updateUserProfile = (data) => async (dispatch, getState) => {
    const token = getState().auth.token;
    const user = getState().auth.user;

    const userId = user?.userId || user?._id;

    if (!userId) return;

    dispatch(setProfileError(null));

    try {
        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/${userId}`,
            data,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("API RESPONSE:%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%", res.data);
console.log("NEW AVATAR:@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@", res.data?.data?.avatar);

        dispatch(setUser({
            ...getState().auth.user,
            name: data.name,
        }));

        // await dispatch(getPartnerProfile());

        return res.data;
    } catch (error) {
        const message =
            error?.response?.data?.message || "Failed to update profile";

        dispatch(setProfileError(message));
        return { success: false, message };
    }
};

//avatar ///////////////////////////
export const updateUserAvatar = (file) => async (dispatch, getState) => {
    const token = getState().auth.token;
    const user = getState().auth.user;
    const userId = user?.userId || user?._id;

    if (!userId) return;

    try {
        const formData = new FormData();
        formData.append("avatar", file);

        const res = await axios.patch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1/user/${userId}/avatar`,
            formData,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        dispatch(setUser({
            ...getState().auth.user,
            avatar: res.data?.data?.avatar,
        }));

        return res.data;
    } catch (error) {
        const message =
            error?.response?.data?.message || "Failed to update avatar";

        dispatch(setProfileError(message));
        return { success: false, message };
    }
};

export default partnerProfileSlice.reducer;