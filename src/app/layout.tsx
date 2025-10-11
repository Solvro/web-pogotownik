import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";

import { QueryProvider } from "@/lib/query-client";
import { cn } from "@/lib/utils";

import "./globals.css";

const space_grotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pogotownik",
  description: "Zawsze bądź gotowy!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <QueryProvider>
        <body className={cn(space_grotesk.variable, "font-sans antialiased")}>
          {children}
        </body>
      </QueryProvider>
    </html>
  );
}
