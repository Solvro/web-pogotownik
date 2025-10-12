import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/lib/providers";
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
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={cn(space_grotesk.variable, "font-sans antialiased")}>
        <Providers>
          <Navbar />
          <Toaster richColors />

          {children}

          <Footer />
        </Providers>
      </body>
    </html>
  );
}
