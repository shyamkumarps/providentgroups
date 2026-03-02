import siteData from "@/data/site.json";
import coursesData from "@/data/courses.json";
import testimonialsData from "@/data/testimonials.json";
import collegesData from "@/data/colleges.json";
import galleryData from "@/data/gallery.json";

export type SiteData = typeof siteData;
export type Course = (typeof coursesData)[number];
export type Testimonial = (typeof testimonialsData)[number];
export type College = (typeof collegesData)[number];
export type GalleryItem = (typeof galleryData)[number];

/**
 * Data access layer. Currently reads from static JSON.
 * Later: replace with fetch('/api/...') or direct FastAPI calls.
 */
export function getSiteData(): SiteData {
  return siteData as SiteData;
}

export function getCourses(): Course[] {
  return coursesData as Course[];
}

export function getCourseBySlug(slug: string): Course | undefined {
  return (coursesData as Course[]).find((c) => c.slug === slug);
}

export function getTestimonials(): Testimonial[] {
  return testimonialsData as Testimonial[];
}

export function getColleges(): College[] {
  return collegesData as College[];
}

export function getGallery(): GalleryItem[] {
  return galleryData as GalleryItem[];
}

export function getCourseCategories(): string[] {
  const categories = [...new Set((coursesData as Course[]).map((c) => c.category))];
  return categories.sort();
}
