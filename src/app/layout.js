// src/app/layout.js
"use client";

import "./globals.css"; // Make sure global CSS is imported
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide header on login page
  const hideHeader = pathname.startsWith("/login");

  return (
    <html lang="en">
      <head>
        <title>ExpandMyBrand Customer Portal</title>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body>
        <SessionProvider>
          {!hideHeader && <Header />}
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header style={headerStyle}>
      {/* Left placeholder to balance the user icon on the right */}
      <div style={placeholderStyle}></div>
      <div style={logoContainerStyle}>
        <Link href="/portal">
          <img
            src="/ExpandMyBrand_Logo.png"
            alt="ExpandMyBrand"
            style={{ maxHeight: "50px", cursor: "pointer" }}
          />
        </Link>
      </div>
      <div style={userIconStyle}>
        <Link href="/profile">
          <div style={iconCircleStyle}>👤</div>
        </Link>
      </div>
    </header>
  );
}

// Inline styles for the header
const headerStyle = {
  display: "flex",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "10px 20px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const placeholderStyle = {
  flex: 1,
};

const logoContainerStyle = {
  flex: "none",
};

const userIconStyle = {
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
};

const iconCircleStyle = {
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  backgroundColor: "#eee",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
};
