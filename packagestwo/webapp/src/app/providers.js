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

import { useEffect } from "react";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import {v4 as uuidv4} from "uuid"


export default function Providers({ children }) {
  useEffect(() => {
    if (!localStorage.getItem("sessionId")) {
      localStorage.setItem("sessionId",  uuidv4());
    }
  }, []);

  return <Provider store={store}>{children}</Provider>;
}