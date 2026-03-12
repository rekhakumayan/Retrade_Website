"use client";

// Client-side provider wrapper for App Router.
// Add all global React providers here (Redux, Theme, QueryClient, etc.).
import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";

export default function Providers({ children }) {
  useEffect(() => {
    // Load Bootstrap JS once on client for interactive components
    // like modal, dropdown, offcanvas, collapse, and tooltips.
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

}
