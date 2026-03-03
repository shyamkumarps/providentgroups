"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { getCourses } from "@/lib/data";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { prefersReducedMotion } from "@/lib/animations";

if (typeof window !== "undefined") gsap.registerPlugin(ScrollTrigger);

const courses = getCourses().slice(0, 6);

export function CoursesPreview() {
  const containerRef = useRef<HTMLDivElement>(null);

  useStaggerReveal(containerRef, { childSelector: ".course-card", y: 50, stagger: 0.08 });

  useEffect(() => {
    if (!containerRef.current || prefersReducedMotion()) return;
    const cards = containerRef.current.querySelectorAll<HTMLElement>(".course-card");
    gsap.fromTo(
      cards,
      { opacity: 0, rotateX: 14, transformPerspective: 800 },
      {
        opacity: 1,
        rotateX: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: "power3.out",
        scrollTrigger: { trigger: containerRef.current, start: "top 88%" },
      }
    );
    return () => ScrollTrigger.getAll().forEach((t) => t.kill());
  }, []);

  return (
    <section className="section-padding bg-background relative overflow-hidden">
      <div className="absolute inset-0 bg-dots-grid opacity-40 pointer-events-none" aria-hidden />
      <div className="container mx-auto px-4 max-w-6xl relative z-10 pt-4">
        <SectionHeading
          title="Our Courses"
          subtitle="Explore popular streams we support for admissions and career guidance."
        />
        <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 [perspective:800px]">
          {courses.map((course) => (
            <Link key={course.slug} href={`/courses/${course.slug}`} className="course-card block group [transform-style:preserve-3d] relative">
              <Card hover={false} className="overflow-hidden p-0 h-full transition-all duration-300 group-hover:shadow-[0_16px_40px_rgba(0,0,0,0.1),0_0_0_1px_rgba(15,118,110,0.08),0_8px_24px_rgba(249,115,22,0.12)] group-hover:-translate-y-0.5">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={course.image}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6 relative">
                  <h3 className="font-heading text-xl font-bold text-primary mb-2">{course.title}</h3>
                  <p className="text-neutral-muted/80 text-sm line-clamp-2">{course.shortDescription}</p>
                </div>
              </Card>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Button href="/courses" variant="secondary">
            View All Courses
          </Button>
        </div>
      </div>
    </section>
  );
}
