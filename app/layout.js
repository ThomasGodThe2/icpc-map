"use client"

import localFont from "next/font/local";
import "./globals.css";
// import { UserProvider } from '@auth0/nextjs-auth0/client'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
  
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// export const metadata = {
//   title: "ICPC Mindmap",
//   description: "The Source of all your Algorithmic Knowledge",
// };

// "use client";

import { UserProvider, useUser } from "@auth0/nextjs-auth0/client";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <UserProvider>
        <body
          className="antialiased"
          style={{
            fontFamily: "Inter, sans-serif",
            margin: 0,
            padding: 0,
            backgroundColor: "#f9fafb", // Light background
          }}
        >
          <Navbar />
          {children}
        </body>
      </UserProvider>
    </html>
  );
}

function Navbar() {
  const { user } = useUser(); // Auth0 user object
  const isAuthenticated = !!user;

  return (
    <nav style={navbarStyle}>
      <div style={containerStyle}>
        {/* Left-side links */}
        <div style={linksContainerStyle}>
          <a href="/topics" style={buttonStyle}>
            Topics
          </a>
          <a href="/topics/create" style={buttonStyle}>
            Create
          </a>
          <a href="/" style={buttonStyle}>
            Visualize
          </a>
        </div>

        {/* Right-side auth links */}
        <div style={authContainerStyle}>
          {!isAuthenticated ? (
            <>
              <a href="/api/auth/login" style={authButtonStyle}>
                Login/Sign Up
              </a>              
            </>
          ) : (
            <a href="/api/auth/logout" style={authButtonStyle}>
              Logout
            </a>
          )}
        </div>
      </div>
    </nav>
  );
}

// Shared styles
const baseButtonStyle = {
  textDecoration: "none",
  fontSize: "15px",
  fontWeight: "bold",
  padding: "10px 20px",
  borderRadius: "25px",
  display: "inline-block",
  textAlign: "center",
  transition: "all 0.3s ease",
  cursor: "pointer",
};

// Navbar styles
const navbarStyle = {
  backgroundColor: "#ffffff",
  borderBottom: "1px solid #e5e5e5",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  padding: "10px 0",
  position: "sticky",
  top: 0,
  zIndex: 1000,
};

const containerStyle = {
  maxWidth: "1200px",
  margin: "0 auto",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 20px",
};

const linksContainerStyle = {
  display: "flex",
  gap: "15px",
};

const authContainerStyle = {
  display: "flex",
  gap: "10px",
};

// Link/button styles for Topics, Create, and Visualize
const buttonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#4CAF50",
  color: "#ffffff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

const authButtonStyle = {
  ...baseButtonStyle,
  backgroundColor: "#007BFF",
  color: "#ffffff",
  boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
};

// Add hover effects
Object.assign(buttonStyle, {
  ":hover": {
    backgroundColor: "#45a049",
  },
});

Object.assign(authButtonStyle, {
  ":hover": {
    backgroundColor: "#0056b3",
  },
});