import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { AppShell } from "@/components/layout/AppShell";
import { fetchCollections } from "@/lib/api/collections";
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
  title: "eBonistika",
  description: "Private numismatic and notaphily digital archive",
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const collections = await fetchCollections();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-slate-50 text-slate-900">
        <AppShell collections={collections}>{children}</AppShell>
      </body>
    </html>
  );
}
