import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProductGrid from "@/components/ProductGrid";
import CinematicShowcase from "@/components/CinematicShowcase";
import LabTerminal from "@/components/LabTerminal";
import Timeline from "@/components/Timeline";
import Metrics from "@/components/Metrics";
import Footer from "@/components/Footer";
import ModalProvider from "@/components/ModalProvider";

export default function Home() {
  return (
    <ModalProvider>
      <Navbar />
      <main>
        <HeroSection />
        <ProductGrid />
        <CinematicShowcase />
        <LabTerminal />
        <Timeline />
        <Metrics />
      </main>
      <Footer />
    </ModalProvider>
  );
}
