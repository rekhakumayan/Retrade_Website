
"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Providers from "./providers";
import ThemeLoader from "./ThemeLoader";
import ToastProvider from "@/sharedComponents/Toast/ToastProvider"
import "./globals.css";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
 
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <Providers>
          <ThemeLoader/>
          <ToastProvider />
          {children}
        </Providers>
      </body>
    </html>
  );
}