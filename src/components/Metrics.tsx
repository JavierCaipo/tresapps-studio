"use client";

import { motion } from "framer-motion";
import React from "react";
import { Code, Server, Bot, Network } from "lucide-react";

export default function Metrics() {
  return (
    <>
      {/* Services / Technical Pillars */}
      <section className="py-32 px-8 max-w-7xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <h2 className="text-5xl font-headline font-bold mb-6 tracking-tight">
            Technical <span className="text-secondary">Pillars</span>
          </h2>
          <p className="text-on-surface-variant max-w-xl mx-auto">
            The foundational methodologies that ensure every product we build is
            ready for massive scale.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-4 gap-12" style={{ perspective: 1000 }}>
          <motion.div 
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: -5, z: 20 }}
            className="space-y-6 text-center group relative p-6 rounded-2xl hover:bg-[#131314]/40 border border-transparent hover:border-white/5 overflow-hidden transition-colors"
          >
            <motion.div
              animate={{ top: ["-20%", "120%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute left-0 w-full h-[1px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 z-0 pointer-events-none"
            />
            <div className="mx-auto w-20 h-20 rounded-[2rem] bg-surface-container flex items-center justify-center group-hover:bg-primary-container group-hover:text-on-primary-container transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10">
              <Code className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-xl relative z-10">SaaS Dev</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed relative z-10">
              End-to-end product architecture and high-fidelity UI
              implementation.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, rotateX: 5, rotateY: 5, z: 20 }}
            className="space-y-6 text-center group relative p-6 rounded-2xl hover:bg-[#131314]/40 border border-transparent hover:border-white/5 overflow-hidden transition-colors"
          >
            <motion.div
              animate={{ top: ["-20%", "120%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 0.5 }}
              className="absolute left-0 w-full h-[1px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 z-0 pointer-events-none"
            />
            <div className="mx-auto w-20 h-20 rounded-[2rem] bg-surface-container flex items-center justify-center group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 relative z-10">
              <Server className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-xl relative z-10">Custom Systems</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed relative z-10">
              Bespoke software engines tailored for complex industrial logic.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, rotateX: -5, rotateY: -5, z: 20 }}
            className="space-y-6 text-center group relative p-6 rounded-2xl hover:bg-[#131314]/40 border border-transparent hover:border-white/5 overflow-hidden transition-colors"
          >
            <motion.div
              animate={{ top: ["-20%", "120%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1 }}
              className="absolute left-0 w-full h-[1px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 z-0 pointer-events-none"
            />
            <div className="mx-auto w-20 h-20 rounded-[2rem] bg-surface-container flex items-center justify-center group-hover:bg-tertiary-container group-hover:text-on-tertiary-container transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 relative z-10">
              <Bot className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-xl relative z-10">Autonomous Ops</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed relative z-10">
              Intelligent workflows that eliminate operational friction via AI
              integration.
            </p>
          </motion.div>
          <motion.div 
            whileHover={{ scale: 1.05, rotateX: -5, rotateY: 5, z: 20 }}
            className="space-y-6 text-center group relative p-6 rounded-2xl hover:bg-[#131314]/40 border border-transparent hover:border-white/5 overflow-hidden transition-colors"
          >
            <motion.div
              animate={{ top: ["-20%", "120%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: 1.5 }}
              className="absolute left-0 w-full h-[1px] bg-white/20 shadow-[0_0_15px_rgba(255,255,255,0.8)] opacity-0 group-hover:opacity-100 z-0 pointer-events-none"
            />
            <div className="mx-auto w-20 h-20 rounded-[2rem] bg-surface-container flex items-center justify-center group-hover:bg-primary-fixed-dim/20 group-hover:text-primary-fixed transition-all duration-500 group-hover:scale-110 group-hover:-rotate-3 relative z-10">
              <Network className="w-10 h-10" />
            </div>
            <h3 className="font-bold text-xl relative z-10">Infrastructure</h3>
            <p className="text-on-surface-variant text-sm leading-relaxed relative z-10">
              Cloud-native architectures designed for millions of concurrent
              users.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Case Results (Metrics) */}
      <section className="py-32 px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="p-12 rounded-[2.5rem] bg-[#131314]/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(139,92,246,0.1)] text-center group hover:shadow-[0_0_50px_rgba(139,92,246,0.3)] transition-all duration-500"
          >
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              Cost Reduction
            </p>
            <h3 className="text-7xl font-headline font-black text-secondary group-hover:scale-110 transition-transform">
              40<span className="text-3xl">%</span>
            </h3>
            <p className="mt-6 text-sm text-on-surface-variant leading-relaxed">
              Average operational cost efficiency across our product portfolio.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="p-12 rounded-[2.5rem] bg-[#131314]/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(6,182,212,0.1)] text-center group hover:shadow-[0_0_50px_rgba(6,182,212,0.3)] transition-all duration-500"
          >
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              Workflow Velocity
            </p>
            <h3 className="text-7xl font-headline font-black text-primary group-hover:scale-110 transition-transform">
              12x
            </h3>
            <p className="mt-6 text-sm text-on-surface-variant leading-relaxed">
              Increase in development speed using our proprietary lab engines.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="p-12 rounded-[2.5rem] bg-[#131314]/60 backdrop-blur-2xl border border-white/10 shadow-[0_0_50px_rgba(59,130,246,0.1)] text-center group hover:shadow-[0_0_50px_rgba(59,130,246,0.3)] transition-all duration-500"
          >
            <p className="text-on-surface-variant text-[10px] font-bold uppercase tracking-[0.3em] mb-4">
              Global Reach
            </p>
            <h3 className="text-7xl font-headline font-black text-tertiary group-hover:scale-110 transition-transform">
              2.5M
            </h3>
            <p className="mt-6 text-sm text-on-surface-variant leading-relaxed">
              Active monthly users supported by our synthetic architectures.
            </p>
          </motion.div>
        </div>
      </section>
    </>
  );
}
