// components/LayoutWrapper.js
"use client";

import { usePathname } from "next/navigation";
import NewNavbar from "@/components/landing/NewNavbar";
import Footer from "@/components/Footer";

// Configure which pages get dark footer
const DARK_FOOTER_ROUTES = [
  "/",
  // Add more routes here in the future:
  // "/pricing",
  // "/landing",
];

// Configure which routes hide the navbar
const HIDDEN_NAVBAR_ROUTES = [
  "/admin",
  // Add more routes here:
  // "/dashboard",
  // "/auth",
];

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  // Check if navbar should be hidden
  const shouldHideNavbar = HIDDEN_NAVBAR_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // Check if footer should be dark
  const shouldBeDarkFooter = DARK_FOOTER_ROUTES.some(
    (route) => pathname === route
  );

  return (
    <>
      {!shouldHideNavbar && <NewNavbar />}
      <main className="min-h-screen">{children}</main>
      <Footer isDark={shouldBeDarkFooter} />
    </>
  );
}