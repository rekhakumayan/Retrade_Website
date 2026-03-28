// LogRocket integration entrypoint.
// Replace console fallback with real LogRocket setup in production.
export const identifyUser = (userId, data = {}) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[logrocket] identify ${userId}`, data);
  }
};
