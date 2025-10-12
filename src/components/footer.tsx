"use client";

import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <div className="fixed inset-x-0 bottom-2 z-10 flex items-center justify-center">
      <footer className="rounded-full bg-white/10 px-5 py-2 text-xs font-medium shadow-lg backdrop-blur-sm">
        <p>
          &copy; Copyright {new Date().getFullYear()} by{" "}
          <Link
            href="https://github.com/kguzek/pogotownik"
            className="font-bold text-blue-500"
          >
            twIST
          </Link>
        </p>
      </footer>
    </div>
  );
}
