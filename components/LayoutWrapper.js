// components/LayoutWrapper.js
"use client";

import { usePathname } from "next/navigation";
import NewNavbar from "@/components/landing/NewNavbar";
import Footer from "@/components/Footer";

const DARK_THEME_ROUTES = [
  "/",
  "/about",
  "/portfolio",
  "/blog",
  "/services",
  "/testimonials",
  "/sitemap",
  "/privacy-policy",
  "/clients",
  "/contact",
];

const HIDDEN_NAVBAR_ROUTES = [
  "/admin",
];

const HIDDEN_FOOTER_ROUTES = [
  "/admin",
];

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  const shouldHideNavbar = HIDDEN_NAVBAR_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const shouldHideFooter = HIDDEN_FOOTER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  // "/" matches exactly, others match with prefix (e.g. /portfolio/some-slug)
  const shouldBeDark = DARK_THEME_ROUTES.some(
    (route) => route === "/"
      ? pathname === "/"
      : pathname === route || pathname.startsWith(`${route}/`)
  );

  return (
    <>
      {!shouldHideNavbar && <NewNavbar isDark={shouldBeDark} />}
      <main className="min-h-screen">{children}</main>
      {!shouldHideFooter && <Footer isDark={shouldBeDark} />}
    </>
  );
}