"use client";

import Link from "next/link";
import React from "react";

export function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-2 z-10 mx-auto w-fit rounded-full bg-white/10 px-5 py-2 text-xs font-medium shadow-lg backdrop-blur-sm">
      &copy; Copyright {new Date().getFullYear()} by{" "}
      <Link
        href="https://github.com/kguzek/pogotownik"
        className="font-bold text-blue-500"
      >
        twIST
      </Link>
    </footer>
  );
}
