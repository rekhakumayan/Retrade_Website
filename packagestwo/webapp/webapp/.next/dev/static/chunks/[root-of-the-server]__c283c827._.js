(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/modules/cart/cart.module.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "addToCart",
    ()=>addToCart,
    "clearCart",
    ()=>clearCart,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCart",
    ()=>getCart,
    "removeCartItem",
    ()=>removeCartItem,
    "setCartCount",
    ()=>setCartCount,
    "setCartError",
    ()=>setCartError,
    "setCartItems",
    ()=>setCartItems,
    "setCartLoading",
    ()=>setCartLoading,
    "updateCartItem",
    ()=>updateCartItem
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/webapp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@reduxjs/toolkit'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'axios'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
const API_URL = `${("TURBOPACK compile-time value", "http://api.marketnest.com")}/v1/cart`;
const getSessionId = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return localStorage.getItem("sessionId");
};
const getToken = (auth)=>auth?.token || localStorage.getItem("token");
const authHeaders = (token, sessionId)=>({
        headers: {
            Authorization: token ? `Bearer ${token}` : undefined,
            "x-session-id": sessionId || undefined
        }
    });
const initialState = {
    items: [],
    count: 0,
    loading: false,
    error: null
};
const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {
        setCartItems: (state, action)=>{
            state.items = action.payload;
        },
        setCartCount: (state, action)=>{
            state.count = action.payload;
        },
        setCartLoading: (state, action)=>{
            state.loading = action.payload;
        },
        setCartError: (state, action)=>{
            state.error = action.payload;
        },
        clearCart: (state)=>{
            state.items = [];
            state.count = 0;
        },
        clearCartLocal: (state)=>{
            state.items = [];
            state.summary = null;
        }
    }
});
const { setCartItems, setCartCount, setCartLoading, setCartError, clearCart } = cartSlice.actions;
const getCart = ()=>async (dispatch, getState)=>{
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
                data: res.data?.data || {
                    items: [],
                    summary: {}
                }
            };
        } catch (error) {
            const status = error?.response?.status;
            const message = error?.response?.data?.message || "Failed to fetch cart";
            if (status === 404) {
                dispatch(setCartItems([]));
                dispatch(setCartCount(0));
                return {
                    success: true,
                    data: {
                        items: [],
                        summary: {}
                    }
                };
            }
            dispatch(setCartError(message));
            return {
                success: false,
                message
            };
        } finally{
            dispatch(setCartLoading(false));
        }
    };
const addToCart = (product, quantity = 1)=>async (dispatch, getState)=>{
        dispatch(setCartLoading(true));
        dispatch(setCartError(null));
        try {
            const sessionId = getSessionId();
            const token = getToken(getState().auth);
            const res = await axios.post(API_URL, {
                productId: product.productId,
                quantity
            }, authHeaders(token, sessionId));
            const items = res.data?.data?.items || [];
            // dispatch(getCart());
            // console.log(items);
            dispatch(setCartItems(items));
            dispatch(setCartCount(items.length));
            return {
                success: true,
                data: res.data?.data
            };
        } catch (error) {
            const message = error?.response?.data?.message || "Failed to add to cart";
            dispatch(setCartError(message));
            return {
                success: false,
                message
            };
        } finally{
            dispatch(setCartLoading(false));
        }
    };
const removeCartItem = (cartItemId)=>async (dispatch, getState)=>{
        dispatch(setCartLoading(true));
        dispatch(setCartError(null));
        try {
            const sessionId = getSessionId();
            const token = getToken(getState().auth);
            await axios.delete(`${API_URL}/${cartItemId}`, authHeaders(token, sessionId));
            dispatch(getCart());
            return {
                success: true
            };
        } catch (error) {
            const message = error?.response?.data?.message || "Failed to remove item";
            dispatch(setCartError(message));
            return {
                success: false,
                message
            };
        } finally{
            dispatch(setCartLoading(false));
        }
    };
const updateCartItem = ({ id, quantity })=>async (dispatch, getState)=>{
        dispatch(setCartLoading(true));
        dispatch(setCartError(null));
        try {
            const sessionId = getSessionId();
            const token = getToken(getState().auth);
            const res = await axios.patch(`${API_URL}/${id}`, {
                quantity
            }, authHeaders(token, sessionId));
            const items = res.data?.data?.items || [];
            dispatch(setCartItems(items));
            dispatch(setCartCount(items.length));
            return {
                success: true,
                data: res.data?.data
            };
        } catch (error) {
            const message = error?.response?.data?.message || "Failed to update item";
            dispatch(setCartError(message));
            return {
                success: false,
                message
            };
        } finally{
            dispatch(setCartLoading(false));
        }
    };
const __TURBOPACK__default__export__ = cartSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/helperFunction.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "getVendorId",
    ()=>getVendorId
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/webapp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const getVendorId = ()=>{
    const vendorId = ("TURBOPACK compile-time value", "69a974f1e91b63b3740e681e");
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    return vendorId;
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/auth/auth.module.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Auth feature module:
// - Redux slice (state + reducers)
// - auth actions
// - async thunks for API calls
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "logout",
    ()=>logout,
    "setAuthError",
    ()=>setAuthError,
    "setAuthLoading",
    ()=>setAuthLoading,
    "setToken",
    ()=>setToken,
    "setUser",
    ()=>setUser,
    "userLogin",
    ()=>userLogin,
    "userSignup",
    ()=>userSignup
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/webapp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@reduxjs/toolkit'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'axios'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$cart$2f$cart$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/cart/cart.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helperFunction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/helperFunction.js [app-client] (ecmascript)");
;
;
;
;
const initialState = {
    token: null,
    user: null,
    loading: false,
    error: null
};
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setUser: (state, action)=>{
            state.user = action.payload;
            if ("TURBOPACK compile-time truthy", 1) {
                localStorage.setItem("user", JSON.stringify(action.payload));
            }
        },
        setToken: (state, action)=>{
            state.token = action.payload;
        },
        setAuthLoading: (state, action)=>{
            state.loading = action.payload;
        },
        setAuthError: (state, action)=>{
            state.error = action.payload;
        },
        logout: (state)=>{
            state.token = null;
            state.user = null;
            state.error = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        }
    }
});
const { setUser, setToken, setAuthLoading, setAuthError, logout } = authSlice.actions;
const userLogin = (data)=>async (dispatch)=>{
        // Track request lifecycle in module state for UI feedback.
        dispatch(setAuthLoading(true));
        dispatch(setAuthError(null));
        try {
            const vendorId = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$helperFunction$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getVendorId"])();
            const res = await axios.post(`${("TURBOPACK compile-time value", "http://api.marketnest.com")}/v1/auth/login?platform=webapp`, {
                email: data.email,
                password: data.password,
                vendorId: vendorId || "test"
            });
            const token = res?.data?.data?.token;
            const user = res?.data?.data?.user;
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            dispatch(setUser(user));
            dispatch(setToken(token));
            const sessionId = localStorage.getItem("sessionId");
            if (sessionId) {
                try {
                    await axios.post(`${("TURBOPACK compile-time value", "http://api.marketnest.com")}/v1/cart/merge`, {}, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            "x-session-id": sessionId
                        }
                    });
                    dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$cart$2f$cart$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCart"])());
                } catch (err) {
                    console.error("Cart merge failed", err);
                }
            }
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Login failed";
            dispatch(setAuthError(message));
            return {
                success: false,
                message
            };
        } finally{
            dispatch(setAuthLoading(false));
        }
    };
