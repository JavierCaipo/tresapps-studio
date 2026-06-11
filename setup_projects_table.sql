-- =============================================================================
-- TresApps Synthetic Lab — Projects Table Migration
-- File: setup_projects_table.sql
-- Run this in: Supabase Dashboard → SQL Editor
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ─── projects ─────────────────────────────────────────────────────────────────

CREATE TABLE public.projects (
  id                UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at        TIMESTAMP WITH TIME ZONE DEFAULT now(),

  -- Identity
  slug              TEXT NOT NULL UNIQUE,
  name              TEXT NOT NULL,
  tagline           TEXT,
  description       TEXT,
  long_description  TEXT,
  status            TEXT DEFAULT 'live',          -- 'live' | 'beta' | 'archived'
  year              INTEGER,

  -- Branding
  accent_color      TEXT DEFAULT '#06B6D4',        -- hex
  accent_color_2    TEXT DEFAULT '#8B5CF6',        -- hex

  -- Structured JSONB fields
  -- monorepo_ecosystem: { name, type, role, tech }[]
  --   type: 'mobile' | 'web' | 'api' | 'admin' | 'service'
  monorepo_ecosystem  JSONB DEFAULT '[]'::jsonb,

  -- impact_metrics: { label, value, sub? }[]
  impact_metrics      JSONB DEFAULT '[]'::jsonb,

  -- Simple arrays
  stack             TEXT[]  DEFAULT '{}',
  features          TEXT[]  DEFAULT '{}',

  -- Context
  market            TEXT,
  impact            TEXT
);

-- ─── RLS ──────────────────────────────────────────────────────────────────────
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read access" ON public.projects
  FOR SELECT USING (true);

-- Only service role / dashboard can write (no client insert policy).

-- ─── Seed Data ────────────────────────────────────────────────────────────────

INSERT INTO public.projects
  (slug, name, tagline, description, long_description, status, year,
   accent_color, accent_color_2, stack, market, impact, features,
   monorepo_ecosystem, impact_metrics)
VALUES
(
  'civi-taxi-2',
  'Civi Taxi 2',
  'Real-time ride dispatch at scale',
  'Integración de características transaccionales en tiempo real utilizando la arquitectura de Supabase Realtime.',
  'Civi Taxi 2 re-architects the original dispatch system into a fully event-driven platform. Supabase Realtime broadcasts driver locations, ride state, and payment confirmations across all connected clients in under 100ms.',
  'live', 2024, '#06B6D4', '#3B82F6',
  ARRAY['Next.js 15','Supabase Realtime','PostgreSQL','TypeScript','React Native'],
  'Transportation · Latin America',
  '60% server load reduction, sub-100ms dispatch latency',
  ARRAY['Real-time driver geolocation broadcast','Event-driven ride state machine via DB triggers','Transactional payment confirmation pipeline','Offline-resilient mobile sync'],
  '[
    {"name":"Rider App","type":"mobile","role":"Passenger booking & live tracking","tech":"React Native"},
    {"name":"Driver App","type":"mobile","role":"Job queue, navigation & earnings","tech":"React Native"},
    {"name":"Dispatch API","type":"api","role":"Real-time matchmaking engine","tech":"Node.js + Supabase Realtime"},
    {"name":"Admin Dashboard","type":"admin","role":"Fleet oversight & analytics","tech":"Next.js 15"},
    {"name":"Payment Service","type":"service","role":"Transactional billing & receipts","tech":"Node.js + Stripe"}
  ]'::jsonb,
  '[
    {"label":"Dispatch Latency","value":"<100ms","sub":"Supabase Realtime"},
    {"label":"Server Load ↓","value":"60%","sub":"vs. polling baseline"},
    {"label":"Concurrent Riders","value":"10k+","sub":"peak supported"}
  ]'::jsonb
),
(
  'sacisoft-erp',
  'Sacisoft ERP',
  'Node.js + Supabase enterprise resource planning',
  'Middleware y aplicación construida estrictamente con Node.js, React y Supabase.',
  'Sacisoft ERP is a modular, headless resource planning system built entirely on the Node.js / React / Supabase trinity. Each business domain ships as an independently deployable micro-frontend with RLS-enforced tenant isolation.',
  'live', 2024, '#8B5CF6', '#06B6D4',
  ARRAY['Node.js','React 19','Supabase','PostgreSQL','RLS','Turborepo'],
  'Enterprise SaaS · Central America',
  'Multi-tenant isolation, zero-downtime migrations',
  ARRAY['Typed service middleware layer','RLS-enforced multi-tenant isolation','Independent micro-frontend modules','Real-time inventory sync'],
  '[
    {"name":"HR Module","type":"web","role":"Payroll, attendance & org chart","tech":"React 19"},
    {"name":"Inventory Module","type":"web","role":"Stock tracking & reorder triggers","tech":"React 19"},
    {"name":"Billing Module","type":"web","role":"Invoices, taxes & payment gateway","tech":"React 19"},
    {"name":"Core API","type":"api","role":"Shared middleware & auth gateway","tech":"Node.js + Supabase"},
    {"name":"Admin Console","type":"admin","role":"Tenant provisioning & RLS config","tech":"Next.js 15"},
    {"name":"Reporting Service","type":"service","role":"Async BI report generation","tech":"Node.js + Chart.js"}
  ]'::jsonb,
  '[
    {"label":"Modules","value":"12","sub":"independent micro-frontends"},
    {"label":"Tenants","value":"50+","sub":"isolated via RLS"},
    {"label":"Uptime","value":"99.97%","sub":"rolling 12 months"}
  ]'::jsonb
),
(
  'vcards-platform',
  'vCards Platform',
  'Scalable virtual business cards + marketing funnels',
  'Plataforma escalable de tarjetas de presentación virtuales y funnel de marketing automatizado.',
  'vCards Platform transforms the business card into a dynamic, trackable micro-landing page. NFC / QR tap-to-open, analytics tracking, and a drag-and-drop funnel builder feed contacts directly into the lead pipeline.',
  'live', 2024, '#F59E0B', '#8B5CF6',
  ARRAY['Next.js 15','Supabase','Framer Motion','PWA','NFC Web API','TypeScript'],
  'SaaS · B2B · Global',
  'NFC/QR tap-to-open, white-label multi-tenant, automated lead funnels',
  ARRAY['NFC + QR tap-to-open PWA cards','Drag-and-drop marketing funnel builder','Analytics dashboard per card','White-label multi-tenant agency mode'],
  '[
    {"name":"Card PWA","type":"web","role":"NFC/QR-triggered micro-landing page","tech":"Next.js PWA"},
    {"name":"Funnel Builder","type":"web","role":"Drag-and-drop lead capture editor","tech":"React 19"},
    {"name":"Analytics Engine","type":"service","role":"Per-card event tracking & heatmaps","tech":"Node.js + Supabase"},
    {"name":"Agency Console","type":"admin","role":"White-label tenant management","tech":"Next.js 15"},
    {"name":"NFC Writer API","type":"api","role":"Encode & provision NFC chips","tech":"Node.js + NFC Web API"}
  ]'::jsonb,
  '[
    {"label":"Cards Created","value":"12k+","sub":"active profiles"},
    {"label":"Funnel Conversion","value":"34%","sub":"avg. lead capture"},
    {"label":"Tenants","value":"80+","sub":"white-label agencies"}
  ]'::jsonb
);

-- =============================================================================
