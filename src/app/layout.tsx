import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

import { Analytics } from "@/components/analytics";
import { Footer } from "@/components/footer";
import { Navbar } from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";
import { Providers } from "@/lib/providers/providers";
import { cn } from "@/lib/utils";

import "./globals.css";

const space_grotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const PRODUCTION_URL = "https://pogotownik.pl";

export const metadata: Metadata = {
  title: "Pogotownik",
  description: "Zawsze bądź gotowy!",
  metadataBase: new URL(PRODUCTION_URL),
  openGraph: {
    url: PRODUCTION_URL,
    images: {
      url: "/og-image.png",
      width: 1200,
      height: 630,
    },
  },
  twitter: {
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn(space_grotesk.variable, "font-sans antialiased")}>
        <Providers>
          <Navbar />
          <Toaster richColors />
          {children}
          <Footer />
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
