"use client";

import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/60 backdrop-blur-xl dark:bg-[#0e0e0f]/60 shadow-2xl shadow-black/40">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto font-headline tracking-tight font-bold text-sm">
        <div className="text-xl font-black tracking-tighter text-white uppercase group cursor-pointer">
          <span className="group-hover:text-primary transition-colors">Tres</span>
          <span className="text-primary group-hover:text-white transition-colors">
            Apps
          </span>
        </div>
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
