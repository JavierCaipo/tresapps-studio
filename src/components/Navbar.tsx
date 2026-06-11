"use client";

import Link from "next/link";
import React from "react";
import TresAppsLogo from "./TresAppsLogo";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl dark:bg-[#0e0e0f]/60 shadow-2xl shadow-black/40">
      <div className="flex justify-between items-center px-8 py-3 md:py-4 max-w-7xl mx-auto font-headline tracking-tight font-bold text-sm">
        <Link href="/" className="cursor-pointer">
          <TresAppsLogo />
        </Link>
        <div className="hidden md:flex items-center gap-8">
          <Link
            className="text-[#adaaab] font-medium hover:text-white transition-colors duration-300"
            href="#"
          >
            Products
          </Link>
          <Link
            className="text-[#adaaab] font-medium hover:text-white transition-colors duration-300"
            href="#"
          >
            Lab
          </Link>
          <Link
            className="text-[#adaaab] font-medium hover:text-white transition-colors duration-300"
            href="#"
          >
            Services
          </Link>
          <Link
            className="text-[#adaaab] font-medium hover:text-white transition-colors duration-300"
            href="/studio"
          >
            Studio
          </Link>
          <Link
            className="text-[#adaaab] font-medium hover:text-white transition-colors duration-300"
            href="#"
          >
            How it Works
          </Link>
        </div>
        <button className="bg-primary text-on-primary px-6 py-2.5 rounded-full scale-95 active:scale-90 transition-transform hover:brightness-110 liquid-button">
          Start a Project
        </button>
      </div>
    </nav>
  );
}
