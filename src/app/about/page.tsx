import type { Metadata } from "next";
import Image from "next/image";
import { getSiteData } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { PageHero } from "@/components/ui/PageHero";
import { AboutReveal } from "./AboutReveal";

const site = getSiteData();

export const metadata: Metadata = {
  title: "About Us | Provident Groups",
  description: "Learn about Provident Groups—your trusted education consultancy for university admissions and career guidance in Karnataka.",
};

const whyChoose = [
  "10+ years of experience in education consultancy",
  "150+ university and college partnerships",
  "Personalized counseling for every student",
  "End-to-end admission and documentation support",
  "Scholarship and fee guidance",
  "Transparent process and dedicated support",
];

export default function AboutPage() {
  return (
    <div>
      <PageHero title="About Us" subtitle={site.brand.tagline} imageUrl="/assets/hero.svg" />
      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <AboutReveal>
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-xl">
                <Image src="/assets/hero.svg" alt="Provident Groups" fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
              </div>
              <div>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4">Our Mission</h2>
                <p className="text-neutral-dark leading-relaxed mb-4">
                  To empower students and families with clear, reliable guidance for higher education and career choices. We bridge the gap between aspirations and admissions through personalized support and strong institutional partnerships.
                </p>
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-primary mb-4 mt-8">Our Vision</h2>
                <p className="text-neutral-dark leading-relaxed">
                  To be the most trusted education consultancy in Karnataka, known for integrity, results, and student-first approach.
                </p>
              </div>
            </div>
          </AboutReveal>
        </div>
      </section>
      <section className="section-padding bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="relative rounded-3xl border border-primary/10 bg-white shadow-xl shadow-primary/5 overflow-hidden max-w-4xl mx-auto">
            <div className="absolute inset-0 noise-overlay pointer-events-none rounded-3xl" aria-hidden />
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent/8 blur-2xl pointer-events-none" aria-hidden />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-primary/5 blur-xl pointer-events-none" aria-hidden />
            <div className="absolute bottom-0 right-0 w-44 h-44 rounded-full border border-primary/5 pointer-events-none" aria-hidden />
            <div className="relative z-10 px-8 py-10 md:px-12 md:py-12">
              <SectionHeading title="Why Choose Us" subtitle="We are committed to your success at every step." />
              <AboutReveal>
                <ul className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
                  {whyChoose.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-accent shrink-0 mt-0.5">✓</span>
                      <span className="text-neutral-dark">{item}</span>
                    </li>
                  ))}
                </ul>
              </AboutReveal>
            </div>
          </div>
        </div>
      </section>
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: "url(/assets/patterns/blob-1.svg)", backgroundSize: "cover" }} aria-hidden />
        <div className="container mx-auto px-4 max-w-2xl text-center relative">
          <h2 className="font-heading text-2xl font-bold text-primary mb-4">Get in Touch</h2>
          <p className="text-neutral-muted mb-6">Ready to start your journey? Speak with our counselors today.</p>
          <Button href="/contact" variant="primary">Contact Us</Button>
        </div>
      </section>
    </div>
  );
}
