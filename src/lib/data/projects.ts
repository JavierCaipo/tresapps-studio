// src/lib/data/projects.ts
// Local seed database for TresApps project case studies.
// Replace / extend with a real CMS or Supabase query when ready.

// ─── Types ────────────────────────────────────────────────────────────────────

export interface ProjectMetric {
  label: string;
  value: string;
  sub?: string;
}

export interface Project {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  longDescription: string;
  status: "live" | "beta" | "archived";
  accentColor: string;   // hex — used for glow tint
  accentColor2: string;  // hex — gradient pair
  stack: string[];
  market: string;
  impact: string;
  metrics: ProjectMetric[];
  features: string[];
  year: number;
}

// ─── Seed Data ────────────────────────────────────────────────────────────────

export const PROJECTS: Project[] = [
  {
    slug: "civi-taxi-2",
    name: "Civi Taxi 2",
    tagline: "Real-time ride dispatch at scale",
    description:
      "Integración de características transaccionales en tiempo real utilizando la arquitectura de Supabase Realtime.",
    longDescription:
      "Civi Taxi 2 re-architects the original dispatch system into a fully event-driven platform. Supabase Realtime broadcasts driver locations, ride state, and payment confirmations across all connected clients in under 100ms. The backend leverages PostgreSQL row-level triggers to push granular updates, eliminating the need for polling loops and reducing server load by over 60%.",
    status: "live",
    accentColor: "#06B6D4",
    accentColor2: "#3B82F6",
    stack: ["Next.js 15", "Supabase Realtime", "PostgreSQL", "TypeScript", "Framer Motion"],
    market: "Transportation · Latin America",
    impact: "60% server load reduction, sub-100ms dispatch latency",
    metrics: [
      { label: "Dispatch Latency", value: "<100ms", sub: "Supabase Realtime" },
      { label: "Server Load ↓", value: "60%", sub: "vs. polling baseline" },
      { label: "Concurrent Riders", value: "10k+", sub: "peak supported" },
    ],
    features: [
      "Real-time driver geolocation broadcast",
      "Event-driven ride state machine via DB triggers",
      "Transactional payment confirmation pipeline",
      "Offline-resilient mobile sync",
    ],
    year: 2024,
  },
  {
    slug: "sacisoft-erp",
    name: "Sacisoft ERP",
    tagline: "Node.js + Supabase enterprise resource planning",
    description:
      "Middleware y aplicación construida estrictamente con Node.js, React y Supabase.",
    longDescription:
      "Sacisoft ERP is a modular, headless resource planning system built entirely on the Node.js / React / Supabase trinity. A custom middleware layer abstracts all database access behind typed service interfaces, enabling zero-downtime schema migrations and multi-tenant row isolation via Supabase RLS policies. Each business domain (inventory, HR, billing) ships as an independently deployable micro-frontend.",
    status: "live",
    accentColor: "#8B5CF6",
    accentColor2: "#06B6D4",
    stack: ["Node.js", "React 19", "Supabase", "PostgreSQL", "RLS", "Turborepo"],
    market: "Enterprise SaaS · Central America",
    impact: "Multi-tenant isolation, zero-downtime migrations",
    metrics: [
      { label: "Modules", value: "12", sub: "independent micro-frontends" },
      { label: "Tenants", value: "50+", sub: "isolated via RLS" },
      { label: "Uptime", value: "99.97%", sub: "rolling 12 months" },
    ],
    features: [
      "Typed service middleware layer",
      "RLS-enforced multi-tenant isolation",
      "Independent micro-frontend modules",
      "Real-time inventory sync",
    ],
    year: 2024,
  },
  {
    slug: "delivery-nicaragua",
    name: "Delivery Nicaragua",
    tagline: "Geolocalized delivery for the Nicaraguan market",
    description:
      "Aplicación de delivery geolocalizada enfocada en el mercado de Nicaragua.",
    longDescription:
      "Delivery Nicaragua is a full-stack logistics platform purpose-built for the constraints and opportunities of the Nicaraguan market — intermittent connectivity, cash-on-delivery dominance, and high mobile-first usage. The app uses offline-first sync, a custom geofencing engine for zone-based pricing, and a lightweight driver app optimized for low-end Android devices.",
    status: "live",
    accentColor: "#10B981",
    accentColor2: "#06B6D4",
    stack: ["React Native", "Supabase", "PostGIS", "Node.js", "TypeScript"],
    market: "Logistics · Nicaragua",
    impact: "Offline-first, geofenced zone pricing, cash-on-delivery flow",
    metrics: [
      { label: "Delivery Zones", value: "8", sub: "PostGIS geofencing" },
      { label: "Avg. Delivery Time", value: "28min", sub: "urban core" },
      { label: "Orders / Month", value: "4,500+", sub: "peak capacity" },
    ],
    features: [
      "Offline-first sync engine",
      "PostGIS-powered geofence zone pricing",
      "Cash-on-delivery payment flow",
      "Low-bandwidth driver app (React Native)",
    ],
    year: 2023,
  },
  {
    slug: "vcards-platform",
    name: "vCards Platform",
    tagline: "Scalable virtual business cards + marketing funnels",
    description:
      "Plataforma escalable de tarjetas de presentación virtuales y funnel de marketing automatizado.",
    longDescription:
      "vCards Platform transforms the humble business card into a dynamic, trackable micro-landing page. Each card is a personalized Progressive Web App with NFC / QR tap-to-open, analytics tracking, and a drag-and-drop funnel builder that feeds contacts directly into the lead pipeline. The multi-tenant architecture supports white-label deployments for agencies.",
    status: "live",
    accentColor: "#F59E0B",
    accentColor2: "#8B5CF6",
    stack: ["Next.js 15", "Supabase", "Framer Motion", "PWA", "NFC Web API", "TypeScript"],
    market: "SaaS · B2B · Global",
    impact: "NFC/QR tap-to-open, white-label multi-tenant, automated lead funnels",
    metrics: [
      { label: "Cards Created", value: "12k+", sub: "active profiles" },
      { label: "Funnel Conversion", value: "34%", sub: "avg. lead capture" },
      { label: "Tenants", value: "80+", sub: "white-label agencies" },
    ],
    features: [
      "NFC + QR tap-to-open PWA cards",
      "Drag-and-drop marketing funnel builder",
      "Analytics dashboard per card",
      "White-label multi-tenant agency mode",
    ],
    year: 2024,
  },
  {
    slug: "breaking-wine",
    name: "Breaking Wine",
    tagline: "Custom software for operational cost reduction",
    description:
      "Sistema de software personalizado diseñado para la reducción de costos operativos.",
    longDescription:
      "Breaking Wine is a bespoke operations platform commissioned for a premium wine distribution chain. The system replaces a fragmented Excel + email workflow with a unified order management, inventory forecasting, and supplier payment portal. Automated reorder triggers and margin analysis dashboards cut operational overhead by 40% within the first quarter of deployment.",
    status: "live",
    accentColor: "#EC4899",
    accentColor2: "#8B5CF6",
    stack: ["React", "Node.js", "PostgreSQL", "Supabase", "Chart.js", "TypeScript"],
    market: "Distribution · Wine · Hospitality",
    impact: "40% operational cost reduction in Q1 post-launch",
    metrics: [
      { label: "Cost Reduction", value: "40%", sub: "Q1 post-launch" },
      { label: "SKUs Managed", value: "1,200+", sub: "automated reorder" },
      { label: "Suppliers", value: "35", sub: "integrated portal" },
    ],
    features: [
      "Automated low-stock reorder triggers",
      "Margin analysis & forecasting dashboards",
      "Unified supplier payment portal",
      "Excel migration & data normalization",
    ],
    year: 2023,
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** Returns undefined if the slug doesn't match any project. */
export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

/** Returns all slugs — used for generateStaticParams(). */
export function getAllSlugs(): string[] {
  return PROJECTS.map((p) => p.slug);
}
