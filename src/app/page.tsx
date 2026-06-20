import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import CinematicShowcase from "@/components/CinematicShowcase";
import LabTerminal from "@/components/LabTerminal";
import Timeline from "@/components/Timeline";
import Metrics from "@/components/Metrics";
import Footer from "@/components/Footer";
import ModalProvider from "@/components/ModalProvider";
import { supabase } from "@/lib/supabase/client";
import type { Project } from "@/components/ProductGrid";

// Force dynamic rendering so Supabase data is always fresh
export const dynamic = "force-dynamic";

export default async function Home() {
  // ── Fetch all projects from Supabase ────────────────────────────────────────
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.error("[Home] Supabase fetch error:", error.message);
  }

  const projects: Project[] = (data ?? []) as Project[];

  // ── JTBD Segmentation ───────────────────────────────────────────────────────
  const ecosystems = projects.filter((p) => p.category === "ecosystem");
  const utilities  = projects.filter((p) => p.category === "utility");
  const labs       = projects.filter((p) => p.category === "lab");

  return (
    <ModalProvider>
      <Navbar />
      <main>
        <HeroSection />

        {/* Tier 1 – Enterprise Ecosystems */}
        <ProductGrid
          projects={ecosystems}
          title="Enterprise"
          highlight="Ecosystems"
          subtitle="Plataformas Monorepo de Grado Industrial"
        />

        {/* Tier 2 – Micro-SaaS & Utilities */}
        <ProductGrid
          projects={utilities}
          title="Micro-SaaS &amp;"
          highlight="Utilities"
          subtitle="Activos Digitales de Alto Impacto"
        />

        {/* Tier 3 – The Synthetic Lab (I+D) */}
        <ProductGrid
          projects={labs}
          title="The Synthetic"
          highlight="Lab"
          subtitle="Forjando el Futuro (I+D)"
        />

        <CinematicShowcase />
        <LabTerminal />
        <Timeline />
        <Metrics />
      </main>
      <Footer />
    </ModalProvider>
  );
}
