"use client";
import "./globals.css"; // Import global styles
import { SessionProvider } from "next-auth/react";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function RootLayout({ children }) {
  const pathname = usePathname();

  // Hide header on the login page
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
          {/* Simple user icon; you can swap it with an icon library if needed */}
          <div style={iconCircleStyle}>👤</div>
        </Link>
      </div>
    </header>
  );
}

// Inline styles for the header
const headerStyle = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  backgroundColor: "#fff",
  padding: "10px 20px",
  boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
};

const logoContainerStyle = {
  display: "flex",
  alignItems: "center",
};

const userIconStyle = {
  display: "flex",
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
