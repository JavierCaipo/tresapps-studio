"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
  MotionValue,
} from "framer-motion";
import { Rocket, Brain, Shield } from "lucide-react";
import React, { useState, useRef } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

type CardConfig = {
  id: string;
  icon: React.ReactNode;
  label: string;
  labelColor: string;
  title: string;
  subtitle: string;
  description: string;
  tags: string[];
  borderClass: string;
  haloColor: string;
  haloColor2: string;
  buttonClass: string;
  buttonGlow: string;
  iconBg: string;
  iconColor: string;
  parallaxSpeed: number; // 0–1 relative velocity
};

// ─── Card Data ────────────────────────────────────────────────────────────────

const cards: CardConfig[] = [
  {
    id: "nexuscore",
    icon: <Rocket className="w-7 h-7" strokeWidth={1.5} />,
    label: "LOGISTICS AI",
    labelColor: "text-[#06B6D4]",
    title: "NexusCore –",
    subtitle: "Logistics AI",
    description:
      "Advanced systems of AI in supply chain process optimization, load balancing and predictive routing training for enterprise logistics.",
    tags: ["LOGISTICS AI", "ENTERPRISE"],
    borderClass: "border border-[#06B6D4]/30",
    haloColor: "rgba(139,92,246,0.65)",
    haloColor2: "rgba(236,72,153,0.45)",
    buttonClass:
      "bg-transparent border border-white/20 text-white/70 hover:border-white/40 hover:text-white",
    buttonGlow: "",
    iconBg: "bg-[#06B6D4]/15",
    iconColor: "text-[#06B6D4]",
    parallaxSpeed: 0.85, // slightly slower → lags behind
  },
  {
    id: "synthetix",
    icon: <Brain className="w-7 h-7" strokeWidth={1.5} />,
    label: "ACTIVE LAB",
    labelColor: "text-[#06B6D4]",
    title: "Synthetix Labs –",
    subtitle: "High-performance UI Engine",
    description:
      "Synthetix Labs - high-performance UI Engine. Rapid prototyping and generating complex, state-driven interfaces with Lucide-style products.",
    tags: ["UI ENGINE", "DEVTOOLS"],
    borderClass: "border-2 border-transparent",
    haloColor: "rgba(6,182,212,0.75)",
    haloColor2: "rgba(139,92,246,0.75)",
    buttonClass:
      "bg-gradient-to-r from-[#06B6D4] to-[#8B5CF6] text-white font-bold shadow-[0_0_30px_rgba(6,182,212,0.6)]",
    buttonGlow: "shadow-[0_0_40px_rgba(6,182,212,0.9)]",
    iconBg: "bg-[#06B6D4]/20",
    iconColor: "text-[#06B6D4]",
    parallaxSpeed: 1.0, // fastest — emerges first
  },
  {
    id: "vaultos",
    icon: <Shield className="w-7 h-7" strokeWidth={1.5} />,
    label: "ENTERPRISE",
    labelColor: "text-[#8B5CF6]",
    title: "VaultOS –",
    subtitle: "Fintech Security",
    description:
      "Inter for standard fintech compliance and security. Military-grade data encryption and management for enterprise-grade vaulting security.",
    tags: ["FINTECH", "SECURITY"],
    borderClass: "border border-[#8B5CF6]/30",
    haloColor: "rgba(6,182,212,0.65)",
    haloColor2: "rgba(59,130,246,0.45)",
    buttonClass:
      "bg-transparent border border-white/20 text-white/70 hover:border-white/40 hover:text-white",
    buttonGlow: "",
    iconBg: "bg-[#8B5CF6]/15",
    iconColor: "text-[#8B5CF6]",
    parallaxSpeed: 0.75, // slowest → deepest in Z
  },
];

// ─── Individual Card ──────────────────────────────────────────────────────────

