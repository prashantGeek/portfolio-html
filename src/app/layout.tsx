import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Prashant Tiwari - Full Stack Developer",
  description: "Full Stack Developer creating dynamic, user-focused web applications with expertise in both frontend and backend technologies.",
  keywords: "Full Stack Developer, React, Next.js, Node.js, JavaScript, TypeScript, Web Development",
  authors: [{ name: "Prashant Tiwari" }],
  openGraph: {
    title: "Prashant Tiwari - Full Stack Developer",
    description: "Full Stack Developer creating dynamic, user-focused web applications",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
