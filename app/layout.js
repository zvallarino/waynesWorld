// app/layout.js
import { Geist, Geist_Mono, Playfair_Display_SC, Tenor_Sans } from "next/font/google";
import "./globals.css";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// ✅ Add Tenor Sans
const tenorSans = Tenor_Sans({
  subsets: ["latin"],
  weight: "400",              // Tenor Sans has one weight
  variable: "--font-tenor-sans",
  display: "swap",
});

export const metadata = {
  title: "Wayne Bowen Art",
  description: "Created by Zach Vallarino"
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(min-width: 1024px)", color: "#ffffff" },
    { media: "(min-width: 1536px)", color: "#ffffff" },
  ], // <-- important for env(safe-area-inset-*)
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        suppressHydrationWarning
        // Make Tenor Sans the default font across the app:
        className={`${tenorSans.className} ${geistSans.variable} ${geistMono.variable} ${montserrat.variable} antialiased bg-transparent`}
      >
        {children}
      </body>
    </html>
  );
}