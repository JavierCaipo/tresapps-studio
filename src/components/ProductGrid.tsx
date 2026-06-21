"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValue,
  useMotionTemplate,
  MotionValue,
} from "framer-motion";
import React, { useRef, useState } from "react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────────────────────────

export type Project = {
  id: string;
  slug: string;
  name: string;
  tagline?: string | null;
  description?: string | null;
  status: "live" | "beta" | "archived";
  accent_color: string;
  accent_color_2: string;
  stack?: string[] | null;
  core_stack?: string[] | null;
  features?: string[] | null;
  market?: string | null;
  // ── JTBD Matrix fields ────────────────────────────────────────────────────
  category?: "ecosystem" | "utility" | "lab" | null;
  jtbd_headline?: string | null;
  jtbd_outcome?: string | null;
  external_url?: string | null;
  logo_url?: string | null;
};

// ─── Status badge colours ──────────────────────────────────────────────────────

const STATUS_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  live:     { label: "LIVE",     color: "text-emerald-400", bg: "bg-emerald-400/10 border-emerald-400/20" },
  beta:     { label: "BETA",     color: "text-amber-400",   bg: "bg-amber-400/10   border-amber-400/20"   },
  archived: { label: "ARCHIVED", color: "text-white/40",    bg: "bg-white/5        border-white/10"       },
};

// ─── Individual Card ──────────────────────────────────────────────────────────

