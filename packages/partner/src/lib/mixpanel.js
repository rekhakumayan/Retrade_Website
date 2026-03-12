// Mixpanel integration entrypoint.
// Replace console fallback with real Mixpanel SDK initialization in production.
export const trackEvent = (eventName, payload = {}) => {
  if (process.env.NODE_ENV !== "production") {
    console.log(`[mixpanel] ${eventName}`, payload);
  }
};
