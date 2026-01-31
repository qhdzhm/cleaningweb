"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AdminIndex() {
  const router = useRouter();

  useEffect(() => {
    // 检查是否已登录
    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";
    
    if (isLoggedIn) {
      // 已登录，跳转到 bookings
      router.push("/admin/bookings");
    } else {
      // 未登录，跳转到登录页
      router.push("/admin/login");
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-slate-600">Redirecting...</p>
      </div>
    </div>
  );
}
