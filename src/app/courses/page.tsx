"use client";

import { useMemo, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { getCourses, getCourseCategories } from "@/lib/data";
import { useStaggerReveal } from "@/hooks/useStaggerReveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Card } from "@/components/ui/Card";
import { PageHero } from "@/components/ui/PageHero";

const courses = getCourses();
const categories = ["All", ...getCourseCategories()];

export default function CoursesPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const filtered = useMemo(() => {
    return courses.filter((c) => {
      const matchCategory = category === "All" || c.category === category;
      const matchSearch =
        !search.trim() ||
        c.title.toLowerCase().includes(search.toLowerCase()) ||
        c.category.toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [category, search]);

  useStaggerReveal(containerRef, { childSelector: ".course-card" });

  return (
    <div>
      <PageHero title="Our Courses" subtitle="Explore streams we support for admissions and career guidance." imageUrl="/assets/hero.svg" />
      <section className="section-padding bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-dots-grid opacity-30 pointer-events-none" aria-hidden />
        <div className="container mx-auto px-4 max-w-6xl relative">
          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <input
              type="search"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 rounded-xl border border-neutral-muted/30 px-4 py-3 text-primary focus:ring-2 focus:ring-accent focus:border-accent outline-none"
            />
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    category === cat
                      ? "bg-primary text-white"
                      : "bg-white text-primary border border-primary/30 hover:bg-primary/5"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filtered.length === 0 ? (
            <p className="text-center text-neutral-muted py-12">No courses match your filters.</p>
          ) : (
            <div ref={containerRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((course) => (
                <Link key={course.slug} href={`/courses/${course.slug}`} className="course-card block group">
                  <Card className="overflow-hidden p-0 h-full">
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={course.image}
                        alt={course.title}
                        fill
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    </div>
                    <div className="p-6">
                      <span className="text-accent text-sm font-medium">{course.category}</span>
                      <h3 className="font-heading text-xl font-bold text-primary mt-1 mb-2">{course.title}</h3>
                      <p className="text-neutral-muted text-sm line-clamp-2">{course.shortDescription}</p>
                    </div>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
