"use client";

import "./globals.css";

import NavBarHome from "./components/navbarHome";
import NavButton from "./components/navbutton";
import "bootstrap/dist/css/bootstrap.min.css";
import React, { useState, useEffect } from "react";
import { createContext, useContext } from "react";

export const UserContext = createContext<{
  username: string;
  useremail: string; // Add email property
  setUsername: (newName: string) => void;
}>({
  username: "",
  useremail: "", // Initialize email as an empty string
  setUsername: () => null,
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [username, setUsername] = useState("");
  const [useremail, setUserEmail] = useState("");

  useEffect(() => {
    fetch("/api/connection")
      .then((res) => res.json())
      .then((data: any) => {
        if (data.email) {
          setUserEmail(data.email);
          setUsername(data.name);
        }
      });
  });

  return (
    <html lang="en">
      <body>
        <UserContext.Provider value={{ username, useremail, setUsername }}>
          {/* Layout UI */}
          <header>
            <NavBarHome />
          </header>

          <main>{children}</main>
        </UserContext.Provider>
      </body>
    </html>
  );
}
