"use client";

import { AboutSection } from "@/components/about-section";
import { ContactSection } from "@/components/contact-section";
import { EquipmentSection } from "@/components/equipment-section";
import { GallerySection } from "@/components/gallery-section";
import { Hero } from "@/components/hero";
import { PrinciplesSection } from "@/components/principles-section";
import { ProjectsSection } from "@/components/projects-section";
import { ServicesSection } from "@/components/services-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SmoothScroll } from "@/components/smooth-scroll";
import { useLanguage } from "@/lib/i18n";

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-paper px-5 py-3 text-sm font-semibold text-ink transition-transform focus:translate-y-0"
      >
        {t.skip}
      </a>
      <SmoothScroll />
      <SiteHeader />
      <main id="main-content">
        <Hero />
        <AboutSection />
        <ServicesSection />
        <ProjectsSection />
        <PrinciplesSection />
        <EquipmentSection />
        <GallerySection />
        <ContactSection />
      </main>
      <SiteFooter />
    </>
  );
}
