"use client";
import "./globals.css";
import Navbar from "@/components/Navbar";

import { UserDataProvider } from "../context/UserDataContext";
import { ToastContainer } from 'react-toastify';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <UserDataProvider>
          <Navbar/>
          <ToastContainer/>
          {children}
        </UserDataProvider>
        
      </body>
    </html>
  );
}