const userSignup = (data)=>async (dispatch)=>{
        dispatch(setAuthLoading(true));
        dispatch(setAuthError(null));
        try {
            const res = await axios.post(`${("TURBOPACK compile-time value", "http://api.marketnest.com")}/v1/auth/signup`, {
                name: data.name,
                email: data.email,
                password: data.password,
                role: data.role,
                allowedVendors: [
                    data.vendorId
                ]
            });
            return {
                success: true,
                data: res.data
            };
        } catch (error) {
            const message = error?.response?.data?.message || "Signup failed";
            dispatch(setAuthError(message));
            return {
                success: false,
                message
            };
        } finally{
            dispatch(setAuthLoading(false));
        }
    };
const __TURBOPACK__default__export__ = authSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/auth/auth.selectors.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Auth selectors:
// Keep component access to state centralized and reusable.
__turbopack_context__.s([
    "selectAuth",
    ()=>selectAuth,
    "selectAuthError",
    ()=>selectAuthError,
    "selectAuthLoading",
    ()=>selectAuthLoading,
    "selectCurrentUser",
    ()=>selectCurrentUser,
    "selectToken",
    ()=>selectToken
]);
const selectAuth = (state)=>state.auth;
const selectToken = (state)=>state.auth.token;
const selectCurrentUser = (state)=>state.auth.user;
const selectAuthLoading = (state)=>state.auth.loading;
const selectAuthError = (state)=>state.auth.error;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/lib/api.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiRequest",
    ()=>apiRequest
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/webapp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/store.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$auth$2e$selectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/auth/auth.selectors.js [app-client] (ecmascript)");
;
;
const BASE_URL = ("TURBOPACK compile-time value", "http://api.marketnest.com");
async function apiRequest(method, path, body = null) {
    const token = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$auth$2e$selectors$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["selectToken"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"].getState());
    const headers = {
        "Content-Type": "application/json"
    };
    if (token) headers["authorization"] = `Bearer ${token}`;
    const options = {
        method,
        headers
    };
    if (body) options.body = JSON.stringify(body);
    const res = await fetch(`${BASE_URL}/v1${path}`, options);
    const data = await res.json();
    if (!res.ok) throw new Error(data.message || "Something went wrong");
    return data;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/user/user.service.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.js [app-client] (ecmascript)");
;
const UserService = {
    // GET /v1/user/{userId} — user details + addresses
    getUser: (userId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])("GET", `/user/${userId}`),
    // PATCH /v1/user/{userId} — name update
    updateName: (userId, name)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])("PATCH", `/user/${userId}`, {
            name
        }),
    // PATCH /v1/user/{userId} — address add
    addAddress: (userId, payload)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])("PATCH", `/user/${userId}`, {
            addressAction: {
                data: payload
            }
        }),
    // PATCH /v1/user/{userId} — address update
    updateAddress: (userId, addressId, payload)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])("PATCH", `/user/${userId}`, {
            addressAction: {
                addressId,
                data: payload
            }
        }),
    // PATCH /v1/user/{userId} — address delete
    deleteAddress: (userId, addressId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])("PATCH", `/user/${userId}`, {
            addressAction: {
                addressId,
                delete: true
            }
        }),
    // PATCH /v1/user/{userId} — set default address
    setDefaultAddress: (userId, addressId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])("PATCH", `/user/${userId}`, {
            addressAction: {
                addressId,
                isDefault: true
            }
        })
};
const __TURBOPACK__default__export__ = UserService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/user/user.module.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// User feature module:
// Stores additional user profile state separate from auth credentials.
__turbopack_context__.s([
    "addAddress",
    ()=>addAddress,
    "clearUserProfile",
    ()=>clearUserProfile,
    "default",
    ()=>__TURBOPACK__default__export__,
    "deleteAddress",
    ()=>deleteAddress,
    "fetchUser",
    ()=>fetchUser,
    "setDefaultAddress",
    ()=>setDefaultAddress,
    "setUserProfile",
    ()=>setUserProfile,
    "updateAddress",
    ()=>updateAddress,
    "updateUserName",
    ()=>updateUserName
]);
(()=>{
    const e = new Error("Cannot find module '@reduxjs/toolkit'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$user$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/user/user.service.js [app-client] (ecmascript)");
;
;
const fetchUser = createAsyncThunk("user/fetchUser", async (userId, { rejectWithValue })=>{
    try {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$user$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getUser(userId);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
const updateUserName = createAsyncThunk("user/updateName", async ({ userId, name }, { rejectWithValue })=>{
    try {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$user$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].updateName(userId, name);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
const addAddress = createAsyncThunk("user/addAddress", async ({ userId, payload }, { rejectWithValue })=>{
    try {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$user$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].addAddress(userId, payload);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
const updateAddress = createAsyncThunk("user/updateAddress", async ({ userId, addressId, payload }, { rejectWithValue })=>{
    try {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$user$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].updateAddress(userId, addressId, payload);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
const deleteAddress = createAsyncThunk("user/deleteAddress", async ({ userId, addressId }, { rejectWithValue })=>{
    try {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$user$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].deleteAddress(userId, addressId);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
const setDefaultAddress = createAsyncThunk("user/setDefaultAddress", async ({ userId, addressId }, { rejectWithValue })=>{
    try {
        return await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$user$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].setDefaultAddress(userId, addressId);
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
const initialState = {
    profile: null,
    addresses: [],
    loading: false,
    error: null
};
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUserProfile: (state, action)=>{
            state.profile = action.payload;
        },
        clearUserProfile: (state)=>{
            state.profile = null;
            state.addresses = [];
        }
    },
    extraReducers: (builder)=>{
        builder.addCase(fetchUser.pending, (s)=>{
            s.loading = true;
            s.error = null;
        }).addCase(fetchUser.fulfilled, (s, a)=>{
            s.loading = false;
            s.profile = a.payload?.data || null;
            const incoming = a.payload?.data?.addresses;
            if (incoming !== undefined) {
                s.addresses = incoming;
            }
        }).addCase(fetchUser.rejected, (s, a)=>{
            s.loading = false;
            s.error = a.payload;
        }).addCase(updateUserName.fulfilled, (s, a)=>{
            if (s.profile) s.profile.name = a.payload?.data?.name;
        }).addCase(addAddress.fulfilled, (s, a)=>{
            s.addresses = a.payload?.data?.addresses || s.addresses;
        }).addCase(updateAddress.fulfilled, (s, a)=>{
            s.addresses = a.payload?.data?.addresses || s.addresses;
        }).addCase(deleteAddress.fulfilled, (s, a)=>{
            s.addresses = a.payload?.data?.addresses || s.addresses;
        }).addCase(setDefaultAddress.fulfilled, (s, a)=>{
            s.addresses = a.payload?.data?.addresses || s.addresses;
        });
    }
});
const { setUserProfile, clearUserProfile } = userSlice.actions;
const __TURBOPACK__default__export__ = userSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/products/products.module.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Products feature module:
// - products slice
// - CRUD thunks
// - local state mutation reducers for fast UI updates
__turbopack_context__.s([
    "addProductLocal",
    ()=>addProductLocal,
    "default",
    ()=>__TURBOPACK__default__export__,
    "getProducts",
    ()=>getProducts,
    "removeProductLocal",
    ()=>removeProductLocal,
    "setProducts",
    ()=>setProducts,
    "setProductsError",
    ()=>setProductsError,
    "setProductsLoading",
    ()=>setProductsLoading,
    "updateProductLocal",
    ()=>updateProductLocal
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/webapp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@reduxjs/toolkit'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'axios'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
const initialState = {
    items: [],
    loading: false,
    error: null
};
const productsSlice = createSlice({
    name: "products",
    initialState,
    reducers: {
        setProducts: (state, action)=>{
            state.items = action.payload;
        },
        addProductLocal: (state, action)=>{
            state.items = [
                action.payload,
                ...state.items
            ];
        },
        updateProductLocal: (state, action)=>{
            state.items = state.items.map((product)=>product._id === action.payload._id ? action.payload : product);
        },
        removeProductLocal: (state, action)=>{
            state.items = state.items.filter((product)=>product._id !== action.payload);
        },
        setProductsLoading: (state, action)=>{
            state.loading = action.payload;
        },
        setProductsError: (state, action)=>{
            state.error = action.payload;
        }
    }
});
const { setProducts, addProductLocal, updateProductLocal, removeProductLocal, setProductsLoading, setProductsError } = productsSlice.actions;
const authHeaders = (token)=>({
        headers: {
            ...token && {
                Authorization: `Bearer ${token}`
            }
        }
    });
const getProducts = (params = {})=>async (dispatch, getState)=>{
        dispatch(setProductsLoading(true));
        dispatch(setProductsError(null));
        try {
            const token = getState().auth.token || localStorage.getItem("token");
            ;
            console.log("================================== I AM WITHIN GETPRODUCTS ");
            const res = await axios.get(`${("TURBOPACK compile-time value", "http://api.marketnest.com")}/v1/products`, // `http://api.marketnest.com/v1/products`,
            {
                ...authHeaders(token),
                params: {
                    // "$populate": "categories",
                    limit: 500,
                    // maybe here we can pass vendorId
                    ...params
                }
            });
            dispatch(setProducts(res.data.data.docs));
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Failed to fetch products";
            dispatch(setProductsError(message));
            return {
                success: false,
                message
            };
        } finally{
            dispatch(setProductsLoading(false));
        }
    };
const __TURBOPACK__default__export__ = productsSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/categories/categories.module.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "getCategories",
    ()=>getCategories,
    "setCategories",
    ()=>setCategories,
    "setCategoriesError",
    ()=>setCategoriesError,
    "setCategoriesLoading",
    ()=>setCategoriesLoading
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/webapp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@reduxjs/toolkit'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module 'axios'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
;
const initialState = {
    items: [],
    loading: false,
    error: null
};
const categoriesSlice = createSlice({
    name: "categories",
    initialState,
    reducers: {
        setCategories: (state, action)=>{
            state.items = action.payload;
        },
        setCategoriesLoading: (state, action)=>{
            state.loading = action.payload;
        },
        setCategoriesError: (state, action)=>{
            state.error = action.payload;
        }
    }
});
const { setCategories, setCategoriesLoading, setCategoriesError } = categoriesSlice.actions;
const authHeaders = (token)=>({
        headers: {
            ...token && {
                Authorization: `Bearer ${token}`
            }
        }
    });
const getCategories = (params = {})=>async (dispatch, getState)=>{
        dispatch(setCategoriesLoading(true));
        dispatch(setCategoriesError(null));
        try {
            const token = getState().auth.token || localStorage.getItem("token");
            const res = await axios.get(`${("TURBOPACK compile-time value", "http://api.marketnest.com")}/v1/categories`, {
                ...authHeaders(token),
                params: {
                    ...params
                }
            });
            dispatch(setCategories(res.data.data.docs));
            return res.data;
        } catch (error) {
            const message = error?.response?.data?.message || "Failed to fetch categories";
            dispatch(setCategoriesError(message));
            return {
                success: false,
                message
            };
        } finally{
            dispatch(setCategoriesLoading(false));
        }
    };
const __TURBOPACK__default__export__ = categoriesSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/orders/order.service.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.js [app-client] (ecmascript)");
;
const OrderService = {
    getByUser: (userId, page = 1)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])("GET", `/orders?userId=${userId}&page=${page}`),
    getById: (orderId)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["apiRequest"])("GET", `/orders/${orderId}`)
};
const __TURBOPACK__default__export__ = OrderService;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/orders/order.module.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "fetchOrders",
    ()=>fetchOrders
]);
(()=>{
    const e = new Error("Cannot find module '@reduxjs/toolkit'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$orders$2f$order$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/orders/order.service.js [app-client] (ecmascript)");
;
;
const fetchOrders = createAsyncThunk("order/fetchAll", async ({ userId, page = 1 }, { rejectWithValue })=>{
    try {
        const res = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$orders$2f$order$2e$service$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"].getByUser(userId, page);
        return {
            data: res.data,
            page
        };
    } catch (err) {
        return rejectWithValue(err.message);
    }
});
const orderSlice = createSlice({
    name: "order",
    initialState: {
        list: [],
        loading: false,
        error: null,
        currentPage: 1,
        totalPages: 1,
        totalDocs: 0
    },
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchOrders.pending, (s)=>{
            s.loading = true;
            s.error = null;
        }).addCase(fetchOrders.fulfilled, (s, a)=>{
            s.loading = false;
            const { data, page } = a.payload;
            s.totalDocs = data?.totalDocs || 0;
            s.list = data?.docs || [];
            s.currentPage = data?.page || 1;
            s.totalPages = data?.totalPages || 1;
        }).addCase(fetchOrders.rejected, (s, a)=>{
            s.loading = false;
            s.error = a.payload;
        });
    }
});
const __TURBOPACK__default__export__ = orderSlice.reducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/redux/rootReducer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Root reducer only combines feature reducers.
// Keep business logic inside feature modules under src/modules/*.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
(()=>{
    const e = new Error("Cannot find module '@reduxjs/toolkit'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$auth$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/auth/auth.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$user$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/user/user.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$products$2f$products$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/products/products.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$categories$2f$categories$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/categories/categories.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$cart$2f$cart$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/cart/cart.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$orders$2f$order$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/orders/order.module.js [app-client] (ecmascript)");
;
;
;
;
;
;
;
const rootReducer = combineReducers({
    auth: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$auth$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    user: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$user$2f$user$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    products: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$products$2f$products$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    categories: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$categories$2f$categories$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    cart: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$cart$2f$cart$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"],
    order: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$orders$2f$order$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
const __TURBOPACK__default__export__ = rootReducer;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/redux/store.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// Global Redux store configuration.
// This file should stay minimal and only wire reducers + middleware.
__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__,
    "store",
    ()=>store
]);
(()=>{
    const e = new Error("Cannot find module '@reduxjs/toolkit'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$rootReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/rootReducer.js [app-client] (ecmascript)");
;
;
const loadAuthFromStorage = ()=>{
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    try {
        const token = localStorage.getItem("token");
        const user = JSON.parse(localStorage.getItem("user") || "null");
        if (!token && !user) return undefined;
        return {
            auth: {
                token,
                user,
                loading: false,
                error: null
            }
        };
    } catch  {
        return undefined;
    }
};
const store = configureStore({
    reducer: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$rootReducer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"]
});
const __TURBOPACK__default__export__ = store;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/providers.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Providers
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'react-redux'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/redux/store.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'uuid'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
;
var _s = __turbopack_context__.k.signature();
// "use client";
// import { useEffect } from "react";
// import { Provider } from "react-redux";
// import { store } from "@/redux/store";
// // :white_check_mark: ADD THIS FUNCTION — crypto.randomUUID sirf HTTPS/localhost pe kaam karta hai
// const generateSessionId = () => {
//   if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
//     return crypto.randomUUID();
//   }
//   return Math.random().toString(36).substring(2) + Date.now().toString(36);
// };
// // :white_check_mark: FUNCTION END
// export default function Providers({ children }) {
//   useEffect(() => {
//     if (!localStorage.getItem("sessionId")) {
//       localStorage.setItem("sessionId", generateSessionId()); // :white_check_mark: CHANGE: crypto.randomUUID() → generateSessionId()
//     }
//     // Load Bootstrap JS once on client for interactive components
//     // like modal, dropdown, offcanvas, collapse, and tooltips.
//     import("bootstrap/dist/js/bootstrap.bundle.min.js");
//   }, []);
//   return <Provider store={store}>{children}</Provider>;
// }
"use client";
;
;
;
;
function Providers({ children }) {
    _s();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Providers.useEffect": ()=>{
            if (!localStorage.getItem("sessionId")) {
                localStorage.setItem("sessionId", uuidv4());
            }
        }
    }["Providers.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Provider, {
        store: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$redux$2f$store$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["store"],
        children: children
    }, void 0, false, {
        fileName: "[project]/src/app/providers.js",
        lineNumber: 46,
        columnNumber: 10
    }, this);
}
_s(Providers, "OD7bBpZva5O2jO+Puf00hKivP7c=");
_c = Providers;
var _c;
__turbopack_context__.k.register(_c, "Providers");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/sharedComponents/Header/Header.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "actionsRow": "Header-module__GTSj0a__actionsRow",
  "cartBadge": "Header-module__GTSj0a__cartBadge",
  "cartBtn": "Header-module__GTSj0a__cartBtn",
  "cartWrapper": "Header-module__GTSj0a__cartWrapper",
  "header": "Header-module__GTSj0a__header",
  "headerRow": "Header-module__GTSj0a__headerRow",
  "loginBtn": "Header-module__GTSj0a__loginBtn",
  "logoGroup": "Header-module__GTSj0a__logoGroup",
  "logoIcon": "Header-module__GTSj0a__logoIcon",
  "logoText": "Header-module__GTSj0a__logoText",
  "profileBtn": "Header-module__GTSj0a__profileBtn",
});
}),
"[project]/src/app/assets/icons/storeIcon.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const StoreIcon = ({ size = 20, strokeWidth = 2, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5"
            }, void 0, false, {
                fileName: "[project]/src/app/assets/icons/storeIcon.jsx",
                lineNumber: 15,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"
            }, void 0, false, {
                fileName: "[project]/src/app/assets/icons/storeIcon.jsx",
                lineNumber: 16,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05"
            }, void 0, false, {
                fileName: "[project]/src/app/assets/icons/storeIcon.jsx",
                lineNumber: 17,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/assets/icons/storeIcon.jsx",
        lineNumber: 2,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = StoreIcon;
const __TURBOPACK__default__export__ = StoreIcon;
var _c;
__turbopack_context__.k.register(_c, "StoreIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/app/assets/icons/shoppingBagIcon.jsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
const ShoppingBagIcon = ({ size = 20, strokeWidth = 2, ...props })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        xmlns: "http://www.w3.org/2000/svg",
        width: size,
        height: size,
        viewBox: "0 0 24 24",
        fill: "none",
        stroke: "currentColor",
        strokeWidth: strokeWidth,
        strokeLinecap: "round",
        strokeLinejoin: "round",
        "aria-hidden": "true",
        ...props,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M16 10a4 4 0 0 1-8 0"
            }, void 0, false, {
                fileName: "[project]/src/app/assets/icons/shoppingBagIcon.jsx",
                lineNumber: 15,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3.103 6.034h17.794"
            }, void 0, false, {
                fileName: "[project]/src/app/assets/icons/shoppingBagIcon.jsx",
                lineNumber: 16,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                d: "M3.4 5.467a2 2 0 0 0-.4 1.2V20a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6.667a2 2 0 0 0-.4-1.2l-2-2.667A2 2 0 0 0 17 2H7a2 2 0 0 0-1.6.8z"
            }, void 0, false, {
                fileName: "[project]/src/app/assets/icons/shoppingBagIcon.jsx",
                lineNumber: 17,
                columnNumber: 5
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/assets/icons/shoppingBagIcon.jsx",
        lineNumber: 2,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c = ShoppingBagIcon;
const __TURBOPACK__default__export__ = ShoppingBagIcon;
var _c;
__turbopack_context__.k.register(_c, "ShoppingBagIcon");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/sharedComponents/Button/Button.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "active": "Button-module__iFhxnG__active",
  "button": "Button-module__iFhxnG__button",
  "fullWidth": "Button-module__iFhxnG__fullWidth",
  "iconOnly": "Button-module__iFhxnG__iconOnly",
  "outline": "Button-module__iFhxnG__outline",
  "pill": "Button-module__iFhxnG__pill",
  "primary": "Button-module__iFhxnG__primary",
  "round": "Button-module__iFhxnG__round",
  "secondary": "Button-module__iFhxnG__secondary",
});
}),
"[project]/src/sharedComponents/Button/Button.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Button
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
// // Reusable button used across modules.
// import styles from "./Button.module.css";
// export default function Button({ children, type = "button", disabled = false, onClick }) {
//   return (
//     <button className={styles.button} type={type} onClick={onClick} disabled={disabled}>
//       {children}
//     </button>
//   );
// }
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/sharedComponents/Button/Button.module.css [app-client] (css module)");
;
;
function Button({ children, type = "button", disabled = false, onClick, variant = "primary", iconOnly = false, pill = false, fullWidth = false, active = false, round = false, className = "" }) {
    const classes = [
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].button,
        __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"][variant],
        iconOnly && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].iconOnly,
        pill && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].pill,
        fullWidth && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].fullWidth,
        active && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].active,
        round && __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Button$2f$Button$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].round,
        className
    ].filter(Boolean).join(" ");
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        type: type,
        disabled: disabled,
        onClick: onClick,
        className: classes,
        children: children
    }, void 0, false, {
        fileName: "[project]/src/sharedComponents/Button/Button.js",
        lineNumber: 42,
        columnNumber: 5
    }, this);
}
_c = Button;
var _c;
__turbopack_context__.k.register(_c, "Button");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/modules/products/components/Searching.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "searchIcon": "Searching-module__8TOo0G__searchIcon",
  "searchInput": "Searching-module__8TOo0G__searchInput",
  "searchInputWrapper": "Searching-module__8TOo0G__searchInputWrapper",
  "wrapper": "Searching-module__8TOo0G__wrapper",
});
}),
"[project]/src/modules/products/components/Searching.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$products$2f$components$2f$Searching$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/modules/products/components/Searching.module.css [app-client] (css module)");
"use client";
;
;
function Search({ searchTerm, onSearch }) {
    const handleSearchChange = (e)=>{
        onSearch(e.target.value);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$products$2f$components$2f$Searching$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchInputWrapper,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$products$2f$components$2f$Searching$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchIcon,
                width: "20",
                height: "20",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("circle", {
                        cx: "11",
                        cy: "11",
                        r: "8"
                    }, void 0, false, {
                        fileName: "[project]/src/modules/products/components/Searching.js",
                        lineNumber: 22,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
                        d: "m21 21-4.35-4.35"
                    }, void 0, false, {
                        fileName: "[project]/src/modules/products/components/Searching.js",
                        lineNumber: 23,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/modules/products/components/Searching.js",
                lineNumber: 13,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                type: "text",
                className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$products$2f$components$2f$Searching$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].searchInput,
                placeholder: "Search gadgets...",
                value: searchTerm,
                onChange: handleSearchChange
            }, void 0, false, {
                fileName: "[project]/src/modules/products/components/Searching.js",
                lineNumber: 25,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/modules/products/components/Searching.js",
        lineNumber: 12,
        columnNumber: 5
    }, this);
}
_c = Search;
const __TURBOPACK__default__export__ = Search;
var _c;
__turbopack_context__.k.register(_c, "Search");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/sharedComponents/Header/Header.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/sharedComponents/Header/Header.module.css [app-client] (css module)");
(()=>{
    const e = new Error("Cannot find module 'react-inlinesvg'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$icons$2f$storeIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/assets/icons/storeIcon.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$icons$2f$shoppingBagIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/app/assets/icons/shoppingBagIcon.jsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/sharedComponents/Button/Button.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/navigation.js [app-client] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module 'react-redux'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$auth$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/auth/auth.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$cart$2f$cart$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/cart/cart.module.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$products$2f$components$2f$Searching$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/products/components/Searching.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$products$2f$products$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/modules/products/products.module.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
;
;
;
;
;
;
const Header = ()=>{
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const dispatch = useDispatch();
    const searchParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"])();
    const pathname = (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"])();
    const [searchTerm, setSearchTerm] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const { user } = useSelector({
        "Header.useSelector": (state)=>state.auth
    }["Header.useSelector"]);
    const cartCount = useSelector({
        "Header.useSelector[cartCount]": (state)=>state.cart.count
    }["Header.useSelector[cartCount]"]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            if (pathname === "/products") {
                const params = new URLSearchParams(searchParams.toString());
                if (searchTerm) {
                    params.set("search", searchTerm);
                } else {
                    params.delete("search");
                }
                router.replace(`/products?${params.toString()}`);
            }
        }
    }["Header.useEffect"], [
        searchTerm,
        pathname
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            const token = localStorage.getItem("token");
            const user = localStorage.getItem("user");
            if (token && user) {
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$auth$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setToken"])(token));
                dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$auth$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["setUser"])(JSON.parse(user)));
            }
            (()=>{
                const e = new Error("Cannot find module 'bootstrap/dist/js/bootstrap.bundle.min.js'");
                e.code = 'MODULE_NOT_FOUND';
                throw e;
            })();
        }
    }["Header.useEffect"], []);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "Header.useEffect": ()=>{
            dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$cart$2f$cart$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["getCart"])());
        }
    }["Header.useEffect"], []);
    const handleLogout = ()=>{
        dispatch((0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$auth$2f$auth$2e$module$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["logout"])());
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/products");
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].header,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `row align-items-center ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].headerRow}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `d-flex align-items-center ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoGroup}`,
                            onClick: ()=>router.push("/products"),
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: `d-flex align-items-center justify-content-center ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoIcon}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$icons$2f$storeIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                        size: 16,
                                        strokeWidth: 2
                                    }, void 0, false, {
                                        fileName: "[project]/src/sharedComponents/Header/Header.js",
                                        lineNumber: 80,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/sharedComponents/Header/Header.js",
                                    lineNumber: 77,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: `fw-bold h6 ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].logoText}`,
                                    children: "Retrade"
                                }, void 0, false, {
                                    fileName: "[project]/src/sharedComponents/Header/Header.js",
                                    lineNumber: 82,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/sharedComponents/Header/Header.js",
                            lineNumber: 74,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/sharedComponents/Header/Header.js",
                        lineNumber: 73,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-6 d-flex justify-content-center align-items-center",
                        children: pathname === "/products" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$modules$2f$products$2f$components$2f$Searching$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                            onSearch: setSearchTerm,
                            searchTerm: searchTerm
                        }, void 0, false, {
                            fileName: "[project]/src/sharedComponents/Header/Header.js",
                            lineNumber: 90,
                            columnNumber: 15
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/sharedComponents/Header/Header.js",
                        lineNumber: 88,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-3",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `d-flex align-items-center justify-content-end ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].actionsRow}`,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: ` ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cartWrapper}`,
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: `d-flex align-items-center justify-content-center text-secondary me-3 ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cartBtn}`,
                                        onClick: ()=>router.push("/cart"),
                                        "aria-label": "Cart",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$app$2f$assets$2f$icons$2f$shoppingBagIcon$2e$jsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                                size: 20,
                                                strokeWidth: 1.5
                                            }, void 0, false, {
                                                fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                lineNumber: 107,
                                                columnNumber: 19
                                            }, ("TURBOPACK compile-time value", void 0)),
                                            cartCount > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: `d-flex align-items-center justify-content-center ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].cartBadge}`,
                                                children: cartCount
                                            }, void 0, false, {
                                                fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                lineNumber: 109,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/sharedComponents/Header/Header.js",
                                        lineNumber: 102,
                                        columnNumber: 17
                                    }, ("TURBOPACK compile-time value", void 0))
                                }, void 0, false, {
                                    fileName: "[project]/src/sharedComponents/Header/Header.js",
                                    lineNumber: 101,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                user ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "dropdown",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: `btn p-0 border-0 bg-transparent ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].profileBtn}`,
                                            "data-bs-toggle": "dropdown",
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SVG, {
                                                src: "/assets/svg/circle-user.svg",
                                                className: "text-secondary me-1"
                                            }, void 0, false, {
                                                fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                lineNumber: 123,
                                                columnNumber: 21
                                            }, ("TURBOPACK compile-time value", void 0))
                                        }, void 0, false, {
                                            fileName: "[project]/src/sharedComponents/Header/Header.js",
                                            lineNumber: 119,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0)),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("ul", {
                                            className: "dropdown-menu dropdown-menu-end",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "dropdown-item fw-bold",
                                                        onClick: ()=>router.push("/profile"),
                                                        children: "My Profile"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                        lineNumber: 131,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                    lineNumber: 130,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "dropdown-item fw-bold",
                                                        onClick: ()=>router.push("/profile"),
                                                        children: "Orders"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                        lineNumber: 140,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                    lineNumber: 139,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hr", {
                                                        className: "dropdown-divider"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                        lineNumber: 149,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                    lineNumber: 148,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0)),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("li", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "dropdown-item text-danger fw-bold",
                                                        onClick: handleLogout,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SVG, {
                                                                src: "/assets/svg/log-out.svg",
                                                                className: "text danger me-1"
                                                            }, void 0, false, {
                                                                fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                                lineNumber: 157,
                                                                columnNumber: 25
                                                            }, ("TURBOPACK compile-time value", void 0)),
                                                            "Sign Out"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                        lineNumber: 153,
                                                        columnNumber: 23
                                                    }, ("TURBOPACK compile-time value", void 0))
                                                }, void 0, false, {
                                                    fileName: "[project]/src/sharedComponents/Header/Header.js",
                                                    lineNumber: 152,
                                                    columnNumber: 21
                                                }, ("TURBOPACK compile-time value", void 0))
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/src/sharedComponents/Header/Header.js",
                                            lineNumber: 129,
                                            columnNumber: 19
                                        }, ("TURBOPACK compile-time value", void 0))
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/sharedComponents/Header/Header.js",
                                    lineNumber: 118,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Button$2f$Button$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                                    onClick: ()=>router.push("/signin"),
                                    variant: "primary",
                                    pill: true,
                                    className: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Header$2f$Header$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].loginBtn,
                                    children: "Login"
                                }, void 0, false, {
                                    fileName: "[project]/src/sharedComponents/Header/Header.js",
                                    lineNumber: 167,
                                    columnNumber: 17
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/sharedComponents/Header/Header.js",
                            lineNumber: 98,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/sharedComponents/Header/Header.js",
                        lineNumber: 97,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/sharedComponents/Header/Header.js",
                lineNumber: 72,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/sharedComponents/Header/Header.js",
            lineNumber: 71,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/sharedComponents/Header/Header.js",
        lineNumber: 70,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_s(Header, "uWkvP4XUTDBCMZVpNyhfr05j0lo=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"],
        useDispatch,
        __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useSearchParams"],
        __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["usePathname"],
        useSelector,
        useSelector
    ];
});
_c = Header;
const __TURBOPACK__default__export__ = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/sharedComponents/Footer/Footer.module.css [app-client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "copyright": "Footer-module__HWROaa__copyright",
  "footer": "Footer-module__HWROaa__footer",
  "linkBtn": "Footer-module__HWROaa__linkBtn",
});
}),
"[project]/src/sharedComponents/Footer/Footer.js [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/webapp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/src/sharedComponents/Footer/Footer.module.css [app-client] (css module)");
"use client";
;
;
;
const Footer = ({ onShoppingClick, onPrivacyClick, onTermsClick })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: `d-flex align-items-center ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].footer}`,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "container",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "row align-items-center flex-column flex-md-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-12 col-md-6 text-center text-md-start mb-2 mb-md-0",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: `fw-semibold text-muted text-xs ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].copyright}`,
                            children: "© 2024 MarketNest. Crafted for tech enthusiasts."
                        }, void 0, false, {
                            fileName: "[project]/src/sharedComponents/Footer/Footer.js",
                            lineNumber: 14,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/sharedComponents/Footer/Footer.js",
                        lineNumber: 12,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "col-12 col-md-6",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "d-flex align-items-center justify-content-center justify-content-md-end gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    className: `fw-semibold text-xs ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].linkBtn}`,
                                    onClick: onShoppingClick,
                                    children: "Shopping"
                                }, void 0, false, {
                                    fileName: "[project]/src/sharedComponents/Footer/Footer.js",
                                    lineNumber: 24,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    className: `fw-semibold text-xs ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].linkBtn}`,
                                    onClick: onPrivacyClick,
                                    children: "Privacy Policy"
                                }, void 0, false, {
                                    fileName: "[project]/src/sharedComponents/Footer/Footer.js",
                                    lineNumber: 30,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0)),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                                    className: `fw-semibold text-xs ${__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$sharedComponents$2f$Footer$2f$Footer$2e$module$2e$css__$5b$app$2d$client$5d$__$28$css__module$29$__["default"].linkBtn}`,
                                    onClick: onTermsClick,
                                    children: "Terms of Service"
                                }, void 0, false, {
                                    fileName: "[project]/src/sharedComponents/Footer/Footer.js",
                                    lineNumber: 36,
                                    columnNumber: 15
                                }, ("TURBOPACK compile-time value", void 0))
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/sharedComponents/Footer/Footer.js",
                            lineNumber: 22,
                            columnNumber: 13
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/src/sharedComponents/Footer/Footer.js",
                        lineNumber: 21,
                        columnNumber: 11
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/src/sharedComponents/Footer/Footer.js",
                lineNumber: 11,
                columnNumber: 9
            }, ("TURBOPACK compile-time value", void 0))
        }, void 0, false, {
            fileName: "[project]/src/sharedComponents/Footer/Footer.js",
            lineNumber: 9,
            columnNumber: 7
        }, ("TURBOPACK compile-time value", void 0))
    }, void 0, false, {
        fileName: "[project]/src/sharedComponents/Footer/Footer.js",
        lineNumber: 8,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Footer;
const __TURBOPACK__default__export__ = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/webapp/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/webapp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
/**
 * @license React
 * react-jsx-dev-runtime.development.js
 *
 * Copyright (c) Meta Platforms, Inc. and affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */ "use strict";
"production" !== ("TURBOPACK compile-time value", "development") && function() {
    function getComponentNameFromType(type) {
        if (null == type) return null;
        if ("function" === typeof type) return type.$$typeof === REACT_CLIENT_REFERENCE ? null : type.displayName || type.name || null;
        if ("string" === typeof type) return type;
        switch(type){
            case REACT_FRAGMENT_TYPE:
                return "Fragment";
            case REACT_PROFILER_TYPE:
                return "Profiler";
            case REACT_STRICT_MODE_TYPE:
                return "StrictMode";
            case REACT_SUSPENSE_TYPE:
                return "Suspense";
            case REACT_SUSPENSE_LIST_TYPE:
                return "SuspenseList";
            case REACT_ACTIVITY_TYPE:
                return "Activity";
            case REACT_VIEW_TRANSITION_TYPE:
                return "ViewTransition";
        }
        if ("object" === typeof type) switch("number" === typeof type.tag && console.error("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), type.$$typeof){
            case REACT_PORTAL_TYPE:
                return "Portal";
            case REACT_CONTEXT_TYPE:
                return type.displayName || "Context";
            case REACT_CONSUMER_TYPE:
                return (type._context.displayName || "Context") + ".Consumer";
            case REACT_FORWARD_REF_TYPE:
                var innerType = type.render;
                type = type.displayName;
                type || (type = innerType.displayName || innerType.name || "", type = "" !== type ? "ForwardRef(" + type + ")" : "ForwardRef");
                return type;
            case REACT_MEMO_TYPE:
                return innerType = type.displayName || null, null !== innerType ? innerType : getComponentNameFromType(type.type) || "Memo";
            case REACT_LAZY_TYPE:
                innerType = type._payload;
                type = type._init;
                try {
                    return getComponentNameFromType(type(innerType));
                } catch (x) {}
        }
        return null;
    }
    function testStringCoercion(value) {
        return "" + value;
    }
    function checkKeyStringCoercion(value) {
        try {
            testStringCoercion(value);
            var JSCompiler_inline_result = !1;
        } catch (e) {
            JSCompiler_inline_result = !0;
        }
        if (JSCompiler_inline_result) {
            JSCompiler_inline_result = console;
            var JSCompiler_temp_const = JSCompiler_inline_result.error;
            var JSCompiler_inline_result$jscomp$0 = "function" === typeof Symbol && Symbol.toStringTag && value[Symbol.toStringTag] || value.constructor.name || "Object";
            JSCompiler_temp_const.call(JSCompiler_inline_result, "The provided key is an unsupported type %s. This value must be coerced to a string before using it here.", JSCompiler_inline_result$jscomp$0);
            return testStringCoercion(value);
        }
    }
    function getTaskName(type) {
        if (type === REACT_FRAGMENT_TYPE) return "<>";
        if ("object" === typeof type && null !== type && type.$$typeof === REACT_LAZY_TYPE) return "<...>";
        try {
            var name = getComponentNameFromType(type);
            return name ? "<" + name + ">" : "<...>";
        } catch (x) {
            return "<...>";
        }
    }
    function getOwner() {
        var dispatcher = ReactSharedInternals.A;
        return null === dispatcher ? null : dispatcher.getOwner();
    }
    function UnknownOwner() {
        return Error("react-stack-top-frame");
    }
    function hasValidKey(config) {
        if (hasOwnProperty.call(config, "key")) {
            var getter = Object.getOwnPropertyDescriptor(config, "key").get;
            if (getter && getter.isReactWarning) return !1;
        }
        return void 0 !== config.key;
    }
    function defineKeyPropWarningGetter(props, displayName) {
        function warnAboutAccessingKey() {
            specialPropKeyWarningShown || (specialPropKeyWarningShown = !0, console.error("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://react.dev/link/special-props)", displayName));
        }
        warnAboutAccessingKey.isReactWarning = !0;
        Object.defineProperty(props, "key", {
            get: warnAboutAccessingKey,
            configurable: !0
        });
    }
    function elementRefGetterWithDeprecationWarning() {
        var componentName = getComponentNameFromType(this.type);
        didWarnAboutElementRef[componentName] || (didWarnAboutElementRef[componentName] = !0, console.error("Accessing element.ref was removed in React 19. ref is now a regular prop. It will be removed from the JSX Element type in a future release."));
        componentName = this.props.ref;
        return void 0 !== componentName ? componentName : null;
    }
    function ReactElement(type, key, props, owner, debugStack, debugTask) {
        var refProp = props.ref;
        type = {
            $$typeof: REACT_ELEMENT_TYPE,
            type: type,
            key: key,
            props: props,
            _owner: owner
        };
        null !== (void 0 !== refProp ? refProp : null) ? Object.defineProperty(type, "ref", {
            enumerable: !1,
            get: elementRefGetterWithDeprecationWarning
        }) : Object.defineProperty(type, "ref", {
            enumerable: !1,
            value: null
        });
        type._store = {};
        Object.defineProperty(type._store, "validated", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: 0
        });
        Object.defineProperty(type, "_debugInfo", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: null
        });
        Object.defineProperty(type, "_debugStack", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugStack
        });
        Object.defineProperty(type, "_debugTask", {
            configurable: !1,
            enumerable: !1,
            writable: !0,
            value: debugTask
        });
        Object.freeze && (Object.freeze(type.props), Object.freeze(type));
        return type;
    }
    function jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStack, debugTask) {
        var children = config.children;
        if (void 0 !== children) if (isStaticChildren) if (isArrayImpl(children)) {
            for(isStaticChildren = 0; isStaticChildren < children.length; isStaticChildren++)validateChildKeys(children[isStaticChildren]);
            Object.freeze && Object.freeze(children);
        } else console.error("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
        else validateChildKeys(children);
        if (hasOwnProperty.call(config, "key")) {
            children = getComponentNameFromType(type);
            var keys = Object.keys(config).filter(function(k) {
                return "key" !== k;
            });
            isStaticChildren = 0 < keys.length ? "{key: someKey, " + keys.join(": ..., ") + ": ...}" : "{key: someKey}";
            didWarnAboutKeySpread[children + isStaticChildren] || (keys = 0 < keys.length ? "{" + keys.join(": ..., ") + ": ...}" : "{}", console.error('A props object containing a "key" prop is being spread into JSX:\n  let props = %s;\n  <%s {...props} />\nReact keys must be passed directly to JSX without using spread:\n  let props = %s;\n  <%s key={someKey} {...props} />', isStaticChildren, children, keys, children), didWarnAboutKeySpread[children + isStaticChildren] = !0);
        }
        children = null;
        void 0 !== maybeKey && (checkKeyStringCoercion(maybeKey), children = "" + maybeKey);
        hasValidKey(config) && (checkKeyStringCoercion(config.key), children = "" + config.key);
        if ("key" in config) {
            maybeKey = {};
            for(var propName in config)"key" !== propName && (maybeKey[propName] = config[propName]);
        } else maybeKey = config;
        children && defineKeyPropWarningGetter(maybeKey, "function" === typeof type ? type.displayName || type.name || "Unknown" : type);
        return ReactElement(type, children, maybeKey, getOwner(), debugStack, debugTask);
    }
    function validateChildKeys(node) {
        isValidElement(node) ? node._store && (node._store.validated = 1) : "object" === typeof node && null !== node && node.$$typeof === REACT_LAZY_TYPE && ("fulfilled" === node._payload.status ? isValidElement(node._payload.value) && node._payload.value._store && (node._payload.value._store.validated = 1) : node._store && (node._store.validated = 1));
    }
    function isValidElement(object) {
        return "object" === typeof object && null !== object && object.$$typeof === REACT_ELEMENT_TYPE;
    }
    var React = __turbopack_context__.r("[project]/webapp/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)"), REACT_ELEMENT_TYPE = Symbol.for("react.transitional.element"), REACT_PORTAL_TYPE = Symbol.for("react.portal"), REACT_FRAGMENT_TYPE = Symbol.for("react.fragment"), REACT_STRICT_MODE_TYPE = Symbol.for("react.strict_mode"), REACT_PROFILER_TYPE = Symbol.for("react.profiler"), REACT_CONSUMER_TYPE = Symbol.for("react.consumer"), REACT_CONTEXT_TYPE = Symbol.for("react.context"), REACT_FORWARD_REF_TYPE = Symbol.for("react.forward_ref"), REACT_SUSPENSE_TYPE = Symbol.for("react.suspense"), REACT_SUSPENSE_LIST_TYPE = Symbol.for("react.suspense_list"), REACT_MEMO_TYPE = Symbol.for("react.memo"), REACT_LAZY_TYPE = Symbol.for("react.lazy"), REACT_ACTIVITY_TYPE = Symbol.for("react.activity"), REACT_VIEW_TRANSITION_TYPE = Symbol.for("react.view_transition"), REACT_CLIENT_REFERENCE = Symbol.for("react.client.reference"), ReactSharedInternals = React.__CLIENT_INTERNALS_DO_NOT_USE_OR_WARN_USERS_THEY_CANNOT_UPGRADE, hasOwnProperty = Object.prototype.hasOwnProperty, isArrayImpl = Array.isArray, createTask = console.createTask ? console.createTask : function() {
        return null;
    };
    React = {
        react_stack_bottom_frame: function(callStackForError) {
            return callStackForError();
        }
    };
    var specialPropKeyWarningShown;
    var didWarnAboutElementRef = {};
    var unknownOwnerDebugStack = React.react_stack_bottom_frame.bind(React, UnknownOwner)();
    var unknownOwnerDebugTask = createTask(getTaskName(UnknownOwner));
    var didWarnAboutKeySpread = {};
    exports.Fragment = REACT_FRAGMENT_TYPE;
    exports.jsxDEV = function(type, config, maybeKey, isStaticChildren) {
        var trackActualOwner = 1e4 > ReactSharedInternals.recentlyCreatedOwnerStacks++;
        if (trackActualOwner) {
            var previousStackTraceLimit = Error.stackTraceLimit;
            Error.stackTraceLimit = 10;
            var debugStackDEV = Error("react-stack-top-frame");
            Error.stackTraceLimit = previousStackTraceLimit;
        } else debugStackDEV = unknownOwnerDebugStack;
        return jsxDEVImpl(type, config, maybeKey, isStaticChildren, debugStackDEV, trackActualOwner ? createTask(getTaskName(type)) : unknownOwnerDebugTask);
    };
}();
}),
"[project]/webapp/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

var __TURBOPACK__imported__module__$5b$project$5d2f$webapp$2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/webapp/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
'use strict';
if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    module.exports = __turbopack_context__.r("[project]/webapp/node_modules/next/dist/compiled/react/cjs/react-jsx-dev-runtime.development.js [app-client] (ecmascript)");
}
}),
"[project]/webapp/node_modules/next/navigation.js [app-client] (ecmascript)", ((__turbopack_context__, module, exports) => {

module.exports = __turbopack_context__.r("[project]/webapp/node_modules/next/dist/client/components/navigation.js [app-client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__c283c827._.js.map