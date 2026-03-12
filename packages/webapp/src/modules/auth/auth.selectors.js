// Auth selectors:
// Keep component access to state centralized and reusable.
export const selectAuth = (state) => state.auth;
export const selectToken = (state) => state.auth.token;
export const selectCurrentUser = (state) => state.auth.user;
export const selectAuthLoading = (state) => state.auth.loading;
export const selectAuthError = (state) => state.auth.error;
