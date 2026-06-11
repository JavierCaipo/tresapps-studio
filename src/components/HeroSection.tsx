"use client";

import {
  motion,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  MotionValue,
} from "framer-motion";
import { Network } from "lucide-react";
import React, { useRef } from "react";

// ─── Velocity Skew Hook ───────────────────────────────────────────────────────
// Returns a springified skewY MotionValue derived from scroll velocity.
function useSkewFromVelocity(
  scrollVelocity: MotionValue<number>,
  clampDeg: number = 2.5
): MotionValue<number> {
  const smoothVelocity = useSpring(scrollVelocity, {
    stiffness: 400,
    damping: 50,
    restDelta: 0.001,
  });

  // Map velocity (px/s) ±2000 to skew ±clampDeg degrees
  return useTransform(smoothVelocity, [-2000, 0, 2000], [-clampDeg, 0, clampDeg]);
}

// ─── Component ────────────────────────────────────────────────────────────────
export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // ── Scroll hooks ────────────────────────────────────────────────────────────
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const floatSkewY = useSkewFromVelocity(scrollVelocity, 2.5);

  // Ambient glow inverse parallax (drift opposite to scroll at 20% speed)
  const { scrollYProgress: heroProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const smoothHeroProgress = useSpring(heroProgress, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  });
  const glowLeft = useTransform(smoothHeroProgress, [0, 1], ["0%", "12%"]);
  const glowRight = useTransform(smoothHeroProgress, [0, 1], ["0%", "-12%"]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen flex items-center pt-20 overflow-hidden hero-grid"
    >
      <div className="absolute inset-0 bg-[#0A0A0B]/80 z-0 pointer-events-none" />

      {/* ── Ambient Glows — inverse parallax at ~20% scroll speed ─────────── */}
      <motion.div
        style={{ x: glowLeft }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-[#8B5CF6]/20 rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none"
      />
      <motion.div
        style={{ x: glowRight }}
        className="absolute top-1/4 -right-40 w-[600px] h-[600px] bg-[#06B6D4]/20 rounded-full blur-[150px] opacity-40 mix-blend-screen pointer-events-none"
      />

      {/* ── Main layout ────────────────────────────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-8 relative z-10 grid md:grid-cols-2 gap-16 items-center">

        {/* Left: Headline copy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0, 0, 0.2, 1] }}
          className="space-y-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-highest border border-outline-variant/20">
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-xs font-bold tracking-widest uppercase text-on-surface-variant">
              Synthesizing Tomorrow
            </span>
          </div>

          <h1 className="text-white font-black text-6xl md:text-8xl tracking-tighter leading-none">
            We build{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#3B82F6]">
              real SaaS
            </span>{" "}
            products
          </h1>

          <p className="text-xl text-on-surface-variant max-w-lg leading-relaxed">
            From raw idea to hyper-scalable platforms. We don&apos;t just ship
            code; we engineer market-ready digital assets in our synthetic lab.
          </p>

          <div className="flex flex-wrap gap-4">
            <button className="liquid-button bg-gradient-to-br from-primary to-tertiary text-on-primary-fixed font-bold px-8 py-4 rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-transform">
              View Projects
            </button>
            <button className="bg-surface-container-high border border-outline-variant/30 text-on-surface font-bold px-8 py-4 rounded-xl hover:bg-surface-bright transition-colors">
              Our Process
            </button>
          </div>
        </motion.div>

        {/* Right: Floating UI elements with velocity skew */}
        <div className="relative hidden md:block h-[600px]">

          {/* ── Dashboard Snippet — cian halo + velocity skew ───────────── */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-10 right-0 w-80 h-80 bg-[#06B6D4] blur-[80px] opacity-40 mix-blend-screen pointer-events-none z-10"
          />
          <motion.div
            style={{ skewY: floatSkewY }}
            className="absolute top-10 right-0 bg-[#131314]/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(6,182,212,0.4)] p-4 rounded-2xl w-80 animate-float z-20 origin-bottom"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-2 h-2 rounded-full bg-error" />
              <div className="w-2 h-2 rounded-full bg-yellow-500" />
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="ml-auto text-[10px] font-mono text-on-surface-variant">
                analytics.v3.ts
              </span>
            </div>
            <div className="space-y-3">
              <div className="h-2 w-3/4 bg-[#8B5CF6]/20 rounded" />
              <div className="h-2 w-1/2 bg-[#06B6D4]/20 rounded" />
              <div className="flex gap-2">
                <div className="h-12 flex-1 bg-surface-container-highest rounded border border-outline-variant/10 flex items-end p-2 gap-1">
                  <div className="w-full bg-[#8B5CF6] h-1/2 rounded-t-sm" />
                  <div className="w-full bg-[#8B5CF6] h-3/4 rounded-t-sm" />
                  <div className="w-full bg-[#8B5CF6] h-2/3 rounded-t-sm" />
                  <div className="w-full bg-[#06B6D4] h-full rounded-t-sm" />
                </div>
                <div className="h-12 flex-1 bg-surface-container-highest rounded border border-outline-variant/10 flex items-end p-2 gap-1">
                  <div className="w-full bg-[#3B82F6] h-1/3 rounded-t-sm" />
                  <div className="w-full bg-[#3B82F6] h-1/2 rounded-t-sm" />
                  <div className="w-full bg-[#8B5CF6] h-2/3 rounded-t-sm" />
                  <div className="w-full bg-[#8B5CF6] h-1/4 rounded-t-sm" />
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── NexusCore Node — purple halo + velocity skew (opposite sign) */}
          <motion.div
            animate={{ opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
            className="absolute bottom-20 left-10 w-72 h-72 bg-[#8B5CF6] blur-[80px] opacity-40 mix-blend-screen pointer-events-none z-0"
          />
          {/* Use negative skew so it leans in the opposite direction — 2-depth illusion */}
          <motion.div
            style={{
              skewY: useTransform(floatSkewY, (v: number) => -v * 0.7),
            }}
            className="absolute bottom-20 left-10 bg-[#131314]/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_80px_rgba(139,92,246,0.4)] p-5 rounded-3xl w-72 animate-float-delayed z-10 origin-top"
          >
            <div className="flex justify-between items-center mb-4">
              <span className="text-[10px] font-bold text-secondary tracking-widest uppercase">
                NexusCore Node
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-secondary-container/30 text-secondary">
                Active
              </span>
            </div>
            <div className="relative h-24 flex items-center justify-center">
              <div className="absolute w-12 h-12 rounded-full border border-secondary/50 animate-ping" />
              <Network className="w-10 h-10 text-secondary" />
              <div className="absolute top-0 right-0 w-1.5 h-1.5 rounded-full bg-secondary" />
              <div className="absolute bottom-2 left-4 w-1.5 h-1.5 rounded-full bg-primary" />
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <div className="bg-surface/40 p-2 rounded-lg text-center">
                <p className="text-[8px] text-on-surface-variant">LATENCY</p>
                <p className="text-xs font-mono font-bold">14ms</p>
              </div>
              <div className="bg-surface/40 p-2 rounded-lg text-center">
                <p className="text-[8px] text-on-surface-variant">UPTIME</p>
                <p className="text-xs font-mono font-bold">99.9%</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
