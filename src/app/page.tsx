import { HeroSection } from "@/components/sections/HeroSection";
import { FeaturesSection } from "@/components/sections/FeaturesSection";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { StatsSection } from "@/components/sections/StatsSection";
import { CoursesPreview } from "@/components/sections/CoursesPreview";
import { PromoBanner } from "@/components/sections/PromoBanner";
import { LeadFormSection } from "@/components/sections/LeadFormSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { CollegesSection } from "@/components/sections/CollegesSection";
import { FooterCTA } from "@/components/sections/FooterCTA";
import { BannerPromo } from "@/components/layout/BannerPromo";

export default function Home() {
  return (
    <>
      <BannerPromo />
      <HeroSection />
      <FeaturesSection />
      <AboutPreview />
      <StatsSection />
      <CoursesPreview />
      <PromoBanner />
      <LeadFormSection />
      <TestimonialsSection />
      <CollegesSection />
      <FooterCTA />
    </>
  );
}
