
"use client";

import { useState } from "react";
import Sidebar from "@/sharedComponents/Sidebar/Sidebar";
import Navbar from "@/sharedComponents/Navbar/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export default function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
   const router = useRouter();
  const { token, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      router.push("/");
    }  
  }, [token, loading, router]);

  if (loading || !token) return null;

  return (
   
    <div className="container-fluid p-0 vh-100 d-flex flex-column">

      <Navbar onMenuClick={() => setSidebarOpen(true)} />

      <div className="row g-0 position-relative flex-grow-1 overflow-hidden">

        {/* Desktop Sidebar */}
        <div className="d-none d-md-block col-md-3 col-lg-3 col-xl-3 vh-100 position-sticky top-0">
          <Sidebar />
        </div>

        {/* Mobile Sidebar */}
        {sidebarOpen && (
          <div
            className="d-md-none position-fixed top-0 start-0 h-100 bg-white shadow"
            style={{ width: "250px", zIndex: 1050 }}
          >
            <div className="p-3">
              <button
                className="btn mb-3"
                onClick={() => setSidebarOpen(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
              <Sidebar />
            </div>
          </div>
        )}

        {/* Overlay */}
        {sidebarOpen && (
          <div
            className="d-md-none position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50"
            style={{ zIndex: 1040 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-9 col-xl-9 bg-light px-3 py-4 overflow-auto" style={{height:"100%"}}>
          {children}
        </div>

      </div>
    </div>
  
  );
}