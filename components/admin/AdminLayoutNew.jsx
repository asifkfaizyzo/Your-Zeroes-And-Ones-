"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import Sidebar from "./Sidebar";
import { ToastContainer } from "react-toastify";

export default function AdminLayoutNew({ children }) {
  const router = useRouter();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      await fetch("/api/admin/logout", { method: "POST" });
      router.push("/admin/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }, [router]);

  const sidebarWidth = isMobile ? "0px" : isCollapsed ? "5rem" : "16rem";

  return (
    <div className="h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-slate-50 to-slate-100">
       
      {/* Sidebar - Fixed position, full height */}
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed(!isCollapsed)}
        onLogout={handleLogout}
      />

      {/* Top Header - Fixed */}
      <header
        className="fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm z-40 transition-all duration-300"
        style={{ left: sidebarWidth }}
      >
        <div className="h-full px-4 sm:px-8 flex items-center justify-between">
          {/* Left Side - Breadcrumb/Title */}
          <div className="flex items-center gap-4">
            {isMobile && <div className="w-10" />}

            <div className="hidden sm:block">
              <div className="flex items-center gap-2 text-sm text-slate-500">
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                <span className="font-medium text-slate-700">
                  YZO Admin Panel
                </span>
              </div>
            </div>
          </div>

          {/* Right Side - Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* View Site Button */}
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
              title="View Site"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                />
              </svg>
              <span className="hidden sm:inline">View Site</span>
            </a>

            {/* Notifications Button */}
            <button
              className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-all duration-200"
              title="Notifications"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Profile Dropdown */}
            <div className="relative group">
              <button className="flex items-center gap-2 px-2 sm:px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-100 rounded-lg transition-all duration-200">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg">
                  A
                </div>
                <span className="hidden md:inline">Admin</span>
                <svg
                  className="w-4 h-4 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-slate-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                <div className="p-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">
                    Admin User
                  </p>
                  <p className="text-xs text-slate-500">admin</p>
                </div>
                <div className="p-2 border-t border-slate-100">
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors font-medium"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                      />
                    </svg>
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Area - Scrollable */}
      <div
        className="h-screen overflow-y-auto transition-all duration-300"
        style={{ 
          marginLeft: sidebarWidth,
          paddingTop: '4rem', // 64px = h-16 header height
        }}
      >
        {/* Main Content */}
        <main className="min-h-[calc(100vh-4rem-4rem)] p-4 sm:p-6 lg:p-8">
          <div className="max-w-[1600px] mx-auto">{children}</div>
        </main>

        {/* Footer - Inside scrollable area */}
        <footer className="bg-white border-t border-slate-200 py-4">
  <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-slate-500">
      <p>© {new Date().getFullYear()} YourZeroesAndOnes. All rights reserved.</p>
      <div className="flex items-center gap-4">
        <a href="#" className="hover:text-slate-700 transition-colors">
          Documentation
        </a>
        <a href="#" className="hover:text-slate-700 transition-colors">
          Support
        </a>
        <a href="#" className="hover:text-slate-700 transition-colors">
          Version 1.0.0
        </a>
      </div>
    </div>
  </div>
</footer>
      </div>
    </div>
  );
}