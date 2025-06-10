
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import AboutSection from "@/components/sections/AboutSection";
import ProjectsSection from "@/components/sections/ProjectsSection";
import SkillsSection from "@/components/sections/SkillsSection";
import ContactSection from "@/components/sections/ContactSection";
import ScrollToTopButton from "@/components/common/ScrollToTopButton";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow container max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-16 sm:space-y-20 lg:space-y-24">
          <AboutSection />
          <ProjectsSection />
          <SkillsSection />
          <ContactSection />
        </div>
      </main>
      <Footer />
      <ScrollToTopButton />
    </div>
  );
}