function ProductCard({
  card,
  isCenter,
  cardY,
  cardScale,
  cardOpacity,
}: {
  card: CardConfig;
  isCenter: boolean;
  cardY: MotionValue<number>;
  cardScale: MotionValue<number>;
  cardOpacity: MotionValue<number>;
}) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  return (
    <motion.div
      ref={ref}
      style={{ y: cardY, scale: cardScale, opacity: cardOpacity }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: isCenter ? 1.08 : 1.04,
        y: isCenter ? -14 : -7,
        transition: { type: "spring", stiffness: 260, damping: 22 },
      }}
      className={`relative rounded-3xl overflow-hidden flex flex-col cursor-pointer ${
        isCenter ? "scale-[1.04]" : ""
      }`}
    >
      {/* Gradient border shell (center card only) */}
      {isCenter && (
        <div className="absolute inset-0 rounded-3xl z-0 pointer-events-none">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-[#06B6D4] via-[#8B5CF6] to-[#3B82F6] opacity-80" />
        </div>
      )}

      {/* Glass surface */}
      <div
        className={`relative z-10 flex flex-col h-full rounded-[calc(1.5rem-2px)] m-[2px] overflow-hidden
          bg-[#131314]/80 backdrop-blur-2xl ${!isCenter ? card.borderClass : ""}
          shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]`}
      >
        {/* Dynamic cursor spotlight */}
        <div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: isCenter
              ? `radial-gradient(500px circle at ${mousePos.x}px ${mousePos.y}px,
                  rgba(255,255,255,0.08) 0%,
                  ${card.haloColor} 12%,
                  ${card.haloColor2} 32%,
                  transparent 65%)`
              : `radial-gradient(420px circle at ${mousePos.x}px ${mousePos.y}px,
                  ${card.haloColor} 0%,
                  ${card.haloColor2} 28%,
                  transparent 62%)`,
            mixBlendMode: "screen",
          }}
        />

        {/* Static ambient gradient */}
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-500 ${
            isHovered ? "opacity-100" : "opacity-30"
          }`}
          style={{
            background: isCenter
              ? "linear-gradient(135deg, rgba(6,182,212,0.09) 0%, transparent 50%, rgba(139,92,246,0.09) 100%)"
              : `linear-gradient(135deg, ${card.haloColor.replace("0.65", "0.04")} 0%, transparent 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-7">
          {/* Icon + badge row */}
          <div className="flex items-start justify-between mb-6">
            <div
              className={`w-14 h-14 rounded-2xl ${card.iconBg} ${card.iconColor} flex items-center justify-center
                border border-white/10 shadow-inner transition-all duration-300 ${
                  isHovered ? "scale-110 brightness-125" : ""
                }`}
            >
              {card.icon}
            </div>
            <span
              className={`text-[9px] font-black tracking-[0.22em] uppercase ${card.labelColor}
                bg-white/5 border border-current/20 px-3 py-1.5 rounded-full backdrop-blur-sm`}
            >
              {card.label}
            </span>
          </div>

          {/* Title hierarchy */}
          <h3 className="text-xl font-black text-white/90 leading-tight mb-1 tracking-tight">
            {card.title}
          </h3>
          <h4
            className={`text-xl font-black leading-snug mb-4 tracking-tight transition-colors duration-300 ${
              isCenter
                ? "text-[#06B6D4]"
                : isHovered
                ? "text-white"
                : "text-white/80"
            }`}
          >
            {card.subtitle}
          </h4>

          <p className="text-white/50 text-sm leading-relaxed mb-5 flex-grow">
            {card.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-6">
            {card.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded-lg text-white/40"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* CTA Button */}
          <Link href={`/projects/${card.id}`} className="w-full mt-auto block">
            <button
              className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300
                ${card.buttonClass}
                ${isHovered && isCenter ? card.buttonGlow : ""}
                ${isHovered && !isCenter ? "brightness-125" : ""}`}
            >
              View Project
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProductGrid() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress tied to this section entering the viewport
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "center center"],
  });

  // Springified progress for organic feel
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 20,
    restDelta: 0.001,
  });

  // ── Z-Axis Parallax per card (different speeds) ──────────────────────────

  // Side cards: slower, deeper in Z
  const sideY = useTransform(smoothProgress, [0, 1], [80, 0]);
  const sideScale = useTransform(smoothProgress, [0, 1], [0.82, 1]);
  const sideOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  // Center card: fastest, scale peak higher to maintain hierarchy
  const centerY = useTransform(smoothProgress, [0, 1], [50, 0]);
  const centerScale = useTransform(smoothProgress, [0, 1], [0.86, 1.04]);
  const centerOpacity = useTransform(smoothProgress, [0, 0.3], [0, 1]);

  // ── Glow Parallax — glows drift in opposite direction (20% speed) ─────────
  const glowY = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section ref={sectionRef} className="relative py-32 px-8 max-w-7xl mx-auto overflow-visible">
      {/* ── Ambient Glows with inverse parallax ──────────────────────────── */}
      <motion.div
        style={{ y: glowY }}
        className="absolute -top-20 left-1/4 w-[500px] h-[300px] bg-[#8B5CF6]/12 blur-[130px] rounded-full pointer-events-none mix-blend-screen"
      />
      <motion.div
        style={{ y: glowY }}
        className="absolute top-20 right-1/4 w-[400px] h-[300px] bg-[#06B6D4]/12 blur-[130px] rounded-full pointer-events-none mix-blend-screen"
      />

      {/* ── Section Header ────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-20"
      >
        <p className="text-[#06B6D4] text-[10px] font-black tracking-[0.4em] uppercase mb-4">
          ENTERPRISE PRODUCTS
        </p>
        <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white uppercase mb-5">
          Our Production{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#3B82F6]">
            Output
          </span>
        </h2>
        <p className="text-white/40 max-w-xl mx-auto text-sm tracking-widest uppercase font-medium">
          Industrial-grade SaaS platforms developed, launched, and scaled
          <br />
          by our elite product engineers.
        </p>
      </motion.div>

      {/* ── Cards Grid ───────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        {cards.map((card, i) => {
          const isCenter = i === 1;
          return (
            <ProductCard
              key={card.id}
              card={card}
              isCenter={isCenter}
              cardY={isCenter ? centerY : sideY}
              cardScale={isCenter ? centerScale : sideScale}
              cardOpacity={isCenter ? centerOpacity : sideOpacity}
            />
          );
        })}
      </div>
    </section>
  );
}
