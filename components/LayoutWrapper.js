// components/LayoutWrapper.js
"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
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

const HIDDEN_NAVBAR_ROUTES = ["/admin"];
const HIDDEN_FOOTER_ROUTES = ["/admin"];

const FADE_DURATION = 250;

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();
  const prevPathnameRef = useRef(pathname);
  const [displayChildren, setDisplayChildren] = useState(children);
  const [fadeState, setFadeState] = useState("visible");

  const isAdminRoute = pathname.startsWith("/admin");

  const shouldHideNavbar = HIDDEN_NAVBAR_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
  const shouldHideFooter = HIDDEN_FOOTER_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  const shouldBeDark = DARK_THEME_ROUTES.some((route) =>
    route === "/"
      ? pathname === "/"
      : pathname === route || pathname.startsWith(`${route}/`)
  );

  // Dynamic body background — dark for public pages, white for admin
  useEffect(() => {
    if (isAdminRoute) {
      document.body.style.backgroundColor = "#ffffff";
    } else {
      document.body.style.backgroundColor = "#060010";
    }
  }, [isAdminRoute]);

  useEffect(() => {
    if (prevPathnameRef.current === pathname) {
      setDisplayChildren(children);
      return;
    }

    prevPathnameRef.current = pathname;

    // Step 1: Fade out current content
    setFadeState("fading-out");

    const fadeOutTimer = setTimeout(() => {
      // Step 2: Swap content while invisible
      setDisplayChildren(children);
      setFadeState("fading-in");

      // Step 3: Fade in new content
      const fadeInTimer = setTimeout(() => {
        setFadeState("visible");
      }, 50);

      return () => clearTimeout(fadeInTimer);
    }, FADE_DURATION);

    return () => clearTimeout(fadeOutTimer);
  }, [pathname, children]);

  const contentStyles = {
    transition: `opacity ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1), transform ${FADE_DURATION}ms cubic-bezier(0.4, 0, 0.2, 1)`,
    opacity: fadeState === "fading-out" ? 0 : 1,
    transform: fadeState === "fading-out" ? "translateY(8px)" : "translateY(0px)",
  };

  return (
    <>
      {!shouldHideNavbar && <NewNavbar isDark={shouldBeDark} />}
      <main className="min-h-screen" style={contentStyles}>
        {displayChildren}
      </main>
      {!shouldHideFooter && <Footer isDark={shouldBeDark} />}
    </>
  );
}