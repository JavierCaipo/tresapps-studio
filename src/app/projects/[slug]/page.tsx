// src/app/projects/[slug]/page.tsx
// Server Component — fetches from Supabase with ISR.
// params is a Promise<{ slug }> per Next.js 15/16 spec.

// Route-segment config: revalidate all fetches in this route every hour.
export const revalidate = 3600;

import React from "react";
import { notFound } from "next/navigation";
import { ArrowLeft, CheckCircle2, Layers, Globe, Zap } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";
import { supabase } from "@/lib/supabase/client";
import type { ProjectRow, ImpactMetric, EcosystemNode } from "@/lib/supabase/types";
import EcosystemVisualizer from "@/components/EcosystemVisualizer";

// ─── Data helpers ─────────────────────────────────────────────────────────────

async function fetchProject(slug: string): Promise<ProjectRow | null> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("slug", slug)
    .single();

  if (error || !data) return null;
  return data as ProjectRow;
}

async function fetchAllSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from("projects")
    .select("slug");
  return (data ?? []).map((r: { slug: string }) => r.slug);
}

// ─── Static Params — pre-render all slugs at build time ──────────────────────

export async function generateStaticParams() {
  const slugs = await fetchAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ─── Dynamic Metadata ─────────────────────────────────────────────────────────

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await fetchProject(slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.name} — TresApps Synthetic Lab`,
    description: project.description ?? project.tagline ?? undefined,
  };
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatusPill({ status }: { status: ProjectRow["status"] }) {
  const map: Record<ProjectRow["status"], { label: string; color: string }> = {
    live:     { label: "Live",     color: "#10B981" },
    beta:     { label: "Beta",     color: "#F59E0B" },
    archived: { label: "Archived", color: "#6B7280" },
  };
  const { label, color } = map[status];
  return (
    <span
      className="inline-flex items-center gap-1.5 text-[9px] font-black tracking-[0.25em] uppercase px-3 py-1.5 rounded-full border backdrop-blur-sm"
      style={{ color, borderColor: `${color}40`, backgroundColor: `${color}15` }}
    >
      <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ backgroundColor: color }} />
      {label}
    </span>
  );
}

function MetricCard({ metric, color }: { metric: ImpactMetric; color: string }) {
  return (
    <div className="flex flex-col gap-2 p-6 rounded-2xl bg-[#131314]/60 backdrop-blur-2xl border border-white/10 shadow-2xl">
      <p className="text-[10px] font-black tracking-[0.25em] uppercase text-white/40 font-mono">
        {metric.label}
      </p>
      <p className="text-4xl font-black tracking-tighter font-mono" style={{ color }}>
        {metric.value}
      </p>
      {metric.sub && (
        <p className="text-[11px] text-white/30 font-mono">{metric.sub}</p>
      )}
    </div>
  );
}

function InfoCard({
  icon,
  label,
  content,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  content: string;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-3 p-6 rounded-2xl bg-[#131314]/60 backdrop-blur-2xl border border-white/10 shadow-2xl">
      <div className="flex items-center gap-2" style={{ color }}>
        {icon}
        <span className="text-[10px] font-black tracking-[0.25em] uppercase text-white/40">
          {label}
        </span>
      </div>
      <p className="text-sm text-white/70 leading-relaxed">{content}</p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await fetchProject(slug);

  if (!project) notFound();

  const ecosystem: EcosystemNode[] = project.monorepo_ecosystem ?? [];
  const metrics: ImpactMetric[]   = project.impact_metrics ?? [];

  return (
    <div className="min-h-screen bg-[#0A0A0B] text-white overflow-hidden">

      {/* ── Background Glows ─────────────────────────────────────────────── */}
      <div
        className="fixed -top-40 -left-40 w-[800px] h-[800px] rounded-full blur-[150px] opacity-20 mix-blend-screen pointer-events-none"
        style={{ backgroundColor: project.accent_color }}
      />
      <div
        className="fixed top-1/2 -right-60 w-[600px] h-[600px] rounded-full blur-[150px] opacity-15 mix-blend-screen pointer-events-none"
        style={{ backgroundColor: project.accent_color_2 }}
      />

      {/* ── Back Button ──────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-8 pt-10">
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-white/40 hover:text-white
            transition-all duration-300 text-sm font-bold tracking-wide"
        >
          <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
          Back to Lab
        </Link>
      </div>

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-8 pt-16 pb-20">
        <div className="space-y-6 max-w-4xl">
          <div className="flex items-center gap-3 flex-wrap">
            <StatusPill status={project.status} />
            {project.year && (
              <span className="text-white/20 text-xs font-mono">{project.year}</span>
            )}
          </div>

          <h1 className="font-black tracking-tighter text-7xl md:text-8xl leading-none">
            <span
              className="text-transparent bg-clip-text"
              style={{
                backgroundImage: `linear-gradient(135deg, ${project.accent_color}, ${project.accent_color_2})`,
              }}
            >
              {project.name}
            </span>
          </h1>

          {project.tagline && (
            <p className="text-2xl text-white/60 font-medium max-w-2xl leading-relaxed">
              {project.tagline}
            </p>
          )}
          {project.long_description && (
            <p className="text-base text-white/40 max-w-2xl leading-relaxed">
              {project.long_description}
            </p>
          )}

          {/* Stack pills */}
          {(project.stack || []).length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {(project.stack || []).map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1.5 text-[10px] font-mono font-bold tracking-widest uppercase
                    bg-black/50 border border-white/10 rounded-lg text-white/50
                    hover:border-white/20 hover:text-white/70 transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── Metrics ──────────────────────────────────────────────────────── */}
      {metrics.length > 0 && (
        <section className="max-w-6xl mx-auto px-8 pb-16">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/30 mb-6 font-mono">
            $ impact --metrics
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {metrics.map((m) => (
              <MetricCard key={m.label} metric={m} color={project.accent_color} />
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {project.market && (
              <InfoCard
                icon={<Globe className="w-4 h-4" />}
                label="Market"
                content={project.market}
                color={project.accent_color_2}
              />
            )}
            {project.impact && (
              <InfoCard
                icon={<Zap className="w-4 h-4" />}
                label="Key Impact"
                content={project.impact}
                color={project.accent_color}
              />
            )}
            {(project.stack || []).length > 0 && (
              <InfoCard
                icon={<Layers className="w-4 h-4" />}
                label="Tech Stack"
                content={(project.stack || []).join(" · ")}
                color={project.accent_color}
              />
            )}
          </div>
        </section>
      )}

      {/* ── Ecosystem Visualizer ─────────────────────────────────────────── */}
      {ecosystem.length > 0 && (
        <section className="max-w-6xl mx-auto px-8 pb-16">
          <EcosystemVisualizer
            nodes={ecosystem}
            accentColor={project.accent_color}
          />
        </section>
      )}

      {/* ── Features ─────────────────────────────────────────────────────── */}
      {(project.features || []).length > 0 && (
        <section className="max-w-6xl mx-auto px-8 pb-24">
          <p className="text-[10px] font-black tracking-[0.3em] uppercase text-white/30 mb-6 font-mono">
            $ features --list
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {(project.features || []).map((feat) => (
              <div
                key={feat}
                className="flex items-start gap-3 p-5 rounded-2xl
                  bg-[#131314]/60 backdrop-blur-2xl border border-white/10 shadow-2xl
                  hover:border-white/20 transition-all duration-300"
              >
                <CheckCircle2
                  className="w-4 h-4 flex-shrink-0 mt-0.5"
                  style={{ color: project.accent_color }}
                />
                <span className="text-sm text-white/70 leading-relaxed">{feat}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── CTA Footer ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="max-w-6xl mx-auto px-8 flex flex-col sm:flex-row items-center justify-between gap-8">
          <div>
            <p className="text-white/20 text-xs font-mono mb-1">Want something like this?</p>
            <p className="text-2xl font-black tracking-tight text-white">
              Let&apos;s build your next{" "}
              <span
                className="text-transparent bg-clip-text"
                style={{
                  backgroundImage: `linear-gradient(135deg, ${project.accent_color}, ${project.accent_color_2})`,
                }}
              >
                SaaS product.
              </span>
            </p>
          </div>
          <Link href="/" className="flex-shrink-0 group relative">
            <div
              className="absolute -inset-2 blur-xl opacity-50 group-hover:opacity-80 transition-opacity rounded-2xl"
              style={{ background: `linear-gradient(135deg, ${project.accent_color}, ${project.accent_color_2})` }}
            />
            <span
              className="relative z-10 inline-flex items-center gap-2 px-8 py-4 rounded-2xl font-black text-white text-sm tracking-wide"
              style={{ background: `linear-gradient(135deg, ${project.accent_color}, ${project.accent_color_2})` }}
            >
              Initiate Project
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
