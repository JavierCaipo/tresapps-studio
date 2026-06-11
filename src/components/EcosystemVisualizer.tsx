"use client";

import { motion } from "framer-motion";
import { Smartphone, Globe, Code2, LayoutDashboard, Cpu } from "lucide-react";
import type { EcosystemNode } from "@/lib/supabase/types";

// ─── Icon map ─────────────────────────────────────────────────────────────────

const NODE_ICON: Record<EcosystemNode["type"], React.ReactNode> = {
  mobile:  <Smartphone className="w-5 h-5" />,
  web:     <Globe className="w-5 h-5" />,
  api:     <Code2 className="w-5 h-5" />,
  admin:   <LayoutDashboard className="w-5 h-5" />,
  service: <Cpu className="w-5 h-5" />,
};

const NODE_LABEL: Record<EcosystemNode["type"], string> = {
  mobile:  "Mobile",
  web:     "Web App",
  api:     "API",
  admin:   "Admin",
  service: "Service",
};

// ─── Animation variants ───────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.10,
      delayChildren: 0.2,
    },
  },
};

const nodeVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.88 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring" as const, stiffness: 220, damping: 24 },
  },
};

// ─── Single Node Card ─────────────────────────────────────────────────────────

function NodeCard({
  node,
  accentColor,
  index,
}: {
  node: EcosystemNode;
  accentColor: string;
  index: number;
}) {
  return (
    <motion.div
      variants={nodeVariants}
      whileHover="hovered"
      initial="rest"
      className="group relative flex flex-col gap-3 p-5 rounded-2xl cursor-default
        bg-[#131314]/80 backdrop-blur-3xl border border-white/5
        transition-all duration-300 overflow-hidden"
    >
      {/* Glow bloom on hover — energy flowing into this node */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition-opacity duration-400"
        style={{
          background: `radial-gradient(ellipse at 50% 110%, ${accentColor}30 0%, transparent 70%)`,
          boxShadow: `inset 0 0 40px ${accentColor}18`,
        }}
      />

      {/* Neon border on hover */}
      <motion.div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0
          group-hover:opacity-100 transition-opacity duration-300"
        style={{ boxShadow: `0 0 0 1px ${accentColor}60` }}
      />

      {/* Node index badge */}
      <span
        className="absolute top-3 right-3 text-[9px] font-black font-mono opacity-20
          group-hover:opacity-60 transition-opacity"
      >
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* Header: icon + type label */}
      <div className="flex items-center gap-2.5">
        <div
          className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0
            bg-white/5 border border-white/10 transition-all duration-300
            group-hover:border-current group-hover:bg-white/10"
          style={{ color: accentColor }}
        >
          {NODE_ICON[node.type]}
        </div>
        <span
          className="text-[9px] font-black tracking-[0.22em] uppercase px-2.5 py-1
            rounded-full bg-white/5 border border-white/10 text-white/40
            group-hover:text-white/70 transition-colors"
        >
          {NODE_LABEL[node.type]}
        </span>
      </div>

      {/* Name */}
      <h3
        className="text-sm font-black tracking-tight text-white/90 group-hover:text-white transition-colors"
      >
        {node.name}
      </h3>

      {/* Role */}
      <p className="text-xs text-white/40 leading-relaxed group-hover:text-white/60 transition-colors">
        {node.role}
      </p>

      {/* Tech pill */}
      <span className="self-start px-2.5 py-1 text-[9px] font-mono font-bold tracking-widest uppercase
        bg-black/50 border border-white/10 rounded-lg text-white/40 group-hover:text-white/60 transition-colors">
        {node.tech}
      </span>
    </motion.div>
  );
}

// ─── Connector Lines (decorative SVG) ─────────────────────────────────────────

function ConnectorLines({ count, accentColor }: { count: number; accentColor: string }) {
  if (count < 2) return null;
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl opacity-20">
      <svg width="100%" height="100%" className="absolute inset-0">
        <defs>
          <linearGradient id="connGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={accentColor} stopOpacity="0" />
            <stop offset="50%" stopColor={accentColor} stopOpacity="0.6" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0" />
          </linearGradient>
        </defs>
        <line x1="10%" y1="50%" x2="90%" y2="50%" stroke="url(#connGrad)" strokeWidth="1" strokeDasharray="4 4" />
        <line x1="50%" y1="10%" x2="50%" y2="90%" stroke="url(#connGrad)" strokeWidth="1" strokeDasharray="4 4" />
      </svg>
    </div>
  );
}

// ─── Main Visualizer ──────────────────────────────────────────────────────────

export default function EcosystemVisualizer({
  nodes,
  accentColor,
}: {
  nodes: EcosystemNode[];
  accentColor: string;
}) {
  return (
    <div className="relative">
      {/* Section label */}
      <div className="flex items-center gap-3 mb-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/30">
          Monorepo Topology · {nodes.length} Nodes
        </p>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* Grid + connector backdrop */}
      <div className="relative">
        <ConnectorLines count={nodes.length} accentColor={accentColor} />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 relative z-10"
        >
          {nodes.map((node, i) => (
            <NodeCard
              key={`${node.name}-${i}`}
              node={node}
              accentColor={accentColor}
              index={i}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
