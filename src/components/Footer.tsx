import Link from "next/link";
import React from "react";
import { Terminal, Globe, ArrowRight } from "lucide-react";
import { openLeadModal } from "./ModalProvider";

export default function Footer() {
  return (
    <>
      <section className="py-40 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 blur-[150px] animate-pulse-slow"></div>
        <div className="max-w-4xl mx-auto text-center px-8 relative z-10">
          <h2 className="text-6xl md:text-8xl font-headline font-black tracking-tighter mb-10 leading-[1.1]">
            Let’s build your next{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-secondary to-tertiary">
              SaaS success
            </span>
          </h2>
          <p className="text-2xl text-on-surface-variant mb-16 font-medium">
            Turn your concept into a high-performance digital reality. Our lab
            is standing by for your next breakthrough.
          </p>
          <div className="flex justify-center mt-12 relative">
            <div className="group/cta relative inline-block">
              {/* Massive Neon Glow behind CTA button */}
              <div className="absolute -inset-4 bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#3B82F6] blur-2xl opacity-60 group-hover/cta:opacity-100 transition-opacity duration-500 animate-pulse-slow mix-blend-screen pointer-events-none"></div>
              
              <button
                onClick={openLeadModal}
                className="relative z-10 bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#3B82F6] text-white font-black px-14 py-7 rounded-2xl text-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all tracking-wide">
                Initiate Project
              </button>
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full rounded-t-[3rem] mt-20 bg-[#131314] dark:bg-[#131314]">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 px-12 py-24 max-w-7xl mx-auto font-headline text-sm text-[#adaaab]">
          <div className="col-span-1 md:col-span-1">
            <div className="text-2xl font-black text-white mb-8 tracking-tighter uppercase">
              TresApps
            </div>
            <p className="leading-relaxed opacity-80 text-base">
              Synthesizing the future of SaaS platforms through elite engineering
              and visionary design.
            </p>
            <div className="flex gap-4 mt-8">
              <Link
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                href="#"
              >
                <Terminal className="w-4 h-4" />
              </Link>
              <Link
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-colors"
                href="#"
              >
                <Globe className="w-4 h-4" />
              </Link>
            </div>
          </div>

          <div>
            <h5 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-xs">
              Ecosystem
            </h5>
            <ul className="space-y-5">
              <li>
                <Link
                  className="hover:text-secondary transition-all opacity-80 hover:opacity-100"
                  href="#"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary transition-all opacity-80 hover:opacity-100"
                  href="#"
                >
                  Lab Repository
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary transition-all opacity-80 hover:opacity-100"
                  href="#"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary transition-all opacity-80 hover:opacity-100"
                  href="#"
                >
                  Case Studies
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-xs">
              Developer Network
            </h5>
            <ul className="space-y-5">
              <li>
                <Link
                  className="hover:text-secondary transition-all opacity-80 hover:opacity-100"
                  href="#"
                >
                  Github
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary transition-all opacity-80 hover:opacity-100"
                  href="#"
                >
                  Technical Docs
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary transition-all opacity-80 hover:opacity-100"
                  href="#"
                >
                  Discord
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary transition-all opacity-80 hover:opacity-100"
                  href="#"
                >
                  X / Twitter
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-8 uppercase tracking-[0.2em] text-xs">
              Inquiries
            </h5>
            <ul className="space-y-5">
              <li>
                <Link
                  className="hover:text-secondary transition-all opacity-80 hover:opacity-100"
                  href="#"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  className="hover:text-secondary transition-all opacity-80 hover:opacity-100"
                  href="#"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  className="text-secondary font-bold flex items-center gap-2 group"
                  href="#"
                >
                  Start Project
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-12 py-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-60">
            © 2026 TresApps Synthetic Lab. Built with precision.
          </p>
          <div className="flex gap-8 text-[10px] opacity-40 font-bold uppercase tracking-widest">
            <Link className="hover:opacity-100 transition-opacity" href="#">
              Privacy Policy
            </Link>
            <Link className="hover:opacity-100 transition-opacity" href="#">
              Terms of Service
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
