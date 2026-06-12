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
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "center center",
        end: "+=150%",
        scrub: 1,
        pin: true,
      }
    });

    // 1. Línea de Energía dibujándose
    tl.fromTo(".energy-line", 
      { strokeDashoffset: 1000 },
      { strokeDashoffset: 0, duration: 4, ease: "none" },
      0
    );

    // 2. Nodos Secuenciales
    const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
    nodes.forEach((node, i) => {
      const startTime = i * 1; 

      const numEl = node.querySelector(".timeline-num") as HTMLElement;
      if (numEl) {
        const targetNum = parseInt(numEl.innerText, 10);
        tl.fromTo(numEl, 
          { innerText: 0 },
          {
            innerText: targetNum,
            duration: 0.5,
            snap: { innerText: 1 },
            onUpdate: function() {
              numEl.innerText = '0' + Math.round(Number(this.targets()[0].innerText));
            }
          },
          startTime
        );
      }

      // Activación del nodo completo
      tl.to(node, {
        opacity: 1,
        scale: 1,
        filter: "drop-shadow(0 0 20px rgba(139, 92, 246, 0.5))",
        duration: 0.5,
        ease: "power2.out",
      }, startTime);

      // Elevación de texto
      const texts = node.querySelectorAll(".timeline-text");
      tl.to(texts, {
        y: 0,
        duration: 0.5,
        ease: "power2.out"
      }, startTime);
    });

  }, { scope: sectionRef });
  return (
    <section ref={sectionRef} className="py-32 bg-surface-container-low overflow-hidden">
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
            ].map((item) => (
              <div
                key={item.num}
                className="group timeline-node opacity-30 scale-95"
                style={{ filter: "drop-shadow(0 0 0px rgba(139, 92, 246, 0))" }}
              >
                <div
                  className={`w-16 h-16 bg-surface rounded-2xl border-2 border-${item.color} flex items-center justify-center mx-auto mb-8 font-black text-${item.color} text-xl transition-transform timeline-num`}
                >
                  {item.num}
                </div>
                <h4 className="font-bold text-center mb-3 timeline-text translate-y-[20px]">{item.title}</h4>
                <p className="text-xs text-on-surface-variant px-4 text-center leading-relaxed timeline-text translate-y-[20px]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
