// src/app/studio/page.tsx

import React from "react";
import Link from "next/link";
import { ArrowLeft, Sparkles, Code2 } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Studio — TresApps",
  description: "TresApps Studio - Coming Soon",
};

export default function StudioPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white flex flex-col items-center justify-center relative overflow-hidden">
      {/* ── Background Glows ─────────────────────────────────────────────── */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-gradient-to-r from-[#8B5CF6]/20 to-[#06B6D4]/20 blur-[150px] mix-blend-screen pointer-events-none" />

      {/* ── Glassmorphism Card ───────────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-2xl px-8">
        <div className="p-12 md:p-16 rounded-3xl bg-[#131314]/80 backdrop-blur-3xl border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.15)] flex flex-col items-center text-center">
          
          <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-8 shadow-[inset_0_0_20px_rgba(6,182,212,0.2)]">
            <Sparkles className="w-8 h-8 text-[#06B6D4]" />
          </div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 leading-none text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
            Studio
          </h1>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono tracking-widest uppercase mb-8">
            <span className="w-2 h-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            Under Construction
          </div>

          <p className="text-lg text-white/50 leading-relaxed max-w-lg mb-10">
            We are engineering a high-end workspace for our proprietary tools and digital assets. The ultimate creative laboratory is deploying soon.
          </p>

          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-bold tracking-wide text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Return to Core
          </Link>
        </div>
      </div>
    </div>
  );
}
