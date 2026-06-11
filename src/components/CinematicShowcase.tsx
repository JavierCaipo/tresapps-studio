"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Layers, Activity, Shield, Cpu } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

export default function CinematicShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const initialContentRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1.5, // Sedoso retraso inercial
          pin: true,
        },
      });

      tl.to(
        cardRef.current,
        {
          width: "100vw",
          height: "100vh",
          borderRadius: "0px",
          ease: "power2.inOut",
        },
        0
      )
        .to(
          haloRef.current,
          {
            opacity: 0.8,
            scale: 1.5,
            filter: "blur(200px)",
            ease: "power2.inOut",
          },
          0
        )
        .to(
          initialContentRef.current,
          {
            opacity: 0,
            scale: 0.9,
            ease: "power2.out",
          },
          0
        )
        .to(
          imgRef.current,
          {
            filter: "brightness(1.2) contrast(1.1)",
            ease: "power2.inOut",
          },
          0
        )
        .to(
          contentRef.current,
          {
            opacity: 1,
            y: 0,
            ease: "power2.out",
          },
          0.2
        );
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} className="h-[200vh] w-full bg-[#0A0A0B] relative z-10">
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Neon Halo Bloom */}
        <div
          ref={haloRef}
          className="absolute w-[60%] h-[50vh] bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4] opacity-30 blur-[100px] mix-blend-screen pointer-events-none transition-transform"
        />

        {/* Cinematic Expansion Card */}
        <div
          ref={cardRef}
          className="relative w-[60%] h-[50vh] rounded-2xl border border-white/10 flex flex-col items-center justify-center overflow-hidden z-10 shadow-2xl"
        >
          {/* Holographic Background Image */}
          <div className="absolute inset-0 z-0">
            <img 
              ref={imgRef}
              src="/images/dashboard-industrial.webp" 
              alt="Dashboard Industrial" 
              className="w-full h-full object-cover transition-all duration-[1.5s] ease-in-out"
              style={{ filter: "brightness(0.5) contrast(1)" }}
            />
            <div className="absolute inset-0 bg-black/40 mix-blend-overlay" />
          </div>
          {/* Initial State Content */}
          <div
            ref={initialContentRef}
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none"
          >
            <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(139,92,246,0.3)]">
              <Cpu className="w-8 h-8 text-[#8B5CF6]" />
            </div>
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-tighter">
              Core Dashboard
            </h3>
            <p className="text-white/40 text-sm mt-3 font-mono tracking-widest uppercase">
              Monorepo Ecosystem Hub
            </p>
          </div>

          {/* Expanded State Content */}
          <div
            ref={contentRef}
            className="absolute inset-0 p-8 md:p-24 flex flex-col justify-between opacity-0 translate-y-12"
          >
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-5xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-[#8B5CF6] to-[#06B6D4]">
                  System Telemetry
                </h2>
                <p className="text-white/60 mt-2 max-w-lg">
                  Real-time synchronization across all ecosystem modules.
                </p>
              </div>
              <div className="hidden md:flex gap-2">
                <span className="px-3 py-1 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-mono font-bold">
                  LIVE
                </span>
                <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white/60 text-xs font-mono">
                  v2.0.4
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full">
              <div className="bg-[#0A0A0B]/80 border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                <Activity className="w-6 h-6 text-[#06B6D4] mb-4" />
                <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase mb-2">
                  System Load
                </p>
                <p className="text-4xl font-black text-white tracking-tighter">24.5%</p>
              </div>
              <div className="bg-[#0A0A0B]/80 border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                <Layers className="w-6 h-6 text-[#8B5CF6] mb-4" />
                <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase mb-2">
                  Active Modules
                </p>
                <p className="text-4xl font-black text-white tracking-tighter">128</p>
              </div>
              <div className="bg-[#0A0A0B]/80 border border-white/10 p-8 rounded-2xl backdrop-blur-xl shadow-2xl">
                <Shield className="w-6 h-6 text-[#10B981] mb-4" />
                <p className="text-white/40 text-[10px] font-mono tracking-widest uppercase mb-2">
                  Security Status
                </p>
                <p className="text-4xl font-black text-white tracking-tighter">Optimal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
