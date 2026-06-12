"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    // Pulse energy line
    gsap.fromTo(".energy-line", 
      { strokeDashoffset: 1000 },
      { 
        strokeDashoffset: 0, 
        duration: 3, 
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top center",
          toggleActions: "play none none reverse",
        }
      }
    );

    // Number counting
    gsap.utils.toArray<HTMLElement>(".timeline-num").forEach((el) => {
      const targetNum = parseInt(el.innerText, 10);
      gsap.fromTo(el, 
        { innerText: 0 },
        {
          innerText: targetNum,
          duration: 1.5,
          snap: { innerText: 1 },
          scrollTrigger: {
            trigger: el,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
          onUpdate: function() {
            el.innerText = '0' + Math.round(this.targets()[0].innerText);
          }
        }
      );
    });
  }, { scope: containerRef });
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

        <div className="relative" ref={containerRef}>
          {/* Energy line using SVG for stroke-dashoffset */}
          <div className="absolute top-1/2 left-0 w-full h-[2px] hidden md:block -translate-y-1/2">
            <svg width="100%" height="2" preserveAspectRatio="none">
              <line 
                x1="0" y1="1" x2="100%" y2="1" 
                stroke="url(#energy-grad)" 
                strokeWidth="2" 
                strokeDasharray="1000" 
                strokeDashoffset="1000"
                className="energy-line"
              />
              <defs>
                <linearGradient id="energy-grad" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="transparent" />
                  <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>
            </svg>
          </div>
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
                  className={`w-16 h-16 bg-surface rounded-2xl border-2 border-${item.color} flex items-center justify-center mx-auto mb-8 font-black text-${item.color} text-xl shadow-xl shadow-${item.color}/10 group-hover:scale-110 transition-transform timeline-num`}
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
