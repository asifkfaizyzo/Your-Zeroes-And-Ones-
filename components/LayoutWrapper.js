// components/LayoutWrapper.js
"use client";

import { usePathname } from "next/navigation";
import NewNavbar from "@/components/landing/NewNavbar";
import Footer from "@/components/Footer";

// Configure which pages get dark theme
const DARK_THEME_ROUTES = [
  "/",
  // Add more routes here:
  // "/pricing",
];

// Configure which routes hide the navbar
const HIDDEN_NAVBAR_ROUTES = [
  "/admin",
];

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const shouldHideNavbar = HIDDEN_NAVBAR_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const shouldBeDark = DARK_THEME_ROUTES.some(
    (route) => pathname === route
  );

  return (
    <>
      {!shouldHideNavbar && <NewNavbar isDark={shouldBeDark} />}
      <main className="min-h-screen">{children}</main>
      <Footer isDark={shouldBeDark} />
    </>
  );
}