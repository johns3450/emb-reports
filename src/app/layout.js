// src/app/layout.js
"use client";
import "./globals.css"; // Import your global styles
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
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}

function Header() {
  return (
    <header style={headerStyle}>
      {/* Left placeholder to balance the right icon */}
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

function Footer() {
  return (
    <div style={footerStyle}>
      <p style={footerTextStyle}>ExpandMyBrand Customer Portal</p>
    </div>
  );
}

// Header styles
const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 1000,
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

// Footer styles
const footerStyle = {
  backgroundColor: "#ffffff",
  width: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  padding: "10px 0",
  boxShadow: "0 -2px 5px rgba(0, 0, 0, 0.1)",
};

const footerTextStyle = {
  fontSize: "1rem",
  fontFamily: "Arial, Helvetica, sans-serif",
  color: "#171717",
};
