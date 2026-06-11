"use client";

import { motion } from "framer-motion";
import React from "react";

export default function Timeline() {
  return (
    <section className="py-32 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-8 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl font-headline font-bold">
            The Synthesis <span className="text-primary">Process</span>
          </h2>
          <p className="text-on-surface-variant mt-4">
            A proven journey from concept to market dominance.
          </p>
        </motion.div>

        <div className="relative">
          <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-outline-variant/40 to-transparent hidden md:block -translate-y-1/2"></div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 relative z-10">
            {[
              {
                num: "01",
                color: "primary",
                title: "Idea Injection",
                desc: "Market-fit synthesis and technical feasibility mapping with our lead engineers.",
              },
              {
                num: "02",
                color: "secondary",
                title: "Design DNA",
                desc: "Building the visual framework and user interaction models with rapid prototyping.",
              },
              {
                num: "03",
                color: "tertiary",
                title: "Neural Build",
                desc: "Heavy-duty core engineering using our modular component library and cloud systems.",
              },
              {
                num: "04",
                color: "primary-fixed",
                title: "Scale Out",
                desc: "Market activation, performance tuning, and global infrastructure expansion.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                className="group"
              >
                <div
                  className={`w-16 h-16 bg-surface rounded-2xl border-2 border-${item.color} flex items-center justify-center mx-auto mb-8 font-black text-${item.color} text-xl shadow-xl shadow-${item.color}/10 group-hover:scale-110 transition-transform`}
                >
                  {item.num}
                </div>
                <h4 className="font-bold text-center mb-3">{item.title}</h4>
                <p className="text-xs text-on-surface-variant px-4 text-center leading-relaxed">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