function ProductCard({
  project,
  cardY,
  cardOpacity,
}: {
  project: Project;
  cardY: MotionValue<number>;
  cardOpacity: MotionValue<number>;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = ({ currentTarget, clientX, clientY }: React.MouseEvent) => {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  };

  // Derive accent halo from project colours
  const halo1 = `${project.accent_color}99`;   // ~60% opacity
  const halo2 = `${project.accent_color_2}77`; // ~47% opacity

  const status = STATUS_STYLES[project.status] ?? STATUS_STYLES.archived;

  // ── Routing: external takes priority ────────────────────────────────────────
  const isExternal = Boolean(project.external_url);
  const href       = project.external_url ?? `/projects/${project.slug}`;
  const linkProps  = isExternal
    ? { target: "_blank" as const, rel: "noopener noreferrer" }
    : {};

  // ── Display copy: prefer JTBD fields, fall back to legacy fields ─────────
  const headline = project.jtbd_headline ?? project.name;
  const outcome  = project.jtbd_outcome  ?? project.description ?? "";

  const spotlightBackground = useMotionTemplate`radial-gradient(400px circle at ${mouseX}px ${mouseY}px, ${halo1}A6 0%, ${halo2}73 28%, transparent 62%)`;

  return (
    <motion.div
      ref={ref}
      style={{ y: cardY, opacity: cardOpacity }}
      onMouseMove={handleMouseMove}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      whileHover={{
        scale: 1.05,
        y: -8,
        zIndex: 50,
        boxShadow: `0px 20px 40px -10px ${project.accent_color}80`,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      }}
      className={`relative z-10 transition-colors duration-300 rounded-3xl overflow-hidden flex flex-col cursor-pointer group`}
    >
      {/* Glass surface */}
      <div
        className={`relative z-10 flex flex-col h-full rounded-[calc(1.5rem-2px)] m-[2px] overflow-hidden
          bg-[#131314]/80 backdrop-blur-2xl
          border border-[${project.accent_color}]/30
          shadow-[inset_0_1px_0_rgba(255,255,255,0.07)]`}
      >
        {/* Dynamic cursor spotlight */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
          style={{
            opacity: isHovered ? 1 : 0,
            background: spotlightBackground,
            mixBlendMode: "screen",
          }}
        />

        {/* Static ambient gradient */}
        <div
          className={`absolute inset-0 z-0 transition-opacity duration-500 opacity-30 group-hover:opacity-100`}
          style={{
            background: `linear-gradient(135deg, ${project.accent_color}15 0%, transparent 100%)`,
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col h-full p-7">
          {/* Status badge + year row */}
          <div className="flex items-start justify-between mb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center
                border border-white/10 shadow-inner transition-all duration-300 text-2xl font-black overflow-hidden"
              style={{
                background: `${project.accent_color}20`,
                color: project.accent_color,
              }}
            >
              {project.logo_url ? (
                /* eslint-disable-next-line @next/next/no-img-element */
                <img src={project.logo_url} className="w-full h-full object-contain p-2" alt="logo" />
              ) : (
                project.name.substring(0, 2).toUpperCase()
              )}
            </div>
            <span
              className={`text-[9px] font-black tracking-[0.22em] uppercase ${status.color}
                ${status.bg} border px-3 py-1.5 rounded-full backdrop-blur-sm`}
            >
              {status.label}
            </span>
          </div>

          {/* Title hierarchy */}
          <h3 className="text-xl font-black text-white/90 leading-tight mb-1 tracking-tight">
            {project.name}
          </h3>
          <h4
            className={`text-base font-bold leading-snug mb-4 tracking-tight transition-colors duration-300 text-white/70 group-hover:text-white`}
            style={{ color: project.accent_color }}
          >
            {headline}
          </h4>

          <p className="text-white/50 text-sm leading-relaxed mb-5 flex-grow">
            {outcome}
          </p>

          {/* Stack tags — defensive array handling to prevent slice() on null/undefined */}
          {(() => {
            // 1. Garantizar que core_stack sea siempre un array válido antes de operar
            const safeCoreStack = Array.isArray(project.core_stack) ? project.core_stack : [];

            // 2. Construcción segura de los tags
            const tags = [
              project.market || "ENTERPRISE",
              ...safeCoreStack.slice(0, 2),
            ];

            return (
              <div className="flex flex-wrap gap-2 mb-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[9px] font-bold tracking-widest uppercase bg-white/5 border border-white/10 rounded-lg text-white/40"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            );
          })()}

          {/* CTA Button — intelligent routing */}
          <Link href={href} prefetch={false} className="w-full mt-auto block" {...linkProps}>
            <button
              className={`w-full py-3.5 rounded-xl text-sm font-bold tracking-wide transition-all duration-300
                bg-transparent border border-white/20 text-white/70 hover:border-white/40 hover:text-white group-hover:brightness-125`}
            >
              {isExternal ? "Open App ↗" : "View Project →"}
            </button>
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────

export default function ProductGrid({
  projects = [],
  title,
  highlight,
  subtitle,
}: {
  projects: Project[];
  title: string;
  highlight: string;
  subtitle: string;
}) {
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

  // ── Z-Axis Parallax per card ───────────────────────────────────────────────
  const cardY       = useTransform(smoothProgress, [0, 1], [80, 0]);
  const cardOpacity = useTransform(smoothProgress, [0, 0.4], [0, 1]);

  // Glows drift inverse direction
  const glowY = useTransform(smoothProgress, [0, 1], ["-10%", "10%"]);

  if (!projects.length) return null;

  return (
    <section ref={sectionRef} className="relative py-24 px-8 max-w-7xl mx-auto overflow-visible">
      {/* ── Ambient Glows ────────────────────────────────────────────────────── */}
      <motion.div
        style={{ y: glowY }}
        className="absolute -top-20 left-1/4 w-[500px] h-[300px] bg-[#8B5CF6]/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen"
      />
      <motion.div
        style={{ y: glowY }}
        className="absolute top-20 right-1/4 w-[400px] h-[300px] bg-[#06B6D4]/10 blur-[130px] rounded-full pointer-events-none mix-blend-screen"
      />

      {/* ── Section Header ───────────────────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        className="text-center mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white uppercase mb-4">
          {title}{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#3B82F6]">
            {highlight}
          </span>
        </h2>
        <p className="text-white/40 max-w-xl mx-auto text-sm tracking-widest uppercase font-medium">
          {subtitle}
        </p>
      </motion.div>

      {/* ── Cards Grid ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
        {projects.map((project) => (
          <ProductCard
            key={project.id}
            project={project}
            cardY={cardY}
            cardOpacity={cardOpacity}
          />
        ))}
      </div>
    </section>
  );
}
