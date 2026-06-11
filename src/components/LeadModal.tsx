"use client";

import { AnimatePresence, motion } from "framer-motion";
import { X, Loader2, CheckCircle2, Send } from "lucide-react";
import React, { useTransition, useState, useEffect, useRef } from "react";
import { submitLead } from "@/app/actions/leads";

// ─── Types ────────────────────────────────────────────────────────────────────

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type SubmitState = "idle" | "loading" | "success" | "error";

// ─── Input Component ──────────────────────────────────────────────────────────

function Field({
  id,
  label,
  type = "text",
  name,
  placeholder,
  required = false,
  textarea = false,
}: {
  id: string;
  label: string;
  type?: string;
  name: string;
  placeholder: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const baseClass =
    "w-full bg-black/50 border border-white/10 text-white placeholder-white/30 " +
    "rounded-xl px-4 py-3 text-sm outline-none transition-all duration-200 " +
    "focus:border-[#06B6D4] focus:ring-1 focus:ring-[#06B6D4] focus:bg-black/70";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={id}
        className="text-[11px] font-bold tracking-[0.18em] uppercase text-white/50"
      >
        {label}
        {required && <span className="text-[#06B6D4] ml-1">*</span>}
      </label>
      {textarea ? (
        <textarea
          id={id}
          name={name}
          rows={4}
          placeholder={placeholder}
          className={`${baseClass} resize-none`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className={baseClass}
        />
      )}
    </div>
  );
}

// ─── Modal ────────────────────────────────────────────────────────────────────

export default function LeadModal({ isOpen, onClose }: LeadModalProps) {
  const [isPending, startTransition] = useTransition();
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");
  const formRef = useRef<HTMLFormElement>(null);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  // Auto-close after success
  useEffect(() => {
    if (submitState === "success") {
      const timer = setTimeout(onClose, 2600);
      return () => clearTimeout(timer);
    }
  }, [submitState, onClose]);

  // Reset state when modal reopens
  useEffect(() => {
    if (isOpen) {
      setSubmitState("idle");
      setErrorMsg("");
      formRef.current?.reset();
    }
  }, [isOpen]);

  const handleSubmit = (formData: FormData) => {
    setSubmitState("loading");
    startTransition(async () => {
      const result = await submitLead(formData);
      if (result.success) {
        setSubmitState("success");
        formRef.current?.reset();
      } else {
        setSubmitState("error");
        setErrorMsg(result.error);
      }
    });
  };

  const isLoading = isPending || submitState === "loading";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* ── Overlay ──────────────────────────────────────────────────── */}
          <motion.div
            key="overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* ── Modal Panel ──────────────────────────────────────────────── */}
          <motion.div
            key="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-modal-title"
            initial={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 16 }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
            exit={{ opacity: 0, scale: 0.95, filter: "blur(10px)", y: 16 }}
            transition={{ type: "spring", stiffness: 300, damping: 28 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="pointer-events-auto relative w-full max-w-lg rounded-3xl
                bg-[#131314]/80 backdrop-blur-2xl border border-white/10 shadow-2xl
                overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Ambient gradient header accent */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#3B82F6]" />
              <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#8B5CF6]/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />
              <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-[80px] pointer-events-none mix-blend-screen" />

              <div className="relative z-10 p-8">
                {/* Header */}
                <div className="flex items-start justify-between mb-8">
                  <div>
                    <p className="text-[10px] font-black tracking-[0.3em] uppercase text-[#06B6D4] mb-1">
                      SYNTHETIC LAB // INTAKE
                    </p>
                    <h2
                      id="lead-modal-title"
                      className="text-2xl font-black tracking-tighter text-white leading-tight"
                    >
                      Initiate Your Project
                    </h2>
                    <p className="text-white/40 text-sm mt-1">
                      Tell us about your vision. We&apos;ll respond within 24h.
                    </p>
                  </div>
                  <button
                    onClick={onClose}
                    aria-label="Close modal"
                    className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center
                      text-white/50 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* ── Success State ─────────────────────────────────────── */}
                <AnimatePresence mode="wait">
                  {submitState === "success" ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center justify-center py-12 gap-4"
                    >
                      <div className="relative">
                        <div className="absolute inset-0 bg-[#06B6D4] blur-2xl opacity-40 rounded-full scale-150" />
                        <CheckCircle2 className="relative w-16 h-16 text-[#06B6D4] drop-shadow-[0_0_20px_rgba(6,182,212,0.8)]" />
                      </div>
                      <p className="text-xl font-black text-white tracking-tight">
                        Transmission Received
                      </p>
                      <p className="text-white/50 text-sm text-center max-w-xs">
                        Our synthetic lab is now processing your request.
                        Expect contact within 24 hours.
                      </p>
                    </motion.div>
                  ) : (
                    /* ── Form ────────────────────────────────────────────── */
                    <motion.form
                      key="form"
                      ref={formRef}
                      action={handleSubmit}
                      initial={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="space-y-5"
                    >
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <Field
                          id="lead-full-name"
                          label="Full Name"
                          name="full_name"
                          placeholder="Alex Torres"
                          required
                        />
                        <Field
                          id="lead-company"
                          label="Company"
                          name="company_name"
                          placeholder="Acme Corp (optional)"
                        />
                      </div>

                      <Field
                        id="lead-email"
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="alex@company.com"
                        required
                      />

                      <Field
                        id="lead-project-idea"
                        label="Project Idea"
                        name="project_idea"
                        placeholder="Tell us what you're building — the problem, the vision, the scale..."
                        textarea
                      />

                      {/* Error message */}
                      <AnimatePresence>
                        {submitState === "error" && (
                          <motion.p
                            key="error"
                            initial={{ opacity: 0, y: -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-4 py-2"
                          >
                            {errorMsg}
                          </motion.p>
                        )}
                      </AnimatePresence>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="group/btn relative w-full py-4 rounded-2xl font-black tracking-wide text-white
                          bg-gradient-to-r from-[#8B5CF6] via-[#06B6D4] to-[#3B82F6]
                          disabled:opacity-70 disabled:cursor-not-allowed
                          overflow-hidden transition-all duration-300
                          hover:shadow-[0_0_40px_rgba(6,182,212,0.5)]"
                      >
                        {/* Shimmer on hover */}
                        <div className="absolute inset-0 bg-white/10 opacity-0 group-hover/btn:opacity-100 transition-opacity" />

                        <span className="relative z-10 flex items-center justify-center gap-2.5">
                          {isLoading ? (
                            <>
                              <Loader2 className="w-4 h-4 animate-spin" />
                              Transmitting…
                            </>
                          ) : (
                            <>
                              <Send className="w-4 h-4" />
                              Send Transmission
                            </>
                          )}
                        </span>
                      </button>

                      <p className="text-center text-[10px] text-white/25 tracking-wide">
                        No spam. No bullshit. Just real engineering conversations.
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
