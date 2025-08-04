// app/layout.tsx

import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import Navbar from "@/components/Navbar";
import { AuthProvider } from "@/context/AuthContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scribbo",
  description: "A platform for sharing and discovering stories",
  openGraph: {
    title: "Scribbo",
    description: "A platform for sharing and discovering stories",
    url: "https://scribbo.vercel.app", // 🔗 Add actual URL here
    siteName: "Scribbo",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        // className={`
        //   ${geistSans.variable} 
        //   ${geistMono.variable} 
        //   bg-[#f9fafb] 
        //   text-gray-900 
        //   antialiased 
        //   min-h-screen 
        //   flex flex-col
        // `}
      >
        <AuthProvider>
          <Navbar />
          <main className="flex-1 px-4 md:px-8 py-4">{children}</main>
        </AuthProvider>
      </body>
    </html>
  );
}
