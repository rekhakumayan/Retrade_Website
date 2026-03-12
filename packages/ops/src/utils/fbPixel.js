// Facebook Pixel helper utilities.
export const trackPageView = (url) => {
  if (typeof window === "undefined") return;
  if (!window.fbq) return;
  window.fbq("track", "PageView", { url });
};
