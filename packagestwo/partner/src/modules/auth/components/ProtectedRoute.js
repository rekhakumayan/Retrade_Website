"use client";

import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useEffect } from "react";

export default function ProtectedRoute({ children }) {
  const router = useRouter();
  const { token, user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token || user?.role !== "partner") {
      router.push("/");
    }
  }, [token, user, router]);

  if (!token) return null;

  return children;
}