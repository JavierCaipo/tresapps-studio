"use client";

import { motion } from "framer-motion";
import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const STEPS = [
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
];

export default function Timeline() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    // ── DESKTOP: Pin + horizontal line draw + sequential node ignition ──────
    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "center center",
          end: "+=150%",
          scrub: 1,
          pin: true,
        },
      });

      // Línea horizontal dibujándose (X axis)
      tl.fromTo(
        ".energy-line-x",
        { strokeDashoffset: 1000 },
        { strokeDashoffset: 0, duration: 4, ease: "none" },
        0
      );

      // Ignición secuencial de nodos
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
      nodes.forEach((node, i) => {
        const t = i * 1;

        const numEl = node.querySelector(".timeline-num") as HTMLElement;
        if (numEl) {
          const target = parseInt(numEl.dataset.target ?? numEl.innerText, 10);
          tl.fromTo(
            numEl,
            { innerText: 0 },
            {
              innerText: target,
              duration: 0.5,
              snap: { innerText: 1 },
              onUpdate: function () {
                numEl.innerText = "0" + Math.round(Number(this.targets()[0].innerText));
              },
            },
            t
          );
        }

        tl.to(
          node,
          {
            opacity: 1,
            scale: 1,
            filter: "drop-shadow(0 0 22px rgba(139, 92, 246, 0.55))",
            duration: 0.5,
            ease: "power2.out",
          },
          t
        );

        tl.to(
          node.querySelectorAll(".timeline-text"),
          { y: 0, duration: 0.5, ease: "power2.out" },
          t
        );
      });

      return () => {
        tl.scrollTrigger?.kill();
      };
    });

    // ── MOBILE: Vertical scroll, no pin, growing Y line ────────────────────
    mm.add("(max-width: 767px)", () => {
      // Línea vertical creciendo (height 0 → 100%)
      gsap.fromTo(
        ".energy-line-y",
        { scaleY: 0, transformOrigin: "top center" },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: ".timeline-nodes-col",
            start: "top 70%",
            end: "bottom 70%",
            scrub: 1,
          },
        }
      );

      // Ignición secuencial por intersección individual
      const nodes = gsap.utils.toArray<HTMLElement>(".timeline-node");
      nodes.forEach((node) => {
        const numEl = node.querySelector(".timeline-num") as HTMLElement;

        gsap.to(node, {
          opacity: 1,
          scale: 1,
          filter: "drop-shadow(0 0 18px rgba(139, 92, 246, 0.5))",
          duration: 0.6,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        gsap.to(node.querySelectorAll(".timeline-text"), {
          y: 0,
          duration: 0.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: node,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        });

        if (numEl) {
          const target = parseInt(numEl.dataset.target ?? numEl.innerText, 10);
          gsap.fromTo(
            numEl,
            { innerText: 0 },
            {
              innerText: target,
              duration: 1,
              snap: { innerText: 1 },
              onUpdate: function () {
                numEl.innerText = "0" + Math.round(Number(this.targets()[0].innerText));
              },
              scrollTrigger: {
                trigger: node,
                start: "top 80%",
                toggleActions: "play none none reverse",
              },
            }
          );
        }
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} className="py-24 md:py-32 bg-surface-container-low overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-8 relative">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h2 className="text-3xl md:text-4xl font-headline font-bold">
            The Synthesis <span className="text-primary">Process</span>
          </h2>
          <p className="text-on-surface-variant mt-4">
            A proven journey from concept to market dominance.
          </p>
        </motion.div>

        {/* DESKTOP: horizontal layout */}
        <div className="hidden md:block">
          <div className="relative">
            {/* Horizontal energy line */}
            <div className="absolute top-8 left-0 w-full h-[2px] pointer-events-none">
              <svg width="100%" height="2" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="energy-grad-x" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0.9" />
                  </linearGradient>
                </defs>
                <line
                  x1="0" y1="1" x2="100%" y2="1"
                  stroke="url(#energy-grad-x)"
                  strokeWidth="2"
                  strokeDasharray="1000"
                  strokeDashoffset="1000"
                  className="energy-line-x"
                />
              </svg>
            </div>

            {/* Node grid */}
            <div className="grid grid-cols-4 gap-12 relative z-10">
              {STEPS.map((item) => (
                <div
                  key={item.num}
                  className="timeline-node opacity-30 scale-95 flex flex-col items-center pt-4"
                  style={{ filter: "drop-shadow(0 0 0px rgba(139,92,246,0))" }}
                >
                  <div
                    className={`w-16 h-16 bg-surface rounded-2xl border-2 border-${item.color} flex items-center justify-center mb-8 font-black text-${item.color} text-xl timeline-num`}
                    data-target={item.num}
                  >
                    {item.num}
                  </div>
                  <h4 className="font-bold text-center mb-3 timeline-text translate-y-[20px]">
                    {item.title}
                  </h4>
                  <p className="text-xs text-on-surface-variant px-2 text-center leading-relaxed timeline-text translate-y-[20px]">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE: vertical layout */}
        <div className="md:hidden relative timeline-nodes-col">
          {/* Vertical energy line */}
          <div
            className="energy-line-y absolute left-8 top-0 w-[2px] h-full rounded-full pointer-events-none"
            style={{
              background: "linear-gradient(to bottom, #06B6D4, #8B5CF6)",
              transformOrigin: "top center",
            }}
          />

          <div className="flex flex-col gap-14 pl-20">
            {STEPS.map((item) => (
              <div
                key={item.num}
                className="timeline-node opacity-30 scale-95"
                style={{ filter: "drop-shadow(0 0 0px rgba(139,92,246,0))" }}
              >
                <div className="flex items-center gap-4 mb-4">
                  <div
                    className={`w-14 h-14 flex-shrink-0 bg-surface rounded-2xl border-2 border-${item.color} flex items-center justify-center font-black text-${item.color} text-lg timeline-num`}
                    data-target={item.num}
                  >
                    {item.num}
                  </div>
                  <h4 className="font-bold text-lg timeline-text translate-y-[20px]">
                    {item.title}
                  </h4>
                </div>
                <p className="text-sm text-on-surface-variant leading-relaxed timeline-text translate-y-[20px]">
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
