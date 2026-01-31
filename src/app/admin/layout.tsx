"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // 如果是登录页面，不需要检查
    if (pathname === "/admin/login") {
      setIsAuthenticated(true);
      return;
    }

    // 检查登录状态
    const isLoggedIn = localStorage.getItem("admin_logged_in") === "true";
    const loginTime = localStorage.getItem("admin_login_time");
    
    // 检查是否在 24 小时内登录
    const isSessionValid = loginTime && (Date.now() - parseInt(loginTime)) < 24 * 60 * 60 * 1000;

    if (!isLoggedIn || !isSessionValid) {
      // 未登录或会话过期，跳转到登录页
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
    }
  }, [pathname, router]);

  const handleLogout = () => {
    localStorage.removeItem("admin_logged_in");
    localStorage.removeItem("admin_login_time");
    router.push("/admin/login");
  };

  // 登录页面不显示导航
  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  // 未认证时显示加载状态
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  const navItems = [
    { href: "/admin/bookings", label: "📋 Bookings", icon: "📋" },
    { href: "/admin/schedule", label: "📅 Schedule", icon: "📅" },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/admin/bookings" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2c-5.33 4.55-8 8.48-8 11.8 0 4.98 3.8 8.2 8 8.2s8-3.22 8-8.2c0-3.32-2.67-7.25-8-11.8z"/>
                </svg>
              </div>
              <div>
                <div className="text-lg font-bold bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent">
                  NaturePure
                </div>
                <div className="text-xs text-slate-500 font-semibold">ADMIN PANEL</div>
              </div>
            </Link>

            {/* Nav Links */}
            <div className="flex items-center gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                    pathname === item.href
                      ? "bg-teal-500 text-white shadow-lg shadow-teal-500/25"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              
              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-lg font-semibold transition-colors border border-red-200"
              >
                🚪 Logout
              </button>

              {/* Back to Website */}
              <Link
                href="/"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg font-semibold transition-colors"
              >
                ← Website
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>{children}</main>
    </div>
  );
}
