import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { getCourses, getCourseBySlug } from "@/lib/data";
import { Button } from "@/components/ui/Button";
import { CourseReveal } from "./CourseReveal";

export async function generateStaticParams() {
  return getCourses().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return { title: "Course | Provident Groups" };
  return {
    title: `${course.title} | Provident Groups`,
    description: course.shortDescription,
  };
}

export default async function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  return (
    <div>
      <section className="relative -mt-16 pt-24 pb-20 md:pt-32 md:pb-28 text-white overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/assets/hero.svg" alt="" fill className="object-cover" priority sizes="100vw" />
          <div className="absolute inset-0 bg-primary/75" />
        </div>
        <div className="container mx-auto px-4 max-w-6xl relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-center">{course.title}</h1>
          <p className="text-center text-white/90 mt-4 max-w-2xl mx-auto">{course.shortDescription}</p>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <CourseReveal>
            <div className="space-y-10">
              <div>
                <h2 className="font-heading text-2xl font-bold text-primary mb-3">Overview</h2>
                <p className="text-neutral-dark leading-relaxed">{course.overview}</p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-primary mb-3">Eligibility</h2>
                <p className="text-neutral-dark leading-relaxed">{course.eligibility}</p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-primary mb-3">Admission Requirements</h2>
                <p className="text-neutral-dark leading-relaxed">{course.admissionRequirements}</p>
              </div>
              <div>
                <h2 className="font-heading text-2xl font-bold text-primary mb-3">Career Opportunities</h2>
                <p className="text-neutral-dark leading-relaxed">{course.careerOpportunities}</p>
              </div>
            </div>
          </CourseReveal>
        </div>
      </section>

      <section className="section-padding bg-background">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-primary via-primary-dark to-primary shadow-2xl shadow-primary/20">
            {/* Decorative circles */}
            <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-accent/15 blur-2xl" aria-hidden />
            <div className="absolute -bottom-8 -left-8 w-36 h-36 rounded-full bg-white/10 blur-xl" aria-hidden />
            <div className="absolute top-1/2 right-0 -translate-y-1/2 w-64 h-64 rounded-full border border-white/5" aria-hidden />

            <div className="relative z-10 px-8 py-12 md:px-16 md:py-16 text-center">
              <span className="inline-block mb-4 px-4 py-1.5 rounded-full bg-accent/20 text-accent text-xs font-bold uppercase tracking-wider">
                Free Consultation
              </span>
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-white mb-3">
                Talk to a Counselor
              </h2>
              <p className="text-white/80 mb-8 max-w-lg mx-auto leading-relaxed">
                Get personalized guidance for this course and end-to-end admission support from our experts.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button href="/contact">
                  Contact Us
                </Button>
                <Button href="/register" variant="secondary" className="!border-white/60 !text-white hover:!bg-white/15 hover:!border-white">
                  Register Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
