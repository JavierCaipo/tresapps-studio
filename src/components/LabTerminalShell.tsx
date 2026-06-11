// LabTerminalShell.tsx — CLIENT boundary
// Owns all Framer Motion animations. Receives <LabRepos /> as a child prop
// so the Server Component is never pulled into this client bundle.
"use client";

import { motion } from "framer-motion";
import { Terminal, GitBranch } from "lucide-react";
import React from "react";

export default function LabTerminalShell({
  reposSlot,
}: {
  reposSlot: React.ReactNode;
}) {
  return (
    <section className="py-40 bg-surface-container-lowest overflow-hidden relative">
      <div
        className="absolute inset-0 opacity-10 pointer-events-none"
        style={{
          backgroundImage:
            "linear-gradient(0deg, #131314 1px, transparent 1px), linear-gradient(90deg, #131314 1px, transparent 1px)",
          backgroundSize: "20px 20px",
        }}
      />
      <div className="max-w-7xl mx-auto px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-10"
          >
            <div className="inline-flex items-center gap-2 text-primary font-mono text-sm tracking-widest bg-primary/10 px-4 py-2 rounded-full border border-primary/20">
              <Terminal className="w-4 h-4" />
              $ TRES_APPS --EXPERIMENTAL_MODE
            </div>
            <h2 className="text-6xl font-headline font-black italic tracking-tighter uppercase leading-none">
              The Synthetic{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                Lab
              </span>
            </h2>
            <p className="text-on-surface-variant leading-relaxed text-xl max-w-lg">
              Our high-end workspace where we open-source core modules and push
              the boundaries of technical architecture.
            </p>

            {/* Server-rendered repo cards passed in as a slot — never re-fetched */}
            {reposSlot}
          </motion.div>

          <div className="relative group">
            {/* Intense Background Neon Halo */}
            <div className="absolute inset-0 bg-[#8B5CF6] blur-[100px] opacity-40 mix-blend-screen pointer-events-none" />
            <div className="absolute -inset-4 bg-gradient-to-r from-[#8B5CF6]/50 to-[#06B6D4]/50 blur-3xl opacity-40 group-hover:opacity-80 transition-opacity" />
            <div className="relative rounded-2xl bg-[#131314]/60 backdrop-blur-2xl border border-white/10 p-8 font-mono text-sm shadow-[0_0_80px_rgba(139,92,246,0.3)] overflow-hidden">
              <div className="flex items-center gap-2 mb-8 border-b border-white/5 pb-4">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-4 text-[10px] text-white/40 tracking-widest uppercase">
                  Editor — main.rs
                </span>
              </div>
              <div className="space-y-2.5 overflow-x-auto custom-scrollbar pb-4">
                <p className="text-white/40 italic">
                  // Critical: Initialize the synthesis kernel
                </p>
                <p className="text-[#ff7b72]">
                  use <span className="text-[#d2a8ff]">tresapps_core</span>
                  {"{"}
                  <span className="text-[#79c0ff]">Engine</span>,{" "}
                  <span className="text-[#79c0ff]">Context</span>
                  {"}"};
                </p>
                <p>&nbsp;</p>
                <p className="text-[#ff7b72]">
                  async fn{" "}
                  <span className="text-[#d2a8ff]">synthesize_asset</span>
                  (ctx: Context) -&gt;{" "}
                  <span className="text-[#79c0ff]">Result</span>
                  &lt;(),{" "}
                  <span className="text-[#79c0ff]">Error</span>&gt; {"{"}
                </p>
                <p className="pl-4 text-[#79c0ff]">
                  let <span className="text-white">lab = Engine::</span>
                  <span className="text-[#d2a8ff]">new</span>(Config {"{"}
                </p>
                <p className="pl-8 text-white">
                  mode: <span className="text-[#a5d6ff]">&quot;experimental&quot;</span>,
                </p>
                <p className="pl-8 text-white">
                  depth: <span className="text-[#79c0ff]">u32</span>::
                  <span className="text-white">MAX,</span>
                </p>
                <p className="pl-4 text-white">{"});"}</p>
                <p>&nbsp;</p>
                <p className="pl-4 text-white">
                  lab.start().<span className="text-[#ff7b72]">await</span>?;
                </p>
                <p className="pl-4 text-white/40 italic">
                  // Pipeline execution...
                </p>
                <p className="pl-4 text-white">
                  <span className="text-[#ff7b72]">Ok</span>(())
                </p>
                <p className="text-white">{"}"}</p>
                <p className="text-primary cursor-blink border-r-2 border-primary w-max h-5 inline-block">
                  _
                </p>
              </div>

              {/* Console Overlay */}
              <div className="absolute bottom-4 right-4 bg-surface-container-highest/90 border border-white/10 px-4 py-2 rounded-lg text-[10px] font-mono text-secondary backdrop-blur-md shadow-2xl">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                  BUILD SUCCESSFUL [2.4s]
                </div>
              </div>
            </div>

            {/* Latest Activity Float */}
            <div className="absolute -bottom-12 -left-8 bg-[#131314]/60 backdrop-blur-2xl p-6 rounded-2xl border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.3)] scale-90 md:scale-100 z-20">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center">
                  <GitBranch className="w-6 h-6 text-on-primary-fixed" />
                </div>
                <div>
                  <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">
                    Latest Commit
                  </p>
                  <p className="text-sm font-bold text-white">
                    feat(core): optimized kernel
                  </p>
                  <p className="text-[10px] text-primary">v2.4.1-stable</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
