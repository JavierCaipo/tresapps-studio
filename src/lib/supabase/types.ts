/**
 * Supabase Database type definitions — derived from setup_tables.sql
 *
 * Keep this file in sync with your Supabase schema.
 * You can regenerate it automatically with the Supabase CLI:
 *   npx supabase gen types typescript --project-id <YOUR_PROJECT_ID> > src/lib/supabase/types.ts
 */

// ─── Shared JSONB sub-types ───────────────────────────────────────────────────

/** One sub-application in a monorepo ecosystem. */
export interface EcosystemNode {
  name: string;
  type: "mobile" | "web" | "api" | "admin" | "service";
  role: string;
  tech: string;
}

/** A single KPI metric rendered on the project detail page. */
export interface ImpactMetric {
  label: string;
  value: string;
  sub?: string;
}

// ─── Row shapes (what SELECT * returns) ──────────────────────────────────────

export type LeadRow = {
  id: string;                   // uuid
  created_at: string;           // timestamptz — ISO 8601 string from Supabase
  full_name: string;
  company_name: string | null;
  email: string;
  project_idea: string | null;
  status: string;               // default: 'new'
};

export type ProjectMetricRow = {
  id: string;
  created_at: string;
  project_id: string;
  cost_reduction_percentage: number | null;
  workflow_velocity_multiplier: number | null;
  global_reach_users: number | null;
};

export type ProjectRow = {
  id: string;
  created_at: string;
  slug: string;
  name: string;
  tagline: string | null;
  description: string | null;
  long_description: string | null;
  status: "live" | "beta" | "archived";
  year: number | null;
  accent_color: string;
  accent_color_2: string;
  monorepo_ecosystem: EcosystemNode[];   // JSONB parsed
  impact_metrics: ImpactMetric[];        // JSONB parsed
  stack: string[];
  features: string[];
  market: string | null;
  impact: string | null;
  // ── JTBD Matrix fields ──────────────────────────────────────────────────────
  category: "ecosystem" | "utility" | "lab" | null;
  jtbd_headline: string | null;
  jtbd_outcome: string | null;
  external_url: string | null;
  logo_url?: string | null;
};

// ─── Insert shapes (what INSERT INTO … accepts) ───────────────────────────────

export type LeadInsert = Omit<LeadRow, "id" | "created_at" | "status"> & {
  status?: string;
};

export type ProjectMetricInsert = Omit<ProjectMetricRow, "id" | "created_at">;

// ─── Database interface consumed by createClient<Database>() ─────────────────

export type Database = {
  public: {
    Tables: {
      leads: {
        Row: LeadRow;
        Insert: LeadInsert;
        Update: Partial<LeadInsert>;
      };
      project_metrics: {
        Row: ProjectMetricRow;
        Insert: ProjectMetricInsert;
        Update: Partial<ProjectMetricInsert>;
      };
      projects: {
        Row: ProjectRow;
        Insert: Omit<ProjectRow, "id" | "created_at">;
        Update: Partial<Omit<ProjectRow, "id" | "created_at">>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
